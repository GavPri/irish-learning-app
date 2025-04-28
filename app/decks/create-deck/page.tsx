"use client";

import { useSession, useUser } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";

interface FormData {
  title: string;
  description: string;
  is_public: boolean;
}

const page = () => {
  const [decks, setDecks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    is_public: true,
  });
  const { user } = useUser();

  const { session } = useSession();

  function createClerkSupabaseClient() {
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        async accessToken() {
          return session?.getToken() ?? null;
        },
      }
    );
  }

  const client = createClerkSupabaseClient();

  useEffect(() => {
    if (!user) return;
    // TODO add a load decks fn
  });

  async function createTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { data, error } = await client.from("decks").insert({
      title: formData.title,
      description: formData.description,
      is_public: formData.is_public,
    });

    if (error) {
      console.error("Error creating deck: ", error.message);
    } else {
      console.log("Deck created successfully: ", data);
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;
    const name = target.name;
    const value =
      target.type === "checkbox"
        ? (target as HTMLInputElement).checked
        : target.value;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create a Deck</h1>
      <form onSubmit={createTask} className="space-y-4">
        <div>
          <label className="block mb-1">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="is_public"
            checked={formData.is_public}
            onChange={handleChange}
          />
          <label>Public Deck</label>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Deck
        </button>
      </form>
    </div>
  );
};

export default page;
