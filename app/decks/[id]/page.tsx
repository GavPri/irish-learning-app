'use client'
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useClerkSupabaseClient } from "@/hooks/supbase/useClerkSupabaseClient";
import { Loader2 } from "lucide-react";

export default function ViewSingleDeck() {
  const { id } = useParams<{ id: string }>(); // Grab id from URL
  const client = useClerkSupabaseClient();
  const [deck, setDeck] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchDeck() {
      setLoading(true);

      const { data, error } = await client
        .from("decks")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching deck:", error.message);
      } else {
        setDeck(data);
      }

      setLoading(false);
    }

    fetchDeck();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!deck) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-center text-muted-foreground">
        <p>Deck not found.</p>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{deck.title}</h1>
      <p className="text-muted-foreground mb-6">{deck.description}</p>

      <div className="text-sm text-gray-500">
        {deck.is_public ? "Public Deck 🌎" : "Private Deck 🔒"}
      </div>

      {/* Add more fields like deck.cards.length if you want */}
    </main>
  );
}
