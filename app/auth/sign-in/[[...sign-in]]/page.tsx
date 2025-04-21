import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-screen h-[100dvh] flex justify-center items-center bg-gray-600">
      <SignIn />
    </div>
  );
}
