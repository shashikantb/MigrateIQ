
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
import PublicLayout from "../(public)/layout";

export default function LoginPage() {
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle authentication
    // For now, we'll just redirect to the dashboard
    router.push('/dashboard');
  };

  return (
    <PublicLayout>
        <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)] bg-background">
        <Card className="w-full max-w-sm">
            <CardHeader>
            <CardTitle className="text-2xl font-headline">Login</CardTitle>
            <CardDescription>
                Enter your email below to login to your account.
            </CardDescription>
            </CardHeader>
            <form onSubmit={handleLogin}>
            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                />
                </div>
                <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
                </div>
            </CardContent>
            <CardFooter>
                <Button type="submit" className="w-full">
                Sign in
                </Button>
            </CardFooter>
            </form>
        </Card>
        </div>
    </PublicLayout>
  );
}
