'use client';

import { useMemo, useState } from "react";
import { RefreshCw, UserRoundX } from "lucide-react";
import { BackButton } from "../buttons/BackButton";
import { CustomInput } from "../inputs/CustomInput";
import { formatDateWithTime } from "@/data/functions/formatDate";
import CustomModal from "../modals/CustomModal";
import OrderModel from "@/data/models/Orders.model";
import { CustomButton } from "../buttons/CustomButton";
import { useRouter } from "next/navigation";
import UserModel from "@/data/models/User.model";
import { verifyFirebaseId } from "@/data/functions/verifyFirebaseId";
import { FaGoogle } from "react-icons/fa6";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { onlyNumbers } from "@/data/functions/inputMasks";
import { editUserFormSchema } from "@/data/schemas/edit-user-form.schema";
import validate from "@/data/schemas/validate-forms";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "../ui/select";
import { statusMap } from "@/data/types/orders-status.type";
import { formatCurrency } from "@/data/functions/formatAndCapitalize";
import Link from "next/link";
import { updateUserAction } from "@/app/actions/users.action";
import { RolesEnum } from "@/data/types/enums/roles.enum";

type UserModelWithOrders = UserModel & { orders: OrderModel[] };

interface ManageUsersLayoutProps extends React.HTMLAttributes<HTMLElement> {
  users: UserModelWithOrders[];
};

type SortAccountType = 'system' | 'google' | 'all';

