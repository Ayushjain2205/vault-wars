import { Locker } from "@/components/locker";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="grid gap-8 md:grid-cols-5">
        <Locker size="lg" seed="john.doe@example.com" />
        <Locker size="sm" seed="alice.smith@example.com" />
        <Locker size="md" seed="bob.wilson@example.com" />
        <Locker size="md" seed="emma.brown@example.com" />
        <Locker size="md" seed="james.miller@example.com" />
      </div>
    </div>
  );
}
