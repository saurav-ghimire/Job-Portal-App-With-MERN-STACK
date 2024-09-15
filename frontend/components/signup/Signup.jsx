"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import axios from "axios";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

function SignUp() {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    phonenumber: "",
    role: "employee",
  });
  const [loading, setLoading] = useState(false);

  const changeEventHandle = (e) => {
    const { name, value } = e.target;

    // Filter numeric values for phone number input
    if (name === "phonenumber") {
      const numericValue = value.replace(/\D/g, ''); // Remove non-numeric characters
      setInput({ ...input, [name]: numericValue });
    } else {
      setInput({ ...input, [name]: value });
    }
  };

  const handleRoleChange = (value) => {
    setInput({ ...input, role: value });
  };

  const sumbitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Collect errors
    const errors = [];

    if (!input.fullname.trim()) errors.push("Full Name is empty");
    if (!input.email.trim()) errors.push("Email is empty");
    if (!input.password.trim()) errors.push("Password is empty");
    if (!input.phonenumber.trim()) errors.push("Phone Number is empty");
    if (!input.role.trim()) errors.push("Role is empty");

    // Show all collected errors
    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res?.data?.success) {
        toast.success("User Successfully Registered");
        setInput({
          fullname: "",
          email: "",
          password: "",
          phonenumber: "",
          role: "employee",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Registration failed");
    }
    setLoading(false);
  };

  return (
    <div className="bg-slate-50 flex justify-between items-start min-h-screen py-10 relative z-2 before:content:'' before:absolute before:top-0 before:left-[-50%] before:w-[200%] before:h-full before:bg-slate-50 before:z-[-1]">
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
          <Loader className="animate-spin text-4xl text-red-700" />
        </div>
      )}
      <div className="w-[50%] bg-white p-10">
        <h2 className="text-2xl font-extrabold mb-5">Signup</h2>
        <form onSubmit={sumbitHandler} action="post">
          <div className="flex flex-col items-start gap-4">
            <Input
              type="text"
              placeholder="Full Name"
              name="fullname"
              onChange={changeEventHandle}
              value={input.fullname}
              disabled={loading} // Disable input during loading
            />
            <Input
              type="email"
              placeholder="Email"
              name="email"
              onChange={changeEventHandle}
              value={input.email}
              disabled={loading} // Disable input during loading
            />
            <Input
              type="tel"
              placeholder="Phone Number"
              name="phonenumber"
              onChange={changeEventHandle}
              value={input.phonenumber}
              disabled={loading} // Disable input during loading
            />
            <Input
              type="password"
              placeholder="Password"
              name="password"
              onChange={changeEventHandle}
              value={input.password}
              disabled={loading} // Disable input during loading
            />
            <div className="mt-4 mb-2">
              <Label>Account Type</Label>
              <RadioGroup
                defaultValue="employee"
                className="flex gap-4 mt-2"
                onValueChange={handleRoleChange}
                disabled={loading} // Disable radio group during loading
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="employee"
                    id="employee"
                    name="role"
                    disabled={loading} // Disable radio option during loading
                  />
                  <Label htmlFor="employee">Seeking For Job</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="recruiter"
                    id="recruiter"
                    name="role"
                    disabled={loading} // Disable radio option during loading
                  />
                  <Label htmlFor="recruiter">Recruiter</Label>
                </div>
              </RadioGroup>
            </div>

            <Button className="w-full bg-red-700 hover:bg-red-900" disabled={loading}>
              {loading ? "Signing up..." : "Signup"}
            </Button>
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-red-600">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
      <div>
        <Image
          src="/images/signup.gif"
          alt="Signup Animation"
          width="500"
          height="600"
          className="mix-blend-multiply"
        />
      </div>
    </div>
  );
}

export default SignUp;
