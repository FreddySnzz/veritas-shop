'use client';

import { useEffect, useMemo, useState } from 'react';
import { CgArrowsBreakeV } from 'react-icons/cg';
import { X } from 'lucide-react';
import CustomModal from './CustomModal';
import { CustomizationItemsCategoryModel } from '@/data/models/CustomizationItemsCategory';
import {
  DndContext,
  KeyboardSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  MouseSensor,
  TouchSensor,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  restrictToVerticalAxis,
  restrictToFirstScrollableAncestor,
} from '@dnd-kit/modifiers';
import { CSS } from '@dnd-kit/utilities';
import { toast } from 'sonner';
import { saveCustomizationOrderAction } from '@/app/actions/customizationItemsCategory.action';

interface ManageStepsOrderModalProps extends React.HTMLAttributes<HTMLElement> {
  categories: CustomizationItemsCategoryModel[];
  modalOpen: boolean;
  onClose?: () => void;
}

export default function ManageStepsOrderModal({
  categories,
  modalOpen,
  onClose,
}: ManageStepsOrderModalProps) {
  const [items, setItems] = useState<CustomizationItemsCategoryModel[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setItems(
      [...categories].sort(
        (a, b) => (a.display_order ?? 999) - (b.display_order ?? 999)
      )
    );
  }, [categories, modalOpen]);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 180,
        tolerance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const itemIds = useMemo(() => items.map((item) => item.id), [items]);

  function SortableRow({ item }: { item: CustomizationItemsCategoryModel }) {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: item.id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        className={[
          'flex items-center gap-4 rounded-xl border px-4 py-3 text-sm',
          isDragging ? 'opacity-70' : '',
        ].join(' ')}
      >
        <button
          type="button"
          {...attributes}
          {...listeners}
          disabled={loading}
          style={{ touchAction: 'manipulation' }}
          className={`rounded-full text-gray-700 hover:bg-gray-50/50 
            cursor-grab active:cursor-grabbing disabled:cursor-not-allowed disabled:opacity-50
          `}
        >
          <CgArrowsBreakeV className="h-5 w-5" />
        </button>

        <div className="flex flex-col">
          <span className="font-medium text-gray-900">{item.name}</span>
          <span className="text-xs text-gray-500">
            Ordem/Passo atual: {item.display_order}º
          </span>
        </div>
      </div>
    );
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setItems((current) => {
      const oldIndex = current.findIndex((item) => item.id === active.id);
      const newIndex = current.findIndex((item) => item.id === over.id);

      const reordered = arrayMove(current, oldIndex, newIndex);

      return reordered.map((item, index) => ({
        ...item,
        display_order: index + 1,
      }));
    });
  }

  async function handleSaveOrder() {
    try {
      setLoading(true);
      await saveCustomizationOrderAction(items);
      toast.success('Ordem salva com sucesso!');
      onClose?.();
    } catch (error) {
      console.error('Erro ao salvar ordem:', error);
      toast.error('Erro ao salvar ordem.');
    } finally {
      setLoading(false);
    }
  }

  if (!modalOpen) return null;

  return (
    <CustomModal
      modalOpen={modalOpen}
      onClose={onClose}
      className="overflow-hidden"
    >
      <div className="shrink-0 flex w-full flex-col justify-center">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
          <h2 className="text-lg font-bold text-gray-800">
            Ordenar Passos na Personalização de Produtos
          </h2>
          <button
            type="button"
            aria-label="Fechar"
            title="Fechar"
            onClick={onClose}
            disabled={loading}
            className="cursor-pointer disabled:opacity-50"
          >
            <X className="h-5 w-5 text-gray-500 transition-colors hover:text-gray-400" />
          </button>
        </div>

        <span className="mt-2 text-xs text-gray-400">
          Arraste os passos de personalização para definir a ordem exibida.
        </span>
      </div>

      <div className="w-full overflow-y-auto overflow-x-hidden pr-2">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[
            restrictToVerticalAxis,
            restrictToFirstScrollableAncestor,
          ]}
        >
          <SortableContext
            items={itemIds}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {items.map((item) => (
                <SortableRow key={item.id} item={item} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      <footer className="shrink-0 flex flex-col">
        <hr className="border-muted-foreground/20 mb-2" />
        <div className="mt-auto flex w-full items-center gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex w-full items-center justify-center rounded-lg bg-gray-50 px-4 py-2 font-medium cursor-pointer hover:bg-primary/10 disabled:opacity-50"
          >
            <span>Cancelar</span>
          </button>

          <button
            type="button"
            onClick={handleSaveOrder}
            disabled={loading}
            className="flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2 font-medium text-white cursor-pointer transition-all hover:bg-primary/90 disabled:opacity-50"
          >
            <span>{loading ? 'Salvando...' : 'Salvar Ordem'}</span>
          </button>
        </div>
      </footer>
    </CustomModal>
  );
}