import { Header } from "@/components/Header";
import PanelLayout from "@/components/admin/PanelLayout";

export default function AdminPanel() {
  return (
    <>
      <Header mode="admin" />
      <main className="w-full h-screen bg-background-alternative">
        <PanelLayout />
      </main>
    </>
  )
}