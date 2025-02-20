"use client";

import { RiskProfileCard } from "@/components/create-vault/risk-profile-card";

interface RiskProfileProps {
  selectedProfile: "safe" | "balanced" | "degen" | null;
  onProfileSelect: (profile: "safe" | "balanced" | "degen") => void;
}

export function RiskProfile({
  selectedProfile,
  onProfileSelect,
}: RiskProfileProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <RiskProfileCard
        type="safe"
        isSelected={selectedProfile === "safe"}
        onSelect={() => onProfileSelect("safe")}
      />
      <RiskProfileCard
        type="balanced"
        isSelected={selectedProfile === "balanced"}
        onSelect={() => onProfileSelect("balanced")}
      />
      <RiskProfileCard
        type="degen"
        isSelected={selectedProfile === "degen"}
        onSelect={() => onProfileSelect("degen")}
      />
    </div>
  );
}
