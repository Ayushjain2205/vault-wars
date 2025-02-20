"use client";

import { useState, useEffect } from "react";
import { Vault } from "@/components/vault";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Form,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { getSonicPrice } from "@/lib/api";

const formSchema = z.object({
  amount: z.number().min(1, "Amount must be greater than 0"),
});

export function VaultFunding() {
  const [isOpen, setIsOpen] = useState(false);
  const [sonicPrice, setSonicPrice] = useState<number>(0.85);
  const [usdValue, setUsdValue] = useState<number>(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 1000,
    },
  });

  useEffect(() => {
    // Fetch initial Sonic price
    const fetchPrice = async () => {
      const price = await getSonicPrice();
      setSonicPrice(price);
      // Calculate initial USD value
      setUsdValue(form.getValues("amount") * price);
    };
    fetchPrice();

    // Set up interval to refresh price every minute
    const interval = setInterval(fetchPrice, 60000);
    return () => clearInterval(interval);
  }, []);

  // Update USD value when Sonic amount changes
  const handleAmountChange = (value: number) => {
    form.setValue("amount", value);
    setUsdValue(value * sonicPrice);
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setIsOpen(true);
    // Handle funding logic here
    console.log({
      sonicAmount: data.amount,
      usdValue: data.amount * sonicPrice,
    });
  };

  return (
    <div className="grid gap-8 md:grid-cols-2 items-center">
      {/* Vault Preview */}
      <div className="flex justify-center">
        <Vault size="lg" seed="preview" onStateChange={setIsOpen} />
      </div>

      {/* Funding Form */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-nav uppercase text-[#04D9FF] mb-2">
            Initial Funding
          </h3>
          <p className="text-gray-400 text-sm">
            Set the initial amount to deposit into your vault. The minimum
            amount is $5.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#04D9FF] font-nav uppercase text-sm">
                    Amount ($S)
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="number"
                        step="1"
                        className="bg-[#0D0E19] border-[#04D9FF]/30 text-white pr-16"
                        {...field}
                        onChange={(e) =>
                          handleAmountChange(Number(e.target.value))
                        }
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        $S
                      </span>
                    </div>
                  </FormControl>
                  <div className="mt-2 text-sm text-gray-400">
                    ≈ $
                    {usdValue.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}{" "}
                    USD
                  </div>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              size="lg"
              className="w-full bg-[#04D9FF] text-[#0D0E19] hover:bg-[#04D9FF]/90 font-nav uppercase"
            >
              Fund Vault
            </Button>
          </form>
        </Form>

        <div className="rounded-lg bg-[#04D9FF]/10 p-4">
          <p className="text-[#04D9FF] text-sm">
            Your funds will be securely stored in the vault and managed
            according to your selected strategy and risk profile.
          </p>
        </div>
      </div>
    </div>
  );
}
