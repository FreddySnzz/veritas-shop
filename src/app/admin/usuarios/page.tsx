import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import ManageUsersLayout from "@/components/admin/ManageUsersLayout";
import { getCachedAdminInfoAction } from "@/app/actions/cache.actions";
import { getUsersForAdminAction } from "@/app/actions/users.action";
import { getAllOrdersByUserAction } from "@/app/actions/orders.action";
import UserModel from "@/data/models/User.model";
import OrderModel from "@/data/models/Orders.model";

export default async function ManageUsersPage() {
  const adminInfo = await getCachedAdminInfoAction();
  const users = await getUsersForAdminAction(adminInfo.id);
  
  const usersWithAmountOrders = users.map(async (user: UserModel) => {
    const orders = await getAllOrdersByUserAction(user.id);
    orders.sort((a: OrderModel, b: OrderModel) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
    return {
      ...user,
      orders
    };
  });

  return (
    <div className="flex flex-col h-dvh overflow-y-auto bg-background-alternative dark:bg-background-dark">
      <div className="flex flex-col shrink-0 h-dvh">
        <Header mode="admin" />
        <main className={`flex-1 flex flex-col px-4 pb-4 mt-20
          md:px-12 md:mt-0 lg:px-16 overflow-hidden`}
        >
          <div className="hidden md:block shrink-0 md:mb-2">
            <DynamicBreadcrumb className="mt-16 py-4" />
            <hr className="border-muted-foreground/50 mb-4" />
          </div>
          <ManageUsersLayout users={await Promise.all(usersWithAmountOrders)} />
        </main>
      </div>
      <div className="hidden lg:block shrink-0">
        <Footer />
      </div>
    </div>
  )
}