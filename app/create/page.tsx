import { CreateVaultForm } from "@/components/create-vault/create-vault-form";
import Navbar from "@/components/navbar";

export default function CreatePage() {
  return (
    <div className="min-h-screen bg-[#0D0E19]">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <CreateVaultForm />
      </main>
    </div>
  );
}
