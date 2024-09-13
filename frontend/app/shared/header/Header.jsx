import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


function Header() {
  return (
    <div className="flex justify-between items-center px-20 py-5">
      <div className="logo font-[900] text-black text-[25px]">
        Job<span className="text-red-500	">Portal</span>
      </div>
      <div className="flex gap-4">
        <ul>
          <li className="font-bold flex gap-4">
            <Link href="/">Home</Link>
            <Link href="/jobs">Jobs</Link>
            <Link href="/browse">Browse</Link>
          </li>
        </ul>
        <div>
          <Popover>
            <PopoverTrigger>Open</PopoverTrigger>
            <PopoverContent>Place content for the popover here.</PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}

export default Header;