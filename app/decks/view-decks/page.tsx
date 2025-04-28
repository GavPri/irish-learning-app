"use client";

import { useEffect, useState } from "react";
import { useClerkSupabaseClient } from "@/hooks/supbase/useClerkSupabaseClient";
import { useUser } from "@clerk/nextjs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Loader2, BookOpen } from "lucide-react";
import Link from "next/link";
import { DeckOptions } from "@/components/decks/deck-option"; // <--- IMPORT HERE (create this file)

export default function ViewDecks() {
  const [decks, setDecks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const client = useClerkSupabaseClient();

  useEffect(() => {
    if (!user) return;
    async function loadDecks() {
      setLoading(true);
      const { data, error } = await client.from("decks").select();
      if (!error) setDecks(data);
      setLoading(false);
    }
    loadDecks();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Decks</h1>
        <Button asChild>
          <Link href="/decks/create-deck">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Deck
          </Link>
        </Button>
      </div>

      {decks.length === 0 ? (
        <div className="text-center py-12 bg-muted/50 rounded-lg">
          <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">No decks found</h3>
          <p className="text-muted-foreground mb-6">
            Create your first deck to get started
          </p>
          <Button asChild>
            <Link href="/decks/create-deck">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Your First Deck
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-fr">
          {/* Regular deck cards */}
          {decks.map((deck) => (
            <Card
              key={deck.id}
              className="flex flex-col justify-between hover:shadow-md transition-shadow p-4 relative"
            >
              <div className="absolute top-4 right-4">
                <DeckOptions
                  deckId={deck.id}
                  onDelete={(id) => {
                    setDecks((prev) => prev.filter((d) => d.id !== id));
                  }}
                />
              </div>

              <div className="flex flex-col gap-4 flex-grow">
                <CardHeader className="p-0">
                  <CardTitle className="text-lg">
                    {deck.title || "Untitled Deck"}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 text-sm text-muted-foreground">
                    {deck.description || "No description provided"}
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-0 flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen className="h-4 w-4" />
                  <span>{deck.cards?.length || 0} cards</span>
                </CardContent>
              </div>

              <CardFooter className="p-0 pt-4">
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/decks/${deck.id}`}>View Deck</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}

          {/* Create new deck card */}
          <Card className="border-dashed hover:border-solid hover:bg-muted/50 transition-colors cursor-pointer flex flex-col items-center justify-center p-6">
            <Link
              href="/decks/create-deck"
              className="flex flex-col items-center justify-center gap-4 text-center h-full"
            >
              <PlusCircle className="h-12 w-12 text-muted-foreground" />
              <p className="text-lg font-medium">Create New Deck</p>
            </Link>
          </Card>
        </div>
      )}
    </main>
  );
}
