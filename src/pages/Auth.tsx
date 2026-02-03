import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, UserCheck } from "lucide-react";

export default function Auth() {
  return (
    <Layout>
      <section className="gradient-navy text-primary-foreground py-16 md:py-24">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-accent">
              <ShieldCheck className="h-6 w-6" />
              <span className="text-sm font-semibold uppercase tracking-wide">Sign In</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">Welcome Back</h1>
            <p className="text-lg text-primary-foreground/80">
              Access your reports, saved resources, and community updates in one secure place.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="max-w-xl mx-auto">
            <Card className="border-border shadow-elegant">
              <CardHeader className="space-y-2 text-center">
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                  <UserCheck className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-2xl">Sign in to your account</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border border-dashed border-border bg-muted/40 p-4 text-sm text-muted-foreground">
                  Authentication is coming soon. In the meantime, you can submit concerns and browse resources without an account.
                </div>
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="lg">
                  Continue with Email
                </Button>
                <Button className="w-full" variant="outline" size="lg">
                  Create a New Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}
