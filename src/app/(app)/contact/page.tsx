"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic
    alert("Thank you for your message! We will get back to you shortly.");
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Get in Touch</CardTitle>
          <CardDescription>
            Fill out the form and our team will get back to you within 24 hours.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter your name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Your message" required rows={5} />
            </div>
            <Button type="submit">Send Message</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Contact Information</CardTitle>
          <CardDescription>
            Reach out to us directly or visit our office.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Mail className="h-6 w-6 text-primary" />
            <div>
              <p className="font-semibold">Email</p>
              <a href="mailto:contact@migrateiq.com" className="text-muted-foreground hover:underline">
                contact@migrateiq.com
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Phone className="h-6 w-6 text-primary" />
            <div>
              <p className="font-semibold">Phone</p>
              <p className="text-muted-foreground">+1 (555) 123-4567</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <MapPin className="h-6 w-6 text-primary" />
            <div>
              <p className="font-semibold">Office Address</p>
              <p className="text-muted-foreground">123 Innovation Drive, Tech City, 12345</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
