"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { H1, H3 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Plus, Save, Trash2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const emptyWallet = {
  address: "",
  seedPhrase: ["", "", "", "", "", "", "", "", "", "", "", ""],
};

const emptyPassWord = {
  name: "",
  password: "",
};

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }).max(100),
  text: z.string().optional(),
  wallets: z.array(
    z.object({
      address: z.string().optional(),
      seedPhrase: z.array(z.string().optional()).optional(),
    })
  ),
  passwords: z.array(
    z.object({
      name: z.string().optional(),
      password: z.string().optional(),
    })
  ),
  receivers: z.array(z.string().optional()).optional(),
});

type FormSchema = z.infer<typeof formSchema>;

export default function Page({ params }: { params: { id: string } }) {
  const isCreateMode = params.id === "create";
  const { toast } = useToast();

  const form = useForm<FormSchema>({
    resolver: zodResolver<any>(formSchema),
    defaultValues: {
      name: "",
      text: "",
      wallets: [],
      passwords: [],
      receivers: [],
    },
  });

  function onSubmit(values: FormSchema) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const wallets = form.watch("wallets") || [];
  const passwords = form.watch("passwords") || [];
  const receivers = form.watch("receivers") || [];

  return (
    <main className="container pt-16">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <div className="flex justify-between mb-8">
            <H1 className="">
              {isCreateMode ? "Create letter" : "Edit letter"}
            </H1>
            <Button type="submit" className="gap-2">
              <Save className="w-4" /> Save changes
            </Button>
          </div>
          <div className="grid gap-6">
            {/*  */}
            <div className="glass-bg rounded-xl p-4 lg:p-6 grid gap-4">
              <H3 className="mb-2">General info</H3>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="My passwords" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Text</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Fancy will text"
                        rows={8}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/*  */}
            <div className="glass-bg rounded-xl p-4 lg:p-6 grid gap-4">
              <H3 className="mb-2">Wallets</H3>
              <div className="grid lg:grid-cols-2 gap-10 mb-3 empty:hidden">
                {wallets?.map((wallet, walletIndex) => {
                  return (
                    <div className="flex gap-3" key={walletIndex}>
                      <div className="grid gap-2 content-start flex-shrink-0">
                        <span className="mt-1 w-8 h-8 rounded-full bg-foreground text-background grid place-content-center text-sm">
                          {walletIndex + 1}
                        </span>
                        <button
                          type="button"
                          className="w-8 h-8 rounded-full bg-destructive text-destructive-foreground grid place-content-center"
                          onClick={() =>
                            form.setValue(
                              "wallets",
                              wallets.filter(
                                (_, index) => index !== walletIndex
                              )
                            )
                          }
                        >
                          <Trash2 className="w-4" />
                        </button>
                      </div>
                      <div className="border p-3 lg:p-5 rounded-xl grid gap-4 glass-bg  flex-grow">
                        <FormField
                          control={form.control}
                          name={`wallets.${walletIndex}.address`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Address</FormLabel>
                              <FormControl>
                                <Input placeholder="0x121212..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid gap-2">
                          <FormLabel>Seed phrase</FormLabel>
                          <div className="grid grid-cols-3 gap-4">
                            {wallet.seedPhrase?.map((_, seedIndex) => (
                              <FormField
                                key={seedIndex}
                                control={form.control}
                                name={`wallets.${walletIndex}.seedPhrase.${seedIndex}`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        placeholder={`${seedIndex + 1}`}
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Button
                type="button"
                className="gap-2 justify-self-start"
                onClick={() =>
                  form.setValue("wallets", [...wallets, emptyWallet])
                }
              >
                <Plus className="w-4" /> Add wallet
              </Button>
            </div>
            {/*  */}
            <div className="glass-bg rounded-xl p-4 lg:p-6 grid gap-4">
              <H3 className="mb-2">Passwords</H3>
              <div className="grid lg:grid-cols-2 gap-10 mb-3 empty:hidden">
                {passwords?.map((_, passwordIndex) => {
                  return (
                    <div className="flex gap-3" key={passwordIndex}>
                      <div className="grid gap-2 content-start flex-shrink-0">
                        <span className="mt-1 w-8 h-8 rounded-full bg-foreground text-background grid place-content-center text-sm">
                          {passwordIndex + 1}
                        </span>
                        <button
                          type="button"
                          className="w-8 h-8 rounded-full bg-destructive text-destructive-foreground grid place-content-center"
                          onClick={() =>
                            form.setValue(
                              "passwords",
                              passwords.filter(
                                (_, index) => index !== passwordIndex
                              )
                            )
                          }
                        >
                          <Trash2 className="w-4" />
                        </button>
                      </div>
                      <div className="border p-3 lg:p-5 rounded-xl grid gap-4 glass-bg flex-grow">
                        <FormField
                          control={form.control}
                          name={`passwords.${passwordIndex}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Metamask on MacBook"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`passwords.${passwordIndex}.password`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <Input placeholder="Password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <Button
                type="button"
                className="gap-2 justify-self-start"
                onClick={() =>
                  form.setValue("passwords", [...passwords, emptyPassWord])
                }
              >
                <Plus className="w-4" /> Add password
              </Button>
            </div>
            {/*  */}
            <div className="glass-bg rounded-xl p-4 lg:p-6 grid gap-4">
              <H3 className="mb-2">Receivers</H3>
              <div className="grid gap-4 empty:hidden">
                {receivers?.map((_, receiverIndex) => {
                  return (
                    <div className="flex gap-3" key={receiverIndex}>
                      <div className="grid gap-2 content-start flex-shrink-0">
                        <span className="mt-1 w-8 h-8 rounded-full bg-foreground text-background grid place-content-center text-sm">
                          {receiverIndex + 1}
                        </span>
                        <button
                          type="button"
                          className="w-8 h-8 rounded-full bg-destructive text-destructive-foreground grid place-content-center"
                          onClick={() =>
                            form.setValue(
                              "receivers",
                              receivers.filter(
                                (_, index) => index !== receiverIndex
                              )
                            )
                          }
                        >
                          <Trash2 className="w-4" />
                        </button>
                      </div>
                      <div className="border p-3 lg:p-5 rounded-xl grid gap-4 glass-bg flex-grow">
                        <FormField
                          control={form.control}
                          name={`receivers.${receiverIndex}`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Receiver address</FormLabel>
                              <FormControl>
                                <Input placeholder="0x121212..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <Button
                type="button"
                className="gap-2 justify-self-start"
                onClick={() => form.setValue("receivers", [...receivers, ""])}
              >
                <Plus className="w-4" /> Add receiver
              </Button>
            </div>
          </div>
          <Button type="submit" className="gap-2 mt-10 justify-self-start">
            <Save className="w-4" /> Save changes
          </Button>
        </form>
      </Form>
    </main>
  );
}
