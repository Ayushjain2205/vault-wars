"use client";

import { useState } from "react";
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

const formSchema = z.object({
  amount: z.number().min(0.01, "Amount must be greater than 0"),
});

export function VaultFunding() {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0.01,
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setIsOpen(true);
    // Handle funding logic here
    console.log(data);
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
            amount is 0.01 ETH.
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
                    Amount (ETH)
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="number"
                        step="0.01"
                        className="bg-[#0D0E19] border-[#04D9FF]/30 text-white pr-16"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        ETH
                      </span>
                    </div>
                  </FormControl>
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
