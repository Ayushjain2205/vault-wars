import { Vault } from "@/components/vault";
import Navbar from "@/components/navbar";
import { Shield, Briefcase, Target, BarChart3 } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen bg-[#0D0E19]">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-12">
          <div className="inline-block">
            <h1 className="font-logo text-4xl text-[#04D9FF] cyber-text mb-1">
              Welcome to Vault Wars
            </h1>
            <div className="h-1 w-1/3 bg-gradient-to-r from-[#04D9FF] to-[#FF10F0]" />
          </div>
          <p className="mt-4 max-w-2xl text-lg text-gray-400 leading-relaxed">
            Compete in the ultimate vault-cracking competition. Test your
            skills, outsmart your opponents, and claim your victory.
          </p>
        </div>

        {/* Status Overview */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <div className="cyber-panel rounded-md p-6">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-5 w-5 text-[#04D9FF]" />
              <h3 className="font-nav text-sm uppercase text-[#04D9FF]">
                Active Vaults
              </h3>
            </div>
            <p className="font-display text-3xl font-bold text-white">12</p>
          </div>

          <div className="cyber-panel rounded-md p-6">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="h-5 w-5 text-[#04D9FF]" />
              <h3 className="font-nav text-sm uppercase text-[#04D9FF]">
                Total Value
              </h3>
            </div>
            <p className="font-display text-3xl font-bold text-white">$1.2M</p>
          </div>

          <div className="cyber-panel rounded-md p-6">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-5 w-5 text-[#04D9FF]" />
              <h3 className="font-nav text-sm uppercase text-[#04D9FF]">
                Success Rate
              </h3>
            </div>
            <p className="font-display text-3xl font-bold text-white">98.2%</p>
          </div>

          <div className="cyber-panel rounded-md p-6">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="h-5 w-5 text-[#04D9FF]" />
              <h3 className="font-nav text-sm uppercase text-[#04D9FF]">
                24H Change
              </h3>
            </div>
            <p className="font-display text-3xl font-bold text-[#FF10F0]">
              +2.4%
            </p>
          </div>
        </div>

        {/* Active Vaults Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="cyber-panel rounded-md p-6">
              <div className="flex gap-4">
                <Vault size="sm" seed={`vault-${i}`} />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-nav text-sm uppercase font-bold text-[#04D9FF]">
                      Vault #{i}
                    </h3>
                    <span className="inline-flex items-center rounded-full bg-[#04D9FF]/10 px-2.5 py-0.5 text-xs font-nav font-medium text-[#04D9FF]">
                      ACTIVE
                    </span>
                  </div>
                  <p className="font-nav text-xs uppercase text-gray-400 mt-1">
                    Strategy: DCA + Yield
                  </p>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                    <div className="cyber-panel rounded p-1 text-center">
                      <span className="font-nav uppercase text-[#04D9FF]">
                        ROI
                      </span>
                      <p className="font-bold text-[#FF10F0]">+12.5%</p>
                    </div>
                    <div className="cyber-panel rounded p-1 text-center">
                      <span className="font-nav uppercase text-[#04D9FF]">
                        TVL
                      </span>
                      <p className="font-bold text-white">$50K</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
