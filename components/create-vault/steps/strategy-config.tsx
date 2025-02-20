"use client";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StrategyConfigProps {
  selectedStrategy: string;
}

const formSchema = z.object({
  // Copy Trading
  walletAddress: z.string().optional(),
  tradeSize: z.number().min(0).max(100).optional(),
  slippage: z.number().min(0).max(100).optional(),
  maxGas: z.number().min(0).optional(),
  assetRestrictions: z.array(z.string()).optional(),

  // Yield Farming
  protocols: z.array(z.string()).optional(),
  targetApyMin: z.number().min(0).optional(),
  targetApyMax: z.number().min(0).optional(),
  compoundingFrequency: z.string().optional(),
  riskPreference: z.string().optional(),
  minApyThreshold: z.number().min(0).optional(),
  maxImpermanentLoss: z.number().min(0).optional(),

  // Token Sniping
  tokenSource: z.string().optional(),
  liquidityThreshold: z.number().min(0).optional(),
  antiRugFilters: z.array(z.string()).optional(),
  targetProfit: z.number().min(0).optional(),
  stopLoss: z.number().min(0).optional(),
  snipingMaxGas: z.number().min(0).optional(),

  // Arbitrage
  exchanges: z.array(z.string()).optional(),
  minSpread: z.number().min(0).optional(),
  gasCostLimit: z.number().min(0).optional(),
  autoRebalance: z.boolean().optional(),

  // Airdrop Farming
  targetProtocols: z.array(z.string()).optional(),
  interactionFrequency: z.string().optional(),
  gasBudget: z.number().min(0).optional(),
  taskTypes: z.array(z.string()).optional(),

  // NFT Flipping
  collection: z.string().optional(),
  maxBuyPrice: z.number().min(0).optional(),
  profitTarget: z.number().min(0).optional(),
  floorIncrease: z.number().min(0).optional(),
  enableLending: z.boolean().optional(),

  // Limit Orders
  tokenPair: z.string().optional(),
  orderPrice: z.number().min(0).optional(),
  orderExpiry: z.date().optional(),
  limitSlippage: z.number().min(0).max(100).optional(),

  // Grid Trading
  priceRangeMin: z.number().min(0).optional(),
  priceRangeMax: z.number().min(0).optional(),
  gridSize: z.number().min(2).optional(),
  investment: z.number().min(0).optional(),
  profitTargetGrid: z.number().min(0).optional(),
});

const protocols = [
  { label: "Uniswap V3", value: "uniswap-v3" },
  { label: "Curve Finance", value: "curve" },
  { label: "Aave V3", value: "aave-v3" },
  { label: "Compound V3", value: "compound-v3" },
  { label: "Balancer", value: "balancer" },
];

const tokenPairs = [
  { label: "ETH/USDT", value: "eth-usdt" },
  { label: "BTC/USDT", value: "btc-usdt" },
  { label: "ETH/BTC", value: "eth-btc" },
  { label: "BNB/USDT", value: "bnb-usdt" },
];

const nftCollections = [
  { label: "Bored Ape Yacht Club", value: "bayc" },
  { label: "CryptoPunks", value: "punks" },
  { label: "Azuki", value: "azuki" },
  { label: "Doodles", value: "doodles" },
];

