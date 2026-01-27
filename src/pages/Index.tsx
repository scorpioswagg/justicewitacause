import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, BookOpen, Shield, Heart, Scale } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Document Issues Securely",
    description: "Submit detailed reports with evidence. Your submissions are private and only viewed by our team.",
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Connect with fellow residents. Share experiences, tips, and stand together for better housing.",
  },
  {
    icon: BookOpen,
    title: "Know Your Rights",
    description: "Access templates, guides, and resources to help you navigate housing challenges confidently.",
  },
];

const values = [
  {
    icon: Shield,
    title: "Privacy Protected",
    description: "Your information stays secure. We never sell your data.",
  },
  {
    icon: Heart,
    title: "Tenant-First",
    description: "Built by advocates, for residents who deserve respect.",
  },
  {
    icon: Scale,
    title: "Fair Housing",
    description: "Empowering tenants to document and address housing concerns.",
  },
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="gradient-navy text-primary-foreground">
        <div className="container py-16 md:py-24 lg:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight animate-fade-in">
              Your Voice Has Power.{" "}
              <span className="text-accent">Your Home Has Rights.</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
              A safe, unified space for residents to document issues, share experiences, and stand together for fair and respectful housing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <Link to="/submit">
                <Button size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
                  Submit a Concern
                </Button>
              </Link>
              <Link to="/resources">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  Explore Resources
                </Button>
              </Link>
              <Link to="/community">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  Join the Community
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              How We Help
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Justice With a Cause provides the tools you need to document, connect, and advocate for your housing rights.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={feature.title} className="border-border shadow-elegant animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Our Commitment to You
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={value.title} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Take Action?
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
            Whether you need to report an issue, find resources, or connect with your community, we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/submit">
              <Button size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
                Submit a Concern
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
