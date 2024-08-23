import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { LockKeyhole } from "lucide-react";

const poppins = Poppins({ subsets: ["latin"], weight: "600" });

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-y-4">
      <h1
        className={cn(
          "text-3xl font-semibold flex justify-center items-center gap-2",
          poppins.className
        )}
      >
        <LockKeyhole size={30} className="text-yellow-500" />
        Auth
      </h1>
      <p className="text-muted-foreground text-sm text-center">{label}</p>
    </div>
  );
};
