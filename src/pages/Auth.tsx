import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";

export default function Auth() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async () => {
    setSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setSubmitting(false);

    if (error) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Welcome back!",
      description: "You're signed in.",
    });
    navigate("/community");
  };

  const handleSignUp = async () => {
    setSubmitting(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    setSubmitting(false);

    if (error) {
      toast({
        title: "Sign up failed",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    if (data.user) {
      await supabase.from("profiles").upsert({
        user_id: data.user.id,
        status: "pending",
        role: "user",
        display_name: displayName || null,
      });
    }

    toast({
      title: "Account created",
      description: "Check your email to confirm your account. You will be pending approval after signup.",
    });
    setActiveTab("login");
  };

  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container max-w-2xl">
          <Card className="shadow-elegant border-border">
            <CardHeader>
              <CardTitle className="text-2xl">Tenant Forum Access</CardTitle>
              <CardDescription>
                Sign in or create an account. New users are pending approval before they can view or post in the forum.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {user ? (
                <div className="space-y-4">
                  <div className="rounded-lg border border-border bg-muted/40 p-4">
                    <p className="text-sm font-medium text-foreground">Signed in as {user.email}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Status: {profile?.status ?? "pending"} · Role: {profile?.role ?? "user"}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link to="/community" className="w-full">
                      <Button className="w-full">Go to Community Forum</Button>
                    </Link>
                    <Button variant="outline" className="w-full" onClick={() => signOut()}>
                      Sign Out
                    </Button>
                  </div>
                </div>
              ) : (
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  </TabsList>
                  <TabsContent value="login" className="space-y-4 pt-6">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <Input
                        id="login-password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                      />
                    </div>
                    <Button className="w-full" onClick={handleLogin} disabled={submitting}>
                      Sign In
                    </Button>
                  </TabsContent>
                  <TabsContent value="signup" className="space-y-4 pt-6">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">Display Name (optional)</Label>
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="Jordan"
                        value={displayName}
                        onChange={(event) => setDisplayName(event.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                      />
                    </div>
                    <Button className="w-full" onClick={handleSignUp} disabled={submitting}>
                      Create Account
                    </Button>
                  </TabsContent>
                </Tabs>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
