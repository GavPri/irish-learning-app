"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useClerkSupabaseClient } from "@/hooks/supbase/useClerkSupabaseClient";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  is_public: z.boolean(),
});

type FormData = z.infer<typeof formSchema>;

const EditDeckPage = () => {
  const { id } = useParams<{ id: string }>(); // get deck id from URL
  const router = useRouter();
  const client = useClerkSupabaseClient();

  const [loading, setLoading] = useState(true);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      is_public: true,
    },
  });

  useEffect(() => {
    async function fetchDeck() {
      if (!id) return;
      setLoading(true);

      const { data, error } = await client
        .from("decks")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching deck:", error.message);
      } else if (data) {
        form.reset({
          title: data.title || "",
          description: data.description || "",
          is_public: data.is_public ?? true,
        });
      }

      setLoading(false);
    }

    fetchDeck();
  }, [id, form]);

  async function onSubmit(values: FormData) {
    const { data, error } = await client
      .from("decks")
      .update(values)
      .eq("id", id);

    if (error) {
      console.error("Error updating deck:", error.message);
    } else {
      console.log("Deck updated successfully:", data);
      router.push("/decks/view-decks"); 
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Edit Deck</h1>

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
            Update Deck
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditDeckPage;
