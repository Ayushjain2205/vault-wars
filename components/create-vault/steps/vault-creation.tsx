"use client";

import { Vault } from "@/components/vault";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface VaultCreationProps {
  vaultName: string;
  onNameChange: (name: string) => void;
}

export function VaultCreation({ vaultName, onNameChange }: VaultCreationProps) {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor="vaultName"
            className="text-[#04D9FF] font-nav uppercase text-sm"
          >
            Vault Name
          </Label>
          <Input
            id="vaultName"
            placeholder="e.g., Degen Hunter"
            value={vaultName}
            onChange={(e) => onNameChange(e.target.value)}
            className="bg-[#0D0E19] border-[#04D9FF]/30 text-white placeholder:text-gray-600"
          />
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="relative">
          <Vault size="lg" seed={vaultName || "preview"} />
          {!vaultName && (
            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50 backdrop-blur-sm">
              <p className="font-nav text-sm uppercase text-gray-400">
                Enter a name to preview
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
