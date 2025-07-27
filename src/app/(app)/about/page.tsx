import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">About MigrateIQ</CardTitle>
          <CardDescription>
            Innovating cloud migration with AI-powered automation.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            MigrateIQ was founded with a simple mission: to make cloud migration seamless, intelligent, and accessible for businesses of all sizes. We leverage cutting-edge AI to analyze your existing infrastructure, generate optimal migration blueprints, and automate complex processes, minimizing risk and accelerating your journey to the cloud. Our platform is built on the principles of precision, efficiency, and security, ensuring a successful migration every time.
          </p>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold font-headline">Our Founders</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex items-start gap-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="https://placehold.co/400x400.png" data-ai-hint="man portrait" alt="Shashikant Pradip Borgavakar" />
                  <AvatarFallback>SPB</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-bold text-lg">Shashikant Pradip Borgavakar</h4>
                  <p className="text-muted-foreground">Founder & CEO</p>
                  <p className="mt-2 text-sm">
                    With over two decades of experience in enterprise architecture and cloud solutions, Shashikant is a visionary leader passionate about solving complex technological challenges. His expertise drives the innovation at the core of MigrateIQ.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="https://placehold.co/400x400.png" data-ai-hint="man portrait" alt="Akshay Ghadge" />
                  <AvatarFallback>AG</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-bold text-lg">Akshay Ghadge</h4>
                  <p className="text-muted-foreground">Co-Founder & CTO</p>
                  <p className="mt-2 text-sm">
                    Akshay is a technology enthusiast with a deep expertise in modern application development and cloud infrastructure. He is the architect behind MigrateIQ's robust and scalable platform, ensuring technical excellence and innovation.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="https://placehold.co/400x400.png" data-ai-hint="man portrait" alt="Ayon Sarkar" />
                  <AvatarFallback>AS</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-bold text-lg">Ayon Sarkar</h4>
                  <p className="text-muted-foreground">Co-Founder & COO</p>
                  <p className="mt-2 text-sm">
                    Ayon brings operational excellence and strategic vision to the team. His focus on process optimization and customer success ensures that MigrateIQ delivers a world-class experience from start to finish.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
