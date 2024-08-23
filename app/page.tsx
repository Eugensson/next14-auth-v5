import { Poppins } from "next/font/google";
import { LockKeyhole } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";

const poppins = Poppins({ subsets: ["latin"], weight: "600" });

export default function Home() {
  return (
    <main className="flex h-full flex-col justify-center items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            "text-6xl font-semibold text-white drop-shadow-md flex justify-center items-center gap-2",
            poppins.className
          )}
        >
          <LockKeyhole size={50} className="text-yellow-500" />
          Auth
        </h1>
        <p className="text-white text-lg text-center">
          A simple authentication service
        </p>
        <div>
          <LoginButton mode="modal" asChild>
            <Button variant="secondary" size="lg">
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
