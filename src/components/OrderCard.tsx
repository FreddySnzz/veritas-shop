'use client';

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getUserByIdAction } from "@/app/actions/users.action";
import { deleteOrderAction, updateOrderStatusAction } from "@/app/actions/orders.action";
import OrderModel from "@/data/models/Orders.model";
import UserModel from "@/data/models/User.model";
import { OrderStatusType, statusMap } from "@/data/types/orders-status.type";
import { 
  formatAndCapitalize, 
  formatCurrency 
} from "@/data/functions/formatAndCapitalize";
import { FoldVertical, Trash2, UnfoldVertical } from "lucide-react";
import { formatDateWithTime } from "@/data/functions/formatDate";
import { cn } from "@/lib/utils";
import { mountProductUrl } from "@/data/functions/removeAccentsAndSpaces";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "./ui/select";
import { CustomButton } from "./buttons/CustomButton";
import CustomModal from "./modals/CustomModal";
import { OrderStatus } from "@/data/types/enums/orders.enum";
import { toast } from "sonner";
import { PayButton } from "./buttons/PayButton";

interface OrderCardProps extends React.HTMLAttributes<HTMLElement> {
  mode?: "user" | "admin";
  order: OrderModel,
  adminInfo?: UserModel,
  className?: string,
};

export default function OrderCard({ 
  mode = "user",
  order, 
  adminInfo,
  className 
}: OrderCardProps ) {
  const [userInfo, setUserInfo] = useState<UserModel | null>(null);
  const [newStatus, setNewStatus] = useState<OrderStatusType>(OrderStatus.AWAITING_CONFIRMATION);
  const [expandedCard, setExpandedCard] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [sendMessageToClient, setSendMessageToClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleStatusChange = async (status: OrderStatusType) => {
    try {
      setLoading(true);
      await updateOrderStatusAction(order.id, status as OrderStatus);
      toast.success("Status do pedido atualizado com sucesso!");
      setNewStatus(status);

      if (sendMessageToClient) {
        if (!userInfo?.phone) {
          toast.error("O usuário não possui número de telefone cadastrado.");
        };

        window.open(
          encodeURI(`https://wa.me/${userInfo?.phone}?text=Olá, boas notícias! O pedido *${order?.order_number}* está *${statusMap[status]}!*`)
        );
      };
      router.refresh();
    } catch (error) {
      console.error("Erro ao atualizar status do pedido:", error);
      toast.error("Erro ao atualizar status do pedido.");
    } finally {
      setLoading(false);
      setExpandedCard(!expandedCard);
    };
  };

  const handleDeleteOrder = async () => {
    if (!order.id) return;
    setLoading(true);
    
    try {
      await deleteOrderAction(order.id);
      toast.success("Pedido deletado com sucesso!");
      router.refresh();
    } catch (error) {
      console.error("Erro ao deletar pedido:", error);
      toast.error("Erro ao deletar pedido.");
    } finally {
      setLoading(false);
      setDeleteModalOpen(false);
    };
  };

  const handleCopyOrderNumberToClipboard = () => {
    navigator.clipboard.writeText(order.order_number);
    toast.success("Número do pedido copiado");
  };

  const renderCustomizationDesc = (
    key: string, 
    value: string | string[] | undefined
  ) => {
    if (!key || !value) return null;
    key = formatAndCapitalize(key);

    if (key.includes('Letras') || key.includes('Frase')) {
      const formattedValue = Array.isArray(value) ? value.join(', ') : value;
      return `• ${key}: ${formattedValue}\n`;
    };

    return `• ${key}: ${value}\n`;
  };

  const handleOpenDeleteModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteModalOpen(true);
  };

  useEffect(() => {
    if (order?.user_id) {
      getUserByIdAction(order?.user_id).then(user => {
        if (user) {
          setUserInfo(user);
        };
      });
    };
  }, [order?.user_id]);

  return (
    <div className={cn("relative flex flex-col rounded-lg w-full bg-white dark:bg-input/30", className)}>
      <div className="flex gap-4 p-4 w-full">
        {order?.product?.images_url ? (
          <Link 
            href={`/${mountProductUrl(order?.product?.name, order?.product?.id)}`}
            aria-label={`Ver ${order?.product?.name}`}
            title={`Ver ${order?.product?.name}`}
            className={cn("relative shrink-0 w-25 h-25")}
          >
            <Image
              src={order?.product?.images_url[0]}
              alt="preview"
              draggable="false"
              fill
              loading="eager"
              className="aspect-square rounded-lg object-cover shadow-sm"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </Link>
        ) : (
          <div className={`shrink-0 flex items-center justify-center w-25 h-25
            rounded-lg bg-gray-500 dark:bg-input/50
          `}>
            <p className="text-[0.6rem] text-secondary px-2 text-center font-medium">
              Sem Imagem
            </p>
          </div>
        )}

        <div 
          title="Ver detalhes do pedido"
          aria-label="Ver detalhes do pedido"
          onClick={() => setExpandedCard(!expandedCard)}
          className="flex flex-col grow justify-between w-full text-xs text-secondary cursor-pointer dark:text-zinc-400"
        >
          <p className="dark:font-bold text-[0.65rem] text-muted-foreground/50 dark:text-zinc-500">
            # {order?.order_number}
          </p>
          <p className="font-bold mt-1 text-sm text-black dark:text-zinc-50">
            {order?.product?.name}
          </p>
          <p>
            {userInfo?.name} - {order?.quantity} {order?.quantity > 1 ? 'itens' : 'item'}
          </p>
          <p className={"mt-1 font-black text-sm text-primary dark:text-details"}>
            {formatCurrency(order?.final_price || 0)}
          </p>

          <div className="flex items-center gap-2">
            <div aria-hidden="true"
              className={`size-2 rounded-full ${
                order.status === "Aguardando Confirmação"
                  ? "bg-blue-300" 
                  : order.status === "Confeccionado"
                    ? "bg-blue-600"
                    : order.status === "Em Produção"
                      ? "bg-yellow-400"
                      : order.status === "Aguardando Pagamento"
                        ? "bg-green-500 animate-pulse"
                        : order.status === "Entregue"
                          ? "bg-green-400"
                          : order.status === "Cancelado"
                          ? "bg-red-500" : "bg-secondary"
              }`}/>
              <p aria-hidden="true"
                className={`font-bold ${
                  order.status === "Aguardando Confirmação"
                    ? "text-blue-300" 
                    : order.status === "Confeccionado" 
                      ? "text-blue-600" 
                      : order.status === "Em Produção"
                        ? "text-yellow-400"
                        : order.status === "Aguardando Pagamento"
                          ? "text-green-500 animate-pulse"
                          : order.status === "Entregue"
                            ? "text-green-400"
                            : order.status === "Cancelado"
                            ? "text-red-500" : "text-secondary"
              }`}>{order.status}</p>
          </div>
        </div>

        <Link
          aria-label="Ir para pagamento do pedido"
          title="Ir para pagamento do pedido"
          rel="noopener noreferrer"
          target="_blank"
          href={`https://wa.me/${adminInfo?.phone ||
            "5586994379414"}?text=${encodeURIComponent(`
              Olá, gostaria de concluir o pagamento do pedido #${order.order_number} que fiz na Veritas Ateliê!
            `)
          }`}
          className={cn(mode === "admin" ? "hidden" : "",
            order.status === statusMap.awaiting_payment ? 
            `${mode === "admin" ? "hidden" : "hidden md:flex justify-center items-center md:w-1/2 xl:w-1/3 2xl:w-1/4"}` : "hidden",
          )}
        >
          <PayButton />
        </Link>

        <div className={cn("flex justify-end items-center")}>
          <button
            type="button"
            onClick={() => setExpandedCard(!expandedCard)}
            aria-label="Ver detalhes do pedido"
            title="Ver detalhes do pedido"
            className="flex items-center justify-center w-5 h-5 rounded-full cursor-pointer
              text-secondary hover:text-gray-400 dark:text-zinc-600 transition-all"
          >
            {mode === "admin" ? (
              <div
                aria-label="Deletar pedido"
                title="Deletar pedido"
                onClick={handleOpenDeleteModal}
                className="flex items-center justify-center cursor-pointer transition-all
                  text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500
                "
              >
                <Trash2 className="w-5 h-5" />
              </div>
            ) : (
              expandedCard ? (
                <FoldVertical  /> 
              ) : (
                <UnfoldVertical className="w-5 h-5" />
              )
            )}
          </button>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={{
          height: expandedCard ? "auto" : 0,
          opacity: expandedCard ? 1 : 0,
          y: expandedCard ? 0 : -10
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn("w-full overflow-hidden", mode === "admin" && "hidden")}
      >
        <div
          className={cn("flex flex-col p-4 rounded-b-lg w-full",
            "bg-muted-foreground/25 dark:bg-zinc-900/70 text-secondary dark:text-zinc-500 text-sm"
          )}
        >
          {(order?.customization ? Object.entries(order.customization) : []).map(
            ([key, value]: [string, string | string[] | undefined]) => (
              <div 
                key={key} 
                className="flex gap-2 text-black dark:text-zinc-500"
              >
                {renderCustomizationDesc(key, value)}
              </div>
            )
          )}

          <p className="mt-4 text-[0.65rem] font-extralight tracking-[0.06rem] text-black dark:text-zinc-400">
            Pedido realizado em {formatDateWithTime(order.created_at!)}
          </p>
          <p className="font-bold text-xs text-black dark:text-zinc-200">
            Última atualização: {formatDateWithTime(order.updated_at!)}
          </p>

          <Link
            aria-label="Ir para pagamento do pedido"
            title="Ir para pagamento do pedido"
            rel="noopener noreferrer"
            target="_blank"
            href={`https://wa.me/${adminInfo?.phone ||
              "5586994379414"}?text=${encodeURIComponent(`
                Olá, gostaria de concluir o pagamento do pedido #${order.order_number} que fiz na Veritas Ateliê!
              `)
            }`}
            className={cn(mode === "admin" ? "hidden" : "block",
              order.status === statusMap.awaiting_payment ? "flex md:hidden justify-center items-center md:w-1/2 xl:w-1/3 2xl:w-1/4 mt-4" : "hidden",
            )}
          >
            <PayButton />
          </Link>
        </div>
      </motion.div>

      {mode === "admin" && (
        <>
          <CustomModal
            modalOpen={expandedCard}
            onClose={() => setExpandedCard(false)}
          >
            <div className="flex flex-col w-full">
              <div className="flex gap-2 dark:text-zinc-50">
                <p className="font-bold">Pedido:</p>
                <button
                  type="button"
                  aria-label="Copiar Number do pedido"
                  title="Copiar Number do pedido"
                  onClick={handleCopyOrderNumberToClipboard}
                >
                  <p className="dark:text-zinc-50">
                    {order?.order_number}
                  </p>
                </button>
              </div>
              <hr className="border-muted-foreground/50 my-2" />
              <div className="flex flex-col gap-6 text-sm">
                <div className="flex gap-4 w-full">
                  {order?.product?.images_url ? (
                    <Image
                      src={order?.product?.images_url[0]}
                      alt="preview"
                      draggable="false"
                      width={150}
                      height={150}
                      loading="eager"
                      className="aspect-square rounded-lg object-cover shadow-sm"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className={`shrink-0 flex items-center justify-center w-25 h-25
                        rounded-lg bg-gray-500 dark:bg-input/50
                    `}>
                      <p className="text-[0.6rem] text-secondary px-2 text-center font-medium">
                        Sem Imagem
                      </p>
                    </div>
                  )}

                  <div className="flex flex-col items-end w-full text-secondary dark:text-zinc-200">
                    <p className="text-nowrap font-bold dark:font-normal">
                      {order?.product?.name}
                    </p>
                    <p className="text-nowrap">
                      {order?.quantity} unidades
                    </p>
                    <div className="flex gap-1 grow items-end">
                      <p>
                        Preço total:
                      </p>
                      <p className="dark:text-details font-bold dark:font-black">
                        {formatCurrency(order?.final_price || 0)}
                      </p>
                    </div>
                  </div>
                </div>

                <Select 
                  onValueChange={(value) => setNewStatus(value as OrderStatusType)}
                  disabled={loading}
                >
                  <SelectTrigger 
                    title="Atualizar status do pedido"
                    aria-label="Atualizar status do pedido"
                    className={cn("border-none hover:border-none w-full cursor-pointer",
                      "focus:outline-none focus:ring-0 focus:ring-offset-0",
                      "bg-gray-50 dark:bg-zinc-900/40 hover:bg-primary/10 dark:hover:bg-zinc-900/50 text-secondary",
                      "dark:bg-input/30 dark:hover:bg-input/50 dark:border-zinc-700",
                    )}
                  >
                    <SelectValue placeholder={order.status} />
                  </SelectTrigger>
                  <SelectContent className="transition-all font-sans">
                    <SelectGroup>
                      {Object.entries(statusMap).map(([key, value]) => (
                        <SelectItem key={key} value={key} className="cursor-pointer">
                          {value}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <div className="flex flex-col">
                  <p>Cliente: {userInfo?.name}</p>
                  { userInfo?.phone ? (
                    <Link 
                      aria-label={`Entrar em contato com o cliente`}
                      title={`Entrar em contato com o cliente`}
                      rel="noopener noreferrer"
                      target="_blank"
                      href={`https://wa.me/${adminInfo?.phone}?text=Olha%20só%20esse%20produto%20incrível%20que%20encontrei%20na%20Veritas%20Ateliê!*%0A`}
                    >
                      <div className="flex gap-2">
                        Telefone:
                        <p className="underline md:no-underline hover:underline">
                          +{userInfo?.phone}
                        </p>
                      </div>
                    </Link>
                  ) : (
                    <p>Email: {userInfo?.email}</p>
                  )}
                </div>
              </div>
              <hr className="border-muted-foreground/50 my-2" />
              <div className={cn("flex flex-col w-full",
                "text-secondary dark:text-zinc-500 text-sm"
              )}>
                {(order?.customization ? Object.entries(order.customization) : []).map(
                  ([key, value]: [string, string | string[] | undefined]) => (
                    <div key={key} className="flex gap-2 text-secondary dark:text-zinc-500">
                      {renderCustomizationDesc(key, value)}
                    </div>
                  )
                )}

                <p className="mt-4 text-[0.65rem] font-light dark:font-extralight tracking-[0.06rem] text-secondary dark:text-zinc-400">
                  Pedido realizado em {formatDateWithTime(order.created_at!)}
                </p>
                <p className="font-bold text-xs text-black dark:text-zinc-200">
                  Última atualização: {formatDateWithTime(order.updated_at!)}
                </p>
              </div>
              <hr className="border-muted-foreground/50 my-4" />
              <div className="flex items-center gap-4 text-xs text-secondary dark:text-zinc-200">
                <input
                  type="checkbox"
                  id={`message-to-client-${order.order_number}`}
                  checked={sendMessageToClient}
                  onChange={() => setSendMessageToClient(!sendMessageToClient)}
                  className={`w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary dark:focus:ring-details 
                    cursor-pointer accent-primary dark:accent-details
                  `}
                />
                <p>
                  Enviar atualização de status para o cliente?
                </p>
              </div>
              <hr className="border-muted-foreground/50 my-4" />
              <div className="flex w-full gap-2">
                <CustomButton
                  type="button"
                  aria-label="Salvar pedido"
                  title="Salvar pedido"
                  className={cn("font-medium text-secondary transition-all cursor-pointer min-h-full",
                    "bg-gray-50 dark:bg-zinc-900/40 hover:bg-primary/10 dark:hover:bg-zinc-900/50",
                  )}
                  onClick={() => setExpandedCard(!expandedCard)}
                >
                  Fechar
                </CustomButton> 
                <CustomButton
                  type="button"
                  aria-label="Salvar pedido"
                  title="Salvar pedido"
                  disabled={loading}
                  className="bg-primary hover:bg-primary/90 dark:bg-details dark:hover:bg-details/90 text-white transition-colors py-3 min-h-full"
                  onClick={() => handleStatusChange(newStatus)}
                >
                  {loading ? "Salvando..." : "Salvar"}
                </CustomButton> 
              </div>
            </div>
          </CustomModal>

          <CustomModal
            modalOpen={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
          >
            <div className="flex flex-col items-center justify-center p-2 gap-4">
              <p className="font-bold text-center dark:text-zinc-50">
                Tem certeza que deseja remover este pedido?
              </p>
              <p className="text-xs font-light text-red-600 dark:text-red-400">
                Essa ação não pode ser desfeita.
              </p>

              <div className="flex w-full items-center justify-end gap-2">
                <button 
                  type="button"
                  onClick={() => setDeleteModalOpen(false)}
                  className={`flex w-full px-4 py-2 rounded-lg items-center justify-center
                    bg-gray-100 hover:bg-gray-200 font-medium cursor-pointer
                    dark:bg-zinc-800 dark:hover:bg-zinc-950/15 transition-colors
                  `}
                  disabled={loading}
                >
                  <span>Cancelar</span>
                </button>
                <button 
                  type="button"
                  onClick={handleDeleteOrder}
                  className={`flex w-full px-4 py-2 rounded-lg items-center justify-center font-medium cursor-pointer
                    bg-red-500 text-white hover:bg-red-600 disabled:opacity-70
                    dark:bg-red-500 dark:hover:bg-red-600 transition-colors
                  `}
                  disabled={loading}
                >
                  {loading ? "Deletando..." : "Confirmar"}
                </button>
              </div>
            </div>
          </CustomModal>
        </>
      )}
    </div>
  );
};