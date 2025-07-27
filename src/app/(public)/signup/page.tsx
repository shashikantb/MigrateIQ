
"use client"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from 'next/navigation'
import PublicLayout from "../layout";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function SignupPage() {
  const router = useRouter()
  const { signup } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signup(email, password);
      toast({
        title: "Account Created",
        description: "You have been successfully signed up.",
      });
      router.push('/dashboard');
    } catch (error: any) {
       toast({
        variant: "destructive",
        title: "Signup Failed",
        description: error.message,
      });
      setLoading(false);
    }
  };

  return (
    <PublicLayout>
        <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)] bg-background">
        <Card className="w-full max-w-sm">
            <CardHeader>
            <CardTitle className="text-2xl font-headline">Sign Up</CardTitle>
            <CardDescription>
                Enter your information to create an account.
            </CardDescription>
            </CardHeader>
            <form onSubmit={handleSignup}>
            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </div>
                <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
                <Button type="submit" className="w-full" disabled={loading}>
                 {loading ? 'Creating account...' : 'Sign Up'}
                </Button>
                 <div className="text-center text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <Link href="/login" className="underline">
                        Sign in
                    </Link>
                </div>
            </CardFooter>
            </form>
        </Card>
        </div>
    </PublicLayout>
  );
}
