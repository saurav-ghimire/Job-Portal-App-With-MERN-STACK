import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


function Header() {
  return (
    <div className="flex justify-between items-center px-20 py-5">
      <div className="logo font-[900] text-black text-[25px]">
        Job<span className="text-red-500	">Portal</span>
      </div>
      <div className="flex gap-10 items-center">
        <ul>
          <li className="font-bold flex gap-4">
            <Link href="/">Home</Link>
            <Link href="/jobs">Jobs</Link>
            <Link href="/browse">Browse</Link>
          </li>
        </ul>
        <div>
          <Popover>
            <PopoverTrigger>
              <Avatar className='cursor-pointer'>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent>Place content for the popover here.</PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}

export default Header;