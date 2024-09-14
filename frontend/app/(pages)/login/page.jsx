import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Image from "next/image";

function LoginPage() {
  return (
    <div className="bg-slate-150 flex justify-between items-start min-h-screen py-10 relative z-2 before:content:'' before:absolute before:top-0 before:left-[-50%] before:w-[200%] before:h-full before:bg-slate-50 before:z-[-1]">
      <div className="w-[50%] bg-white p-10">
        <h2 className='text-2xl font-extrabold mb-5'>Login</h2>
        <form action="">
          <div className='flex flex-col items-start gap-4'>

            <Input type="email" placeholder="Email" name='email' />
            <Input type="password" placeholder="Password" name='password' />
            <div className="mt-4 mb-2">
              <Label>Account Type</Label>
              <RadioGroup defaultValue="employee" className="flex gap-4 mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="employee" id="employee" name='role' />
                  <Label htmlFor="employee">Seeking For Job</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="recruiter" id="recruiter" name='role' />
                  <Label htmlFor="recruiter">Recruiter</Label>
                </div>
              </RadioGroup>
            </div>

            <Button className='w-full bg-red-700 hover:bg-red-900'>Login</Button>

          </div>
        </form>
      </div>
      <div>
        <Image src="/images/login.gif" alt="Login Animation" width="500" height="400" className='mix-blend-multiply' />
      </div>
    </div>
  );
}

export default LoginPage;