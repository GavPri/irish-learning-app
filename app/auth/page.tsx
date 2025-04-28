import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <header className="flex items-center justify-between py-6">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-emerald-600"
            >
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
            </svg>
            <span className="text-xl font-bold text-slate-900">EireDecks</span>
          </div>
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              <li>
                <Link
                  href="#features"
                  className="text-sm font-medium text-slate-700 hover:text-emerald-600"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="text-sm font-medium text-slate-700 hover:text-emerald-600"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="text-sm font-medium text-slate-700 hover:text-emerald-600"
                >
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        <main>
          <section className="py-12 md:py-24">
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div className="order-2 md:order-1">
                <div className="relative h-[400px] w-full overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    src="/placeholder.svg?height=800&width=800"
                    alt="EireDecks Platform"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900/40 to-transparent"></div>
                </div>
              </div>
              <div className="order-1 space-y-6 md:order-2">
                <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800">
                  Learn Irish
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
                  Master the Irish Language with Ease
                </h1>
                <p className="text-lg text-slate-600">
                  EireDecks uses smart flashcards to help you learn Irish at
                  your own pace, making language acquisition fun and effective.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Link href={"/auth/sign-up"}>
                    <Button
                      size="lg"
                      className="bg-emerald-600 hover:bg-emerald-700"
                    >
                      Sign Up
                    </Button>
                  </Link>
                  <Link href={"/auth/sign-in"}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                    >
                      Sign In
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <span>
                    Join thousands of successful Irish language learners
                  </span>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
