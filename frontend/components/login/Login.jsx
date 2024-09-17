"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

function Login() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    role: 'employee'
  });
  const [loading, setLoading] = useState(false);

  const handleRoleChange = (value) => {
    setUserData({ ...userData, role: value });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    // Collect errors
    const errors = [];
    if (!userData.email.trim()) errors.push("Email is empty");
    if (!userData.password.trim()) errors.push("Password is empty");

    // Show all collected errors
    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
      setLoading(false); // Stop loading if there are errors
      return;
    }

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, userData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      });

      // Handle response data
      if (res.data.success) {
        console.log('Login successful:', res.data);
        router.push('/');
      } else {
        toast.error(res.data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'An error occurred during login');
    } finally {
      setLoading(false); // Always stop loading after the request is complete
    }
  };

  return (
    <>
      <div>
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
            <Loader className="animate-spin text-4xl text-red-700" />
          </div>
        )}
      </div>

      <div className="bg-slate-150 flex justify-between items-start min-h-screen py-10 relative z-2 before:content:'' before:absolute before:top-0 before:left-[-50%] before:w-[200%] before:h-full before:bg-slate-50 before:z-[-1]">

        <div className="w-[50%] bg-white p-10">
          <h2 className='text-2xl font-extrabold mb-5'>Login</h2>
          <form onSubmit={onFormSubmit}>
            <div className='flex flex-col items-start gap-4'>

              <Input type="email" placeholder="Email" name='email' value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
              <Input type="password" placeholder="Password" name='password' value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
              <div className="mt-4 mb-2">
                <Label>Account Type</Label>
                <RadioGroup defaultValue="employee" className="flex gap-4 mt-2" onValueChange={handleRoleChange}>
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
              <p className='text-sm text-muted-foreground'>Don't have an account? <Link href="/signup" className='text-red-600'>Signup</Link></p>
            </div>
          </form>
        </div>
        <div>
          <Image src="/images/login.gif" alt="Login Animation" width="500" height="400" className='mix-blend-multiply' />
        </div>
      </div>
    </>
  );
}

export default Login;
