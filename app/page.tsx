import { Vault } from "@/components/vault";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="grid gap-1 md:grid-cols-5">
        <Vault size="xs" seed="john.doe@example.com" />
        <Vault size="logo" seed="alice.smith@example.com" />
        <Vault size="sm" seed="alice.smith@example.com" />
        <Vault size="md" seed="bob.wilson@example.com" />
        <Vault size="lg" seed="emma.brown@example.com" />
      </div>
    </div>
  );
}
