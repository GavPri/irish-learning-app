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
import { DeckOptions } from "@/components/decks/deck-option";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function ViewDecks() {
  const [decks, setDecks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const client = useClerkSupabaseClient();
  const [showSignInModal, setShowSignInModal] = useState(false);

  useEffect(() => {
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
        <h1 className="text-3xl font-bold">All Decks</h1>
        {user ? (
          <Button asChild>
            <Link href="/decks/create-deck">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Deck
            </Link>
          </Button>
        ) : (
          <Button onClick={() => setShowSignInModal(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Deck
          </Button>
        )}
      </div>

      {decks.length === 0 ? (
        <div className="text-center py-12 bg-muted/50 rounded-lg">
          <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">No decks found</h3>
          <p className="text-muted-foreground mb-6">
            Create your first deck to get started
          </p>
          {user ? (
            <Button asChild>
              <Link href="/decks/create-deck">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Deck
              </Link>
            </Button>
          ) : (
            <Button onClick={() => setShowSignInModal(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Deck
            </Button>
          )}
        </div>
      ) : (
        <>
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
                  {user ? (
                    <Button asChild variant="outline" className="w-full">
                      <Link href={`/decks/${deck.id}`}>View Deck</Link>
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setShowSignInModal(true)}
                    >
                      View Deck
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Sign In Modal */}
          <Dialog open={showSignInModal} onOpenChange={setShowSignInModal}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Sign In Required</DialogTitle>
              </DialogHeader>
              <p className="text-sm text-muted-foreground">
                You must be signed in to view a deck. Please log in or create an
                account.
              </p>
              <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowSignInModal(false)}
                >
                  Cancel
                </Button>
                <Button asChild>
                  <Link href="/auth/sign-in">Sign In</Link>
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </main>
  );
}
