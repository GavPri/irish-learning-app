"use client";

import { useUser } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useClerkSupabaseClient } from "@/hooks/supbase/useClerkSupabaseClient";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  is_public: z.boolean(),
});

type FormData = z.infer<typeof formSchema>;

const Page = () => {
  const client = useClerkSupabaseClient();
  const router = useRouter()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      is_public: true,
    },
  });

  async function onSubmit(values: FormData) {
    const { data, error } = await client
      .from("decks")
      .insert(values)
      .select()
      .single();

    if (error) {
      console.error("Error creating deck:", error.message);
    } else {
      console.log("Deck created successfully:", data);
      form.reset();

      if (data?.id) {
        router.push(`/decks/${data.id}`); // ✅ redirect to the new deck by ID
      }
    }
  }


  return (
    <div className="max-w-md mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Create a Deck</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="is_public"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="font-normal">Public Deck</FormLabel>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Create Deck
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Page;
