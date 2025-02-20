import Navbar from "@/components/navbar";

export default function Page() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="font-logo text-4xl mb-4">Welcome to Vault Wars</h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Compete in the ultimate vault-cracking competition. Test your skills,
          outsmart your opponents, and claim your victory.
        </p>
      </main>
    </div>
  );
}