export function StrategyConfig({ selectedStrategy }: StrategyConfigProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      walletAddress: "",
      tradeSize: 10,
      slippage: 1,
      maxGas: 0.1,
      assetRestrictions: [],
      protocols: [],
      targetApyMin: 5,
      targetApyMax: 50,
      compoundingFrequency: "daily",
      riskPreference: "medium",
      minApyThreshold: 3,
      maxImpermanentLoss: 5,
      tokenSource: "presale",
      liquidityThreshold: 10000,
      antiRugFilters: [],
      targetProfit: 20,
      stopLoss: 10,
      snipingMaxGas: 0.1,
      exchanges: [],
      minSpread: 0.5,
      gasCostLimit: 0.05,
      autoRebalance: true,
      targetProtocols: [],
      interactionFrequency: "daily",
      gasBudget: 0.1,
      taskTypes: [],
      collection: "",
      maxBuyPrice: 0,
      profitTarget: 20,
      floorIncrease: 10,
      enableLending: false,
      tokenPair: "",
      orderPrice: 0,
      limitSlippage: 1,
      priceRangeMin: 0,
      priceRangeMax: 100,
      gridSize: 10,
      investment: 1000,
      profitTargetGrid: 2,
    },
  });

  const renderCopyTradingConfig = () => (
    <>
      <FormField
        control={form.control}
        name="walletAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#04D9FF] font-nav uppercase text-sm">
              Traders to Follow
            </FormLabel>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {field.value
                  ?.split(",")
                  .filter(Boolean)
                  .map((address, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 bg-[#04D9FF]/10 px-2 py-1 rounded-md"
                    >
                      <span className="text-sm text-white">{address}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const addresses =
                            field.value?.split(",").filter(Boolean) || [];
                          addresses.splice(index, 1);
                          field.onChange(addresses.join(","));
                        }}
                        className="text-[#04D9FF] hover:text-[#04D9FF]/80"
                      >
                        ×
                      </button>
                    </div>
                  ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="0x..."
                  className="bg-[#0D0E19] border-[#04D9FF]/30 text-white placeholder:text-gray-600"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const input = e.currentTarget;
                      const address = input.value.trim();
                      if (address) {
                        const addresses =
                          field.value?.split(",").filter(Boolean) || [];
                        if (!addresses.includes(address)) {
                          field.onChange([...addresses, address].join(","));
                          input.value = "";
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
            <FormDescription className="text-gray-400">
              Press Enter to add multiple addresses
            </FormDescription>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="tradeSize"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#04D9FF] font-nav uppercase text-sm">
              Trade Size (%)
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                className="bg-[#0D0E19] border-[#04D9FF]/30 text-white"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
            <FormDescription className="text-gray-400">
              Percentage of vault funds to use per trade
            </FormDescription>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="slippage"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#04D9FF] font-nav uppercase text-sm">
              Slippage Tolerance (%)
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                className="bg-[#0D0E19] border-[#04D9FF]/30 text-white"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="maxGas"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#04D9FF] font-nav uppercase text-sm">
              Max Gas Fee (ETH)
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                className="bg-[#0D0E19] border-[#04D9FF]/30 text-white"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="assetRestrictions"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#04D9FF] font-nav uppercase text-sm">
              Asset Restrictions
            </FormLabel>
            <div className="grid gap-2">
              {["whitelist", "blacklist"].map((restriction) => (
                <div key={restriction} className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      className="border-[#04D9FF]/30 data-[state=checked]:bg-[#04D9FF] data-[state=checked]:text-[#0D0E19]"
                      checked={field.value?.includes(restriction)}
                      onCheckedChange={(checked) => {
                        const newValue = checked
                          ? [...(field.value || []), restriction]
                          : (field.value || []).filter(
                              (r) => r !== restriction
                            );
                        field.onChange(newValue);
                      }}
                    />
                  </FormControl>
                  <label className="text-sm font-medium leading-none text-gray-200">
                    {restriction === "whitelist"
                      ? "Enable Token Whitelist"
                      : "Enable Token Blacklist"}
                  </label>
                </div>
              ))}
            </div>
          </FormItem>
        )}
      />
    </>
  );

  const renderYieldFarmingConfig = () => (
    <>
      <FormField
        control={form.control}
        name="protocols"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#04D9FF] font-nav uppercase text-sm">
              Preferred Protocol
            </FormLabel>
            <FormControl>
              <Select
                onValueChange={field.onChange}
                value={field.value?.[0] || ""}
              >
                <SelectTrigger className="bg-[#0D0E19] border-[#04D9FF]/30 text-white">
                  <SelectValue placeholder="Select protocol" />
                </SelectTrigger>
                <SelectContent>
                  {protocols.map((protocol) => (
                    <SelectItem key={protocol.value} value={protocol.value}>
                      {protocol.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="targetApyMin"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#04D9FF] font-nav uppercase text-sm">
              Target APY Range - Minimum (%)
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                className="bg-[#0D0E19] border-[#04D9FF]/30 text-white"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="targetApyMax"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#04D9FF] font-nav uppercase text-sm">
              Target APY Range - Maximum (%)
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                className="bg-[#0D0E19] border-[#04D9FF]/30 text-white"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="compoundingFrequency"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#04D9FF] font-nav uppercase text-sm">
              Compounding Frequency
            </FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="bg-[#0D0E19] border-[#04D9FF]/30 text-white">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="riskPreference"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#04D9FF] font-nav uppercase text-sm">
              Risk Preference
            </FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="bg-[#0D0E19] border-[#04D9FF]/30 text-white">
                  <SelectValue placeholder="Select risk level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low (Stablecoins)</SelectItem>
                  <SelectItem value="medium">Medium (Blue-Chip)</SelectItem>
                  <SelectItem value="high">High (LPs, DeFi 2.0)</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="minApyThreshold"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#04D9FF] font-nav uppercase text-sm">
              Min APY Threshold (%)
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                className="bg-[#0D0E19] border-[#04D9FF]/30 text-white"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="maxImpermanentLoss"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#04D9FF] font-nav uppercase text-sm">
              Max Impermanent Loss (%)
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                className="bg-[#0D0E19] border-[#04D9FF]/30 text-white"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );

  const renderTokenSnipingConfig = () => (
    <>
      <FormField
        control={form.control}
        name="tokenSource"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#04D9FF] font-nav uppercase text-sm">
              Token Source
            </FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="bg-[#0D0E19] border-[#04D9FF]/30 text-white">
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="presale">Presale</SelectItem>
                  <SelectItem value="fairlaunch">Fair Launch</SelectItem>
                  <SelectItem value="dexlisting">DEX Listing</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="liquidityThreshold"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#04D9FF] font-nav uppercase text-sm">
              Liquidity Threshold (USD)
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                className="bg-[#0D0E19] border-[#04D9FF]/30 text-white"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
            <FormDescription className="text-gray-400">
              Minimum liquidity required to trigger sniping
            </FormDescription>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="antiRugFilters"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#04D9FF] font-nav uppercase text-sm">
              Anti-Rug Filters
            </FormLabel>
            <div className="grid gap-2">
              {["liquidity-locked", "team-vesting", "no-mint"].map((filter) => (
                <div key={filter} className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      className="border-[#04D9FF]/30 data-[state=checked]:bg-[#04D9FF] data-[state=checked]:text-[#0D0E19]"
                      checked={field.value?.includes(filter)}
                      onCheckedChange={(checked) => {
                        const newValue = checked
                          ? [...(field.value || []), filter]
                          : (field.value || []).filter((f) => f !== filter);
                        field.onChange(newValue);
                      }}
                    />
                  </FormControl>
                  <label className="text-sm font-medium leading-none text-gray-200">
                    {filter === "liquidity-locked"
                      ? "Liquidity Locked"
                      : filter === "team-vesting"
                      ? "Team Vesting"
                      : "No Mint Function"}
                  </label>
                </div>
              ))}
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="targetProfit"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#04D9FF] font-nav uppercase text-sm">
              Target Profit (%)
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                className="bg-[#0D0E19] border-[#04D9FF]/30 text-white"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="stopLoss"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#04D9FF] font-nav uppercase text-sm">
              Stop Loss (%)
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                className="bg-[#0D0E19] border-[#04D9FF]/30 text-white"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="snipingMaxGas"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#04D9FF] font-nav uppercase text-sm">
              Max Gas Fee (ETH)
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                className="bg-[#0D0E19] border-[#04D9FF]/30 text-white"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );

  const renderArbitrageConfig = () => (
    <>
      <FormField
        control={form.control}
        name="exchanges"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#04D9FF] font-nav uppercase text-sm">
              Target DEX/CEX
            </FormLabel>
            <FormControl>
              <Select
                onValueChange={field.onChange}
                value={field.value?.[0] || ""}
              >
                <SelectTrigger className="bg-[#0D0E19] border-[#04D9FF]/30 text-white">
                  <SelectValue placeholder="Select exchange" />
                </SelectTrigger>
                <SelectContent>
                  {protocols.map((protocol) => (
                    <SelectItem key={protocol.value} value={protocol.value}>
                      {protocol.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="minSpread"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#04D9FF] font-nav uppercase text-sm">
              Minimum Spread (%)
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                className="bg-[#0D0E19] border-[#04D9FF]/30 text-white"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="gasCostLimit"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#04D9FF] font-nav uppercase text-sm">
              Gas Cost Limit (ETH)
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                className="bg-[#0D0E19] border-[#04D9FF]/30 text-white"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="autoRebalance"
        render={({ field }) => (
          <FormItem className="flex items-center space-x-2">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormLabel className="text-sm font-medium leading-none text-gray-200">
              Enable Auto-Rebalance
            </FormLabel>
          </FormItem>
        )}
      />
    </>
  );

  const renderAirdropFarmingConfig = () => (
    <>
      <FormField
        control={form.control}
        name="targetProtocols"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#04D9FF] font-nav uppercase text-sm">
              Target Protocol
            </FormLabel>
            <FormControl>
              <Select
                onValueChange={field.onChange}
                value={field.value?.[0] || ""}
              >
                <SelectTrigger className="bg-[#0D0E19] border-[#04D9FF]/30 text-white">
                  <SelectValue placeholder="Select protocol" />
                </SelectTrigger>
                <SelectContent>
                  {protocols.map((protocol) => (
                    <SelectItem key={protocol.value} value={protocol.value}>
                      {protocol.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="interactionFrequency"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#04D9FF] font-nav uppercase text-sm">
              Interaction Frequency
            </FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="bg-[#0D0E19] border-[#04D9FF]/30 text-white">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="taskTypes"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#04D9FF] font-nav uppercase text-sm">
              Task Types
            </FormLabel>
            <div className="grid gap-2">
              {["staking", "swapping", "governance", "nft-minting"].map(
                (task) => (
                  <div key={task} className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        className="border-[#04D9FF]/30 data-[state=checked]:bg-[#04D9FF] data-[state=checked]:text-[#0D0E19]"
                        checked={field.value?.includes(task)}
                        onCheckedChange={(checked) => {
                          const newValue = checked
                            ? [...(field.value || []), task]
                            : (field.value || []).filter((t) => t !== task);
                          field.onChange(newValue);
                        }}
                      />
                    </FormControl>
                    <label className="text-sm font-medium leading-none text-gray-200">
                      {task === "staking"
                        ? "Staking"
                        : task === "swapping"
                        ? "Swapping"
                        : task === "governance"
                        ? "Governance Voting"
                        : "NFT Minting"}
                    </label>
                  </div>
                )
              )}
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="gasBudget"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#04D9FF] font-nav uppercase text-sm">
              Gas Budget (ETH)
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                className="bg-[#0D0E19] border-[#04D9FF]/30 text-white"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );

  const renderNFTFlippingConfig = () => (
    <>
      <FormField
        control={form.control}
        name="collection"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#04D9FF] font-nav uppercase text-sm">
              NFT Collection
            </FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="bg-[#0D0E19] border-[#04D9FF]/30 text-white">
                  <SelectValue placeholder="Select collection" />
                </SelectTrigger>
                <SelectContent>
                  {nftCollections.map((collection) => (
                    <SelectItem key={collection.value} value={collection.value}>
                      {collection.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="maxBuyPrice"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#04D9FF] font-nav uppercase text-sm">
              Max Buy Price (ETH)
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                className="bg-[#0D0E19] border-[#04D9FF]/30 text-white"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="profitTarget"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#04D9FF] font-nav uppercase text-sm">
              Target Profit (%)
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                className="bg-[#0D0E19] border-[#04D9FF]/30 text-white"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="floorIncrease"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#04D9FF] font-nav uppercase text-sm">
              Floor Price Increase (%)
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                className="bg-[#0D0E19] border-[#04D9FF]/30 text-white"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="enableLending"
        render={({ field }) => (
          <FormItem className="flex items-center space-x-2">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormLabel className="text-sm font-medium leading-none text-gray-200">
              Enable NFT Lending
            </FormLabel>
          </FormItem>
        )}
      />
    </>
  );

  const renderLimitOrdersConfig = () => (
    <>
      <FormField
        control={form.control}
        name="tokenPair"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#04D9FF] font-nav uppercase text-sm">
              Token Pair
            </FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="bg-[#0D0E19] border-[#04D9FF]/30 text-white">
                  <SelectValue placeholder="Select token pair" />
                </SelectTrigger>
                <SelectContent>
                  {tokenPairs.map((pair) => (
                    <SelectItem key={pair.value} value={pair.value}>
                      {pair.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="orderPrice"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#04D9FF] font-nav uppercase text-sm">
              Order Price (USD)
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                className="bg-[#0D0E19] border-[#04D9FF]/30 text-white"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="orderExpiry"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel className="text-[#04D9FF] font-nav uppercase text-sm">
              Order Expiry
            </FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    className={cn(
                      "bg-[#0D0E19] border-[#04D9FF]/30 text-white",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="limitSlippage"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#04D9FF] font-nav uppercase text-sm">
              Slippage Limit (%)
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                className="bg-[#0D0E19] border-[#04D9FF]/30 text-white"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );

  const renderGridTradingConfig = () => (
    <>
      <FormField
        control={form.control}
        name="priceRangeMin"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#04D9FF] font-nav uppercase text-sm">
              Price Range - Minimum
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                className="bg-[#0D0E19] border-[#04D9FF]/30 text-white"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="priceRangeMax"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#04D9FF] font-nav uppercase text-sm">
              Price Range - Maximum
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                className="bg-[#0D0E19] border-[#04D9FF]/30 text-white"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="gridSize"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#04D9FF] font-nav uppercase text-sm">
              Grid Size
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                className="bg-[#0D0E19] border-[#04D9FF]/30 text-white"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
            <FormDescription className="text-gray-400">
              Number of buy/sell orders
            </FormDescription>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="investment"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#04D9FF] font-nav uppercase text-sm">
              Investment Amount (USD)
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                className="bg-[#0D0E19] border-[#04D9FF]/30 text-white"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="profitTargetGrid"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#04D9FF] font-nav uppercase text-sm">
              Profit Target (%)
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                className="bg-[#0D0E19] border-[#04D9FF]/30 text-white"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );

  const renderConfig = () => {
    switch (selectedStrategy) {
      case "copy":
        return renderCopyTradingConfig();
      case "yield":
        return renderYieldFarmingConfig();
      case "snipe":
        return renderTokenSnipingConfig();
      case "arbitrage":
        return renderArbitrageConfig();
      case "airdrop":
        return renderAirdropFarmingConfig();
      case "nft":
        return renderNFTFlippingConfig();
      case "limit":
        return renderLimitOrdersConfig();
      case "grid":
        return renderGridTradingConfig();
      default:
        return <p className="text-gray-400">Please select a strategy first</p>;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => {})} className="space-y-6">
        {renderConfig()}
      </form>
    </Form>
  );
}
