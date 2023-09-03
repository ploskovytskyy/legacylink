"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSetMyInfo } from "../use-set-my-info";
import { Loader2, Save } from "lucide-react";

const formSchema = z.object({
  id: z.number().optional(),
  fullName: z.string().min(1, { message: "Full name is required" }).max(100),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("This is not a valid email."),
  wallet: z.string(),
});

export type FormSchema = z.infer<typeof formSchema>;

type Props = {
  isNoUser: boolean;
  defaultValues: FormSchema;
};

export const InfoForm = ({ defaultValues, isNoUser }: Props) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver<any>(formSchema),
    defaultValues,
  });

  const { mutate: setMyInfo, isLoading: isSettingMyInfo } = useSetMyInfo();

  function onSubmit(values: FormSchema) {
    setMyInfo(
      isNoUser
        ? values
        : {
            ...values,
            id: defaultValues.id,
          }
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (error) => console.log(error))}
        className="grid gap-4 glass-bg p-6 rounded-xl"
      >
        {isNoUser ? (
          <div className="grid gap-1 p-6 rounded-xl border-2 border-dashed border-destructive text-sm">
            <p>
              Save your contact information so we can reach you in case someone
              reports your death.
            </p>
            <p className="font-semibold">
              {`Without this information we won't be able to find you.`}
            </p>
          </div>
        ) : null}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input placeholder="Full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="your@contact.email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isSettingMyInfo} type="submit" className="mt-2 gap-2">
          {isSettingMyInfo ? (
            <Loader2 className="w-4 animate-spin" />
          ) : (
            <Save className="w-4" />
          )}
          Save
        </Button>
      </form>
    </Form>
  );
};