export default function ManageUsersLayout({ users }: ManageUsersLayoutProps) {
  const [searchText, setSearchText] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<UserModelWithOrders | null>(null);
  const [sortAccountType, setSortAccountType] = useState<SortAccountType>('all');

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const [form, setForm] = useState({
    name: null as string | null,
    phone: null as string | null,
    email: null as string | null,
    password: undefined as string | undefined,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSelectUserToEdit = (user: UserModelWithOrders) => {
    setSelectedUser(user);
    setIsOpenModal(true);
    setForm({
      name: user.name,
      phone: user?.phone?.slice(2, user?.phone.length) ?? null,
      email: user?.email,
      password: undefined,
    });
    setErrors({});
  }

  const handleUpdateUser = async () => {
    if (!selectedUser) return;

    const validation = validate(editUserFormSchema, form);
    if (validation.success === false) {
      setErrors(validation.errors);
      return;
    }
    
    setIsLoading(true);
    try {
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form?.password?.length === 0 ? undefined : form.password,
      }

      await updateUserAction(selectedUser.id, payload);
      toast.success("Usuário atualizado com sucesso!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Erro ao alterar informações do usuário.");
      }
    } finally {
      setIsLoading(false);
      setIsOpenModal(false);
    }
  }

  const filteredData = useMemo(() => {    
    const upperSearch = searchText.toUpperCase();
    return users.filter((user) => 
      user.name.toUpperCase().includes(upperSearch) ||
      user.email.toUpperCase().includes(upperSearch) ||
      user?.phone?.includes(upperSearch)
    ).filter((user) => {
      if (sortAccountType === 'all') return true;
      if (sortAccountType === 'system') return verifyFirebaseId(user.id);
      if (sortAccountType === 'google') return !verifyFirebaseId(user.id);
      return false;
    }).sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  }, [searchText, users, sortAccountType]);
  
  return (
    <div className="flex flex-col font-sans h-full overflow-hidden">
      <div className="relative flex w-full items-center justify-center gap-3">
        <div className="relative flex w-full items-center gap-2">
          <CustomInput
            searchbarPlaceholder="Busque por nome, email ou telefone..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="bg-white dark:bg-input/30 shadow-xs"
            clearButtonAction={() => setSearchText('')}
            withClearButton
          />

          <Select 
            value={sortAccountType} 
            onValueChange={(value) => setSortAccountType(value as SortAccountType)}
          >
            <SelectTrigger 
              title="Tipo de conta"
              aria-label="Tipo de conta"
              className={cn("border-none hover:border-none w-full cursor-pointer",
                "focus:outline-none focus:ring-0 focus:ring-offset-0",
                "bg-white hover:bg-gray-50 text-secondary w-fit",
                "dark:bg-input/30 dark:hover:bg-input/50 dark:border-zinc-700",
              )}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="transition-all font-sans">
              <SelectGroup>
                <SelectItem value="all" className="cursor-pointer">
                  Todas
                </SelectItem>
                <SelectItem value="system" className="cursor-pointer">
                  Sistema
                </SelectItem>
                <SelectItem value="google" className="cursor-pointer">
                  Conta Google
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <CustomButton 
            title="Atualizar"
            aria-label="Atualizar"
            onClick={() => router.refresh()}
            className={`flex py-1.5 px-2 rounded-lg shadow-xs
              bg-white text-secondary hover:bg-zinc-50 font-bold text-base
              dark:bg-details dark:hover:bg-details/80 text-nowrap w-fit
            `}
          >
            <RefreshCw className="w-6 h-6" />
          </CustomButton>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto scrollbar-hide md:scrollbar-thin mt-4">
        <div className="flex flex-col space-y-4 md:mr-2">
          {filteredData.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <UserRoundX className="w-16 h-16 text-zinc-400 dark:text-zinc-700 mb-4" />
              <p className="text-muted-foreground/50 font-bold">
                Nenhum usuário encontrado
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2 lg:grid lg:grid-cols-3 lg:gap-4 overflow-y-auto">
              {filteredData.map((user, index) => (
                <div 
                  key={index}
                  onClick={() => handleSelectUserToEdit(user)}
                  className={`flex p-4 rounded-lg cursor-pointer transition-all
                    bg-white hover:bg-zinc-50 dark:bg-input/30 dark:hover:bg-input/50 
                  `}
                >
                  <div className="grow">
                    <div className={`flex flex-col text-xs dark:text-zinc-50`}>
                      <p className="flex font-black dark:text-details mb-1 gap-1">
                        <span className="text-nowrap">{user.name}</span>
                        <span>-</span>
                        <span>{user.role === RolesEnum.ADMIN ? 'Admin' : 'Cliente'}</span>
                      </p>
                      {!verifyFirebaseId(user.id) && (
                        <div className="flex items-center gap-1 text-xs font-bold mb-1 text-blue-500">
                          <FaGoogle className="w-2.5 h-2.5" />
                          <p>Conta Google</p>
                        </div>
                      )}
                      {user.phone && (
                        <p className="flex gap-1">
                          <span className="font-bold">Telefone:</span>
                          <span>{user.phone.slice(2, user?.phone.length)}</span>
                        </p>
                      )}
                      {user.email && (
                        <p className="flex gap-1">
                          <span className="font-bold">Email:</span>
                          <span>{user.email}</span>
                        </p>
                      )}
                      <p className="flex gap-1">
                        <span className="font-bold">Quantidade de pedidos:</span>
                        <span>{user.orders.length}</span>
                      </p>
                    </div>
                    <div className="flex gap-1 mt-2 text-[0.6rem] dark:text-zinc-200">
                      <p className="font-bold">Última modificação:</p>
                      <p>{formatDateWithTime(user.updated_at)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <CustomModal
        title="Editar Usuário"
        modalOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      >
        <form 
          id="edit-user-form"
          className="flex flex-col space-y-2 mt-2"
          onSubmit={handleUpdateUser}
        >
          <div className="flex gap-2">
            <Label 
              htmlFor="name"
              className="text-nowrap grow min-w-1/2"
            >
              Nome completo
            </Label>
            <CustomInput
              id="name"
              type="text"
              searchbarPlaceholder="Maria de Jesus dos Santos"
              value={form.name || ''}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={cn("border-none focus:outline-none grow", 
                errors.name ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
              )}
              disabled={isLoading}
              required
            />
          </div>
          {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}

          <div className="flex gap-2">
            <Label 
              htmlFor="email"
              className="text-nowrap grow min-w-1/2"
            >
              Email
            </Label>
            <CustomInput
              id="email"
              type="email"
              searchbarPlaceholder="seu@email.com"
              value={form.email || ''}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={cn("border-none focus:outline-none grow", 
                errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
              )}
              disabled={isLoading}
              required={selectedUser?.email ? true : false}
            />
          </div>
          {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}

          <div className="flex gap-2">
            <Label 
              htmlFor="password"
              className="text-nowrap grow min-w-1/2"
            >
              Senha
            </Label>
            <CustomInput
              id="password"
              searchbarPlaceholder="********"
              value={form.password || ''}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className={cn("border-none focus:outline-none grow", 
                errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
              )}
              disabled={isLoading}
              PasswordMode
            />
          </div>
          {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}

          <div className="flex gap-2">
            <Label 
              htmlFor="phone"
              className="text-nowrap grow min-w-1/2"
            >
              Telefone (WhatsApp)
            </Label>
            <CustomInput
              id="phone"
              type="tel"
              autoComplete="tel"
              searchbarPlaceholder="(DDD) 9 1234-5678"
              max={11}
              value={form.phone || ''}
              onChange={(e) => setForm((prev) => ({ ...prev, phone: onlyNumbers(e.target.value) }))}
              className={cn("border-none focus:outline-none grow", 
                errors.phone ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
              )}
              disabled={isLoading}
              required={selectedUser?.phone ? true : false}
            />
          </div>
          {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
        </form>
        <hr className="border-muted-foreground/50 mt-2" />

        {selectedUser && selectedUser.orders && selectedUser.orders.length > 0 && (
          <div className="flex flex-col mt-2">
            <div className="flex text-sm items-baseline gap-1">
              <p className="font-bold text-nowrap">Último pedido:</p>
              <hr className="border-muted-foreground/50 border-dashed w-full" />
              <Link 
                title="Ir para pedido"
                aria-label="Ir para pedido"
                href={`/admin/pedidos?search=${selectedUser.orders[0].order_number}`}
                className="text-nowrap dark:text-zinc-300 hover:italic underline cursor-pointer"
              >
                {selectedUser.orders[0].order_number}
              </Link>
            </div>
            <div className="flex text-sm items-baseline gap-1">
              <p className="font-bold text-nowrap">Valor</p>
              <hr className="border-muted-foreground/50 border-dashed w-full" />
              <p className="text-nowrap dark:text-zinc-300">{formatCurrency(selectedUser.orders[0].final_price)}</p>
            </div>
            <div className="flex text-sm items-baseline gap-1">
              <p className="font-bold text-nowrap">Status</p>
              <hr className="border-muted-foreground/50 border-dashed w-full" />
              <p className="text-nowrap dark:text-zinc-300">{statusMap[selectedUser.orders[0].status]}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 mt-4">
          <button 
            type="button"
            aria-label="Cancelar"
            onClick={() => setIsOpenModal(false)}
            className={`flex gap-2 items-center justify-center px-4 py-2 rounded-lg cursor-pointer
              bg-gray-100 text-secondary hover:bg-gray-200 transition-colors font-medium
              dark:bg-zinc-800 dark:border-0 dark:hover:bg-zinc-950/15 disabled:opacity-50
            `}
            disabled={isLoading}
          >
            <span>Cancelar</span>
          </button>

          <button 
            type="button"
            aria-label="Salvar"
            onClick={handleUpdateUser}
            className={`flex gap-2 items-center justify-center px-4 py-2 
              text-white transition-colors font-medium rounded-lg cursor-pointer
              bg-primary hover:bg-primary/90 disabled:opacity-50
              dark:bg-details dark:hover:bg-details/80
            `}
            disabled={isLoading}
          > 
            <span>{isLoading ? 'Salvando...' : 'Salvar'}</span>
          </button>
        </div>
      </CustomModal>

      <div className="md:hidden shrink-0 mt-auto bg-background-alternative dark:bg-input/0 z-10">
        <hr className="border-muted-foreground/50 my-2" />
        <div className="flex flex-col gap-4">
          <BackButton backRoute />
        </div>
      </div>
    </div>
  );
};