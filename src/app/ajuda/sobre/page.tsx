import Footer from "@/components/Footer";
import { Header } from "@/components/Header";
import Apresentation from "@/components/Apresentation";
import { getAdminInfoAction } from "@/app/actions/users.action";

export default async function AboutPage() {
  const { user } = await getAdminInfoAction();

  return (
    <div className="flex flex-col h-dvh overflow-y-auto bg-background-alternative">
      <Header mode="user" />
      <main className="flex-1 flex flex-col px-8 md:px-12 lg:px-32">
        <Apresentation />
      </main>
      <Footer 
        whatsappNumber={user?.phone || '5586994379414'}
      />
    </div>
  );
}
