import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container py-12">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-center text-3xl">About MigrateIQ</CardTitle>
            <CardDescription className="text-center text-lg">
              Innovating cloud migration with AI-powered automation.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-10">
            <p className="text-muted-foreground max-w-3xl mx-auto text-center">
              MigrateIQ was founded with a simple mission: to make cloud migration seamless, intelligent, and accessible for businesses of all sizes. We leverage cutting-edge AI to analyze your existing infrastructure, generate optimal migration blueprints, and automate complex processes, minimizing risk and accelerating your journey to the cloud. Our platform is built on the principles of precision, efficiency, and security, ensuring a successful migration every time.
            </p>

            <div className="space-y-6">
              <h3 className="text-2xl font-semibold font-headline text-center">Our Founders</h3>
              <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="flex flex-col items-center text-center gap-4">
                  <Avatar className="h-32 w-32">
                    <AvatarImage asChild>
                      <Image src="/images/shashikant.png" alt="Shashikant Pradip Borgavakar" width={128} height={128} />
                    </AvatarImage>
                    <AvatarFallback>SPB</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-bold text-xl">Shashikant Pradip Borgavakar</h4>
                    <p className="text-muted-foreground">Founder & CEO</p>
                    <p className="mt-2 text-sm max-w-xs">
                      With over two decades of experience in enterprise architecture and cloud solutions, Shashikant is a visionary leader passionate about solving complex technological challenges. His expertise drives the innovation at the core of MigrateIQ.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center text-center gap-4">
                  <Avatar className="h-32 w-32">
                    <AvatarImage asChild>
                      <Image src="/images/akshay.png" alt="Akshay Ghadge" width={128} height={128} />
                    </AvatarImage>
                    <AvatarFallback>AG</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-bold text-xl">Akshay Ghadge</h4>
                    <p className="text-muted-foreground">Co-Founder & CTO</p>
                    <p className="mt-2 text-sm max-w-xs">
                      Akshay is a technology enthusiast with a deep expertise in modern application development and cloud infrastructure. He is the architect behind MigrateIQ's robust and scalable platform, ensuring technical excellence and innovation.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center text-center gap-4">
                  <Avatar className="h-32 w-32">
                     <AvatarImage asChild>
                      <Image src="/images/ayon.png" alt="Ayon Sarkar" width={128} height={128} />
                    </AvatarImage>
                    <AvatarFallback>AS</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-bold text-xl">Ayon Sarkar</h4>
                    <p className="text-muted-foreground">Co-Founder & COO</p>
                    <p className="mt-2 text-sm max-w-xs">
                      Ayon brings operational excellence and strategic vision to the team. His focus on process optimization and customer success ensures that MigrateIQ delivers a world-class experience from start to finish.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
