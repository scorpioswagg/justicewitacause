import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Shield, Users, Target } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Dignity",
    description: "Every tenant deserves to be treated with respect and have their concerns heard.",
  },
  {
    icon: Shield,
    title: "Safety",
    description: "Your privacy and security are our top priorities. We protect your information.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Together, residents have more power to advocate for fair and safe housing.",
  },
  {
    icon: Target,
    title: "Action",
    description: "We provide tools and resources that help tenants take meaningful steps.",
  },
];

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-navy text-primary-foreground py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              About Justice With a Cause
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80">
              Empowering residents with the tools to document, connect, and advocate for their housing rights.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
              Our Mission
            </h2>
            <div className="prose prose-lg mx-auto text-muted-foreground">
              <p className="text-lg leading-relaxed mb-6">
                Justice With a Cause was created to give residents a platform that combines <strong className="text-foreground">dignity, documentation, and community</strong>. Every tenant deserves safety, respect, and a voice.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                We believe that when tenants have the right tools—clear documentation, accessible resources, and a supportive community—they're better equipped to address housing concerns and advocate for themselves.
              </p>
              <p className="text-lg leading-relaxed">
                Our platform is designed specifically for residents of AHF / Healthy Housing properties, providing a secure and unified space to report issues, share experiences, and access valuable resources.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-12 text-center">
            What Guides Us
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card key={value.title} className="border-border text-center">
                <CardContent className="pt-6">
                  <div className="h-14 w-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What We Provide */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              What We Provide
            </h2>
            <div className="space-y-6">
              <div className="bg-muted/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">Secure Incident Reporting</h3>
                <p className="text-muted-foreground">
                  Submit detailed reports about housing issues with the ability to attach evidence. Your submissions are kept private and secure.
                </p>
              </div>
              <div className="bg-muted/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">Community Forum</h3>
                <p className="text-muted-foreground">
                  Connect with fellow residents, share experiences, and support each other. Post anonymously if you prefer.
                </p>
              </div>
              <div className="bg-muted/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">Resource Library</h3>
                <p className="text-muted-foreground">
                  Access templates for formal letters, know-your-rights guides, and links to legal aid organizations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
