import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, MessageCircle, ShieldCheck, Calendar } from "lucide-react";

const highlights = [
  {
    icon: MessageCircle,
    title: "Share Your Story",
    description:
      "Post updates about housing concerns, celebrate wins, and learn from neighbors who have been there.",
  },
  {
    icon: ShieldCheck,
    title: "Stay Supported",
    description:
      "Find guidance on documenting issues safely and connect with resident advocates for next steps.",
  },
  {
    icon: Calendar,
    title: "Community Updates",
    description:
      "Get notified about tenant meetings, outreach events, and new resource drops from partner groups.",
  },
];

export default function Community() {
  return (
    <Layout>
      <section className="gradient-navy text-primary-foreground py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-accent">
              <Users className="h-6 w-6" />
              <span className="text-sm font-semibold uppercase tracking-wide">Community</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Connect with Neighbors Who Get It
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Join a supportive space where residents document concerns, share resources, and move forward together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Join the Conversation
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10">
                View Community Guidelines
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">What You Can Do Here</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-3">
              Community tools are designed to uplift resident voices while protecting privacy and safety.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {highlights.map((item) => (
              <Card key={item.title} className="border-border shadow-elegant">
                <CardContent className="pt-6 space-y-3">
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Ready to Join the Resident Network?
            </h2>
            <p className="text-muted-foreground">
              Create a free account to post, follow updates, and receive community alerts tailored to your building.
            </p>
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Create an Account
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
