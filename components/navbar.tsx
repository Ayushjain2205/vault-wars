import { Vault } from "@/components/vault";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center px-4">
        <Link href="/" className="flex items-center gap-2 mr-4">
          <div className="w-16 h-16 -my-4 flex items-center justify-center">
            <Vault size="xs" seed="vaultwars@game.com" />
          </div>
          <span className="hidden font-logo text-2xl sm:inline-block">
            Vault Wars
          </span>
        </Link>
        <nav className="flex flex-1 items-center justify-end space-x-6">
          <Link
            href="#"
            className="font-nav text-sm font-medium tracking-wide hover:text-primary transition-colors"
          >
            Play Now
          </Link>
          <Link
            href="#"
            className="font-nav text-sm font-medium tracking-wide hover:text-primary transition-colors"
          >
            Leaderboard
          </Link>
          <Link
            href="#"
            className="font-nav text-sm font-medium tracking-wide hover:text-primary transition-colors"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
