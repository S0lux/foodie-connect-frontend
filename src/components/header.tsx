import { ChangTheme } from "@/components/change-theme";
import UserDropDown from "./user-drop-down";
import Link from "next/link";
import SearchBar from "./search-bar";

export default function Header({ children }: { children?: React.ReactNode }) {
  return (
    <div className="fixed left-0 right-0 top-0 z-10 flex h-[--header-height] max-w-full items-center justify-between gap-3 bg-card pl-4 pr-4 shadow">
      <div className="flex items-center justify-between gap-4">
        {children}
        <Link href={"/"}>
          <div className="text-[24px] font-bold text-primary">Foodie</div>
        </Link>
      </div>

      <div className="flex items-center justify-end gap-2 md:gap-4">
        <ChangTheme />
        <UserDropDown />
      </div>
    </div>
  );
}
