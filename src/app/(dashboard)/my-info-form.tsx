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
import { Save } from "lucide-react";

const formSchema = z.object({
  fullName: z.string().min(1, { message: "Full name is required" }).max(100),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("This is not a valid email."),
});

type FormSchema = z.infer<typeof formSchema>;

const MyInfoForm = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver<any>(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  function onSubmit(values: FormSchema) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-4 glass-bg p-6 rounded-xl"
      >
        <div className="grid gap-1 p-6 rounded-xl border-2 border-dashed border-destructive">
          <p>
            Save your contact information so we can reach you in case someone
            reports your death.
          </p>
          <p className="font-semibold">
            {`Without this information we won't be able to find you.`}
          </p>
        </div>
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
        <Button type="submit" className="mt-2 gap-2">
          <Save className="w-4" />
          Save
        </Button>
      </form>
    </Form>
  );
};

export default MyInfoForm;
