"use client"
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { LogOut, User2 } from "lucide-react";
import { useState } from "react";


function Header() {
  const [user, setUser] = useState(false);
  return (
    <div className="flex justify-between items-center py-5 w-[85%] m-auto">
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
          {
            !user ? (
              <div className="flex gap-2">
                <Link href="/login"><Button variant='outline'>Login</Button></Link>
                <Link href="/signup"><Button className='bg-red-600 hover:bg-red-900'>Signup</Button></Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger>
                  <Avatar className='cursor-pointer'>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className='w-60'>
                  <div className="flex gap-3 mb-3">
                    <Avatar className='cursor-pointer'>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">Saurav Ghimire</h4>
                      <p className="text-sm text-muted-foreground">Full Stack Software Developer</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 items-start">
                    <div className="flex items-center">
                      <User2 />
                      <Button variant="link" >View Profile</Button>
                    </div>
                    <div className="flex items-center">
                      <LogOut />
                      <Button variant="link" >Logout</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default Header;