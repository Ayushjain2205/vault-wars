import Navbar from "@/components/navbar";
import { ActivityFeed } from "@/components/activity/activity-feed";

export default function Page() {
  return (
    <div className="min-h-screen bg-[#0D0E19]">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="inline-block">
            <h1 className="font-logo text-4xl text-[#04D9FF] cyber-text mb-1">
              Market Activity
            </h1>
            <div className="h-1 w-1/3 bg-gradient-to-r from-[#04D9FF] to-[#FF10F0]" />
          </div>
          <p className="mt-4 max-w-2xl text-lg text-gray-400 leading-relaxed">
            Real-time blockchain events, market data, and AI vault reactions.
            Track the pulse of the crypto markets and see how vaults respond.
          </p>
        </div>

        <ActivityFeed />
      </main>
    </div>
  );
}
