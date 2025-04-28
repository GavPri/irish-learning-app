"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Plus, Layers } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  const { isSignedIn } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const routes = [
    {
      href: "/decks/create-deck",
      label: "Create Deck",
      icon: <Plus className="mr-2 h-4 w-4" />,
    },
    {
      href: "/decks/view-decks",
      label: "View Decks",
      icon: <Layers className="mr-2 h-4 w-4" />,
    },
  ];

  return (
    <nav className="border-b bg-background">
      <div className="flex h-16 items-center px-4 md:px-6">
        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="mr-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] sm:w-[300px]">
            <div className="flex flex-col gap-4 py-4">
              {routes.map((route) => (
                <Button
                  key={route.href}
                  asChild
                  variant="ghost"
                  className="justify-start"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href={route.href}>
                    {route.icon}
                    {route.label}
                  </Link>
                </Button>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="hidden md:inline-block">DeckBuilder</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:ml-auto md:flex md:items-center md:gap-4">
          {routes.map((route) => (
            <Button key={route.href} asChild variant="ghost">
              <Link href={route.href} className="flex items-center">
                {route.icon}
                {route.label}
              </Link>
            </Button>
          ))}
        </div>

        {/* Mobile Right Side */}
        <div className="ml-auto flex items-center gap-2 md:gap-4">
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <Button asChild variant="default" size="sm">
              <Link href="/auth/sign-in">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
