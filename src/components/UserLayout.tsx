'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/data/context/AuthContext";
import { SupportButton } from "./buttons/SupportButton";
import CustomModal from "./modals/CustomModal";
import Link from "next/link";
import { Label } from "./ui/label";
import FlowerIcon from "./icons/FlowerIcon";
import { useTheme } from "next-themes";
import { onlyNumbers } from "@/data/functions/inputMasks";
import { CustomInput } from "./inputs/CustomInput";
import { editUserFormSchema } from "@/data/schemas/edit-user-form.schema";
import validate from "@/data/schemas/validate-forms";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { updateUserAction } from "@/app/actions/users.action";

export default function UserLayout() {
  const { isAuthenticated, user, logout, updateUser } = useAuth();
  const { theme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone?.slice(2, user?.phone.length) || '',
    email: user?.email || '',
    password: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login?redirect=/me');
    };
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setForm({
      name: user?.name || '',
      phone: user?.phone || '',
      email: user?.email || '',
      password: '',
    });
    setErrors({});
  };

  const handleEditUser = async (e: React.FormEvent) => {
    if (!user) return;
    e.preventDefault();

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
        password: form.password.length === 0 ? undefined : form.password,
      };

      await updateUserAction(user.id, payload);
      updateUser({
        name: form.name,
        email: form.email,
        phone: form.phone,
      });
      
      toast.success("Usuário atualizado com sucesso!");
      setIsModalOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      toast.error("Erro ao salvar edição.");
    } finally {
      setIsLoading(false);
    };
  };

  return (
    <div className="flex-1 flex flex-col justify-between w-full min-h-0 font-sans">
      <div className="flex flex-col">
        <div className="flex flex-col">
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-secondary dark:text-zinc-50">
            Bem-vindo ao seu perfil, {user?.name}!
          </p>
          <p className="text-xs text-gray-400 dark:text-zinc-500">
            Fique à vontade para ver seus pedidos ou alterar suas informações.
          </p>
        </div>

        <div className="flex mt-4">
          <Link
            title="Ir para Meus Pedidos"
            aria-label="Ir para Meus Pedidos"
            href="/me/pedidos"
            className="hover:underline cursor-pointer flex items-center gap-2"
          >
            <FlowerIcon 
              color={`${theme === 'dark' ? '#fff' : '#000'}`}
              className="w-5 h-5" 
            />
            <p>Meus Pedidos</p>
          </Link>
        </div>

        <div className="flex">
          <button
            type="button"
            title="Editar Perfil"
            aria-label="Editar Perfil"
            onClick={() => setIsModalOpen(true)}
            className="hover:underline cursor-pointer flex items-center gap-2"
          >
            <FlowerIcon 
              color={`${theme === 'dark' ? '#fff' : '#000'}`}
              className="w-5 h-5" 
            />
            <p>Editar Perfil</p>
          </button>
        </div>
        
        <div className="flex">
          <button
            type="button"
            title="Sair"
            aria-label="Sair"
            onClick={handleLogout}
            className="hover:underline cursor-pointer flex item-center gap-2"
          >
            <FlowerIcon 
              color={`${theme === 'dark' ? '#fff' : '#000'}`}
              className="w-5 h-5" 
            />
            <p>Sair</p>
          </button>
        </div>
      </div>
      
      <CustomModal
        modalOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Editar Perfil"
      >
        <form 
          id="edit-user-form"
          className="flex flex-col space-y-2 mt-2"
          onSubmit={handleEditUser}
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
              value={form.name}
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
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={cn("border-none focus:outline-none grow", 
                errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
              )}
              disabled={isLoading}
              required
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
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className={cn("border-none focus:outline-none grow", 
                errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
              )}
              disabled={isLoading}
              PasswordMode
              required
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
              value={form.phone}
              onChange={(e) => setForm((prev) => ({ ...prev, phone: onlyNumbers(e.target.value) }))}
              className={cn("border-none focus:outline-none grow", 
                errors.phone ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
              )}
              disabled={isLoading}
              required
            />
          </div>
          {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
        </form>
        <hr className="border-muted-foreground/50 my-2" />
        <div className="flex w-full items-center justify-end gap-2">
          <button 
            type="button"
            onClick={() => setIsModalOpen(false)}
            className={`flex w-full px-4 py-2 rounded-lg items-center justify-center
              bg-gray-100 hover:bg-gray-200 font-medium cursor-pointer
              dark:bg-zinc-800 dark:hover:bg-zinc-950/15 transition-colors
            `}
            disabled={isLoading}
          >
            <span>Cancelar</span>
          </button>
          <button 
            form="edit-user-form"
            type="submit"
            className={`flex w-full px-4 py-2 rounded-lg items-center justify-center font-medium cursor-pointer
              bg-primary text-white hover:bg-praimary/80 disabled:opacity-70
              dark:bg-details dark:hover:bg-details/80 transition-colors
            `}
            disabled={isLoading}
          >
            {isLoading ? "Salvando..." : "Salvar Edição"}
          </button>
        </div>
      </CustomModal>

      <div className="flex justify-center">
        <SupportButton 
          title="Relatar problema"
          messageToSupport="Olá, gostaria de relatar um problema com meu usuário na Veritas Ateliê." 
          className="text-secondary dark:text-zinc-400 underline w-fit"
        />
      </div>
    </div>
  )
}