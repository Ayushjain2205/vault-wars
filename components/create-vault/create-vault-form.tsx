"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { VaultCreation } from "./steps/vault-creation";
import { RiskProfile } from "./steps/risk-profile";
import { StrategySelection } from "./steps/strategy-selection";
import { StrategyConfig } from "./steps/strategy-config";
import { VaultFunding } from "./steps/vault-funding";

const steps = ["Create", "Risk Profile", "Strategies", "Configure", "Fund"];

type RiskProfileType = "safe" | "balanced" | "degen" | null;

export function CreateVaultForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [vaultName, setVaultName] = useState("");
  const [riskProfile, setRiskProfile] = useState<RiskProfileType>(null);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <VaultCreation vaultName={vaultName} onNameChange={setVaultName} />
        );
      case 1:
        return (
          <RiskProfile
            selectedProfile={riskProfile}
            onProfileSelect={setRiskProfile}
          />
        );
      case 2:
        return <StrategySelection />;
      case 3:
        return <StrategyConfig />;
      case 4:
        return <VaultFunding />;
      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return !!vaultName;
      case 1:
        return !!riskProfile;
      default:
        return true;
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex justify-between">
          {steps.map((step, index) => (
            <div key={step} className="flex flex-col items-center">
              <div
                className={`h-8 w-8 rounded-full border-2 flex items-center justify-center font-mono text-sm
                  ${
                    index === currentStep
                      ? "border-[#04D9FF] text-[#04D9FF] bg-[#04D9FF]/10"
                      : index < currentStep
                      ? "border-[#04D9FF] bg-[#04D9FF] text-[#0D0E19]"
                      : "border-gray-600 text-gray-600"
                  }`}
              >
                {index + 1}
              </div>
              <span
                className={`mt-2 text-xs font-nav uppercase ${
                  index === currentStep ? "text-[#04D9FF]" : "text-gray-600"
                }`}
              >
                {step}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 h-0.5 bg-gray-600">
          <motion.div
            className="h-full bg-[#04D9FF]"
            initial={{ width: "0%" }}
            animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="cyber-panel rounded-lg p-6">
        <div className="mb-6">
          <h2 className="font-logo text-2xl text-[#04D9FF] cyber-text">
            {steps[currentStep]}
          </h2>
          <p className="mt-2 text-gray-400">
            {currentStep === 0
              ? "Choose a name for your vault and see its unique appearance."
              : currentStep === 1
              ? "Select a risk profile that matches your investment goals."
              : "Coming soon..."}
          </p>
        </div>

        {renderStep()}

        {currentStep === 1 && (
          <div className="mt-6 flex items-center gap-2 p-4 rounded bg-[#04D9FF]/10 text-[#04D9FF]">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p className="text-sm">
              AI will automatically adjust risk levels based on market
              conditions while respecting your chosen profile.
            </p>
          </div>
        )}

        <div className="mt-6 flex gap-4">
          {currentStep > 0 && (
            <Button
              onClick={handleBack}
              variant="outline"
              className="flex-1 bg-transparent border-[#04D9FF]/30 text-[#04D9FF] hover:bg-[#04D9FF]/20 hover:border-[#04D9FF] hover:text-[#04D9FF] font-nav uppercase transition-colors"
            >
              Back
            </Button>
          )}
          {currentStep < steps.length - 1 && (
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex-1 bg-[#04D9FF] text-[#0D0E19] hover:bg-[#04D9FF]/90 font-nav uppercase"
            >
              Next: {steps[currentStep + 1]}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
