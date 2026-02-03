import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";

type ForumCategory = {
  id: string;
  name: string;
  description: string | null;
  is_announcement: boolean;
};

export default function NewTopic() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, profile, loading } = useAuth();
  const [categories, setCategories] = useState<ForumCategory[]>([]);
  const [categoryId, setCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isApproved = profile?.status === "approved";
  const isAdmin = profile?.role === "admin";

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase
        .from("forum_categories")
        .select("id, name, description, is_announcement")
        .order("name", { ascending: true });
      setCategories(data ?? []);
    };

    if (user && isApproved) {
      void fetchCategories();
    }
  }, [user, isApproved]);

  const handleSubmit = async () => {
    if (!user) return;
    if (!title.trim() || !body.trim() || !categoryId) {
      toast({
        title: "Missing information",
        description: "Please provide a category, title, and message.",
        variant: "destructive",
      });
      return;
    }

    const selectedCategory = categories.find((category) => category.id === categoryId);
    if (selectedCategory?.is_announcement && !isAdmin) {
      toast({
        title: "Announcements are admin-only",
        description: "Please select another category.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("forum_topics").insert({
      title,
      body,
      category_id: categoryId,
      created_by: user.id,
    });
    setSubmitting(false);

    if (error) {
      toast({
        title: "Unable to create topic",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Topic created",
      description: "Your topic is live in the community forum.",
    });
    navigate("/community");
  };

  return (
    <Layout>
      <section className="py-12 md:py-16">
        <div className="container max-w-2xl space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Create a Topic</h1>
            <p className="text-muted-foreground mt-2">
              Start a new discussion in the tenant forum. Remember to keep details respectful and focused on shared
              solutions.
            </p>
          </div>

          {!user && !loading && (
            <Card className="border-border bg-muted/40">
              <CardHeader>
                <CardTitle>Sign in required</CardTitle>
                <CardDescription>Only approved tenants can create forum topics.</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/auth">
                  <Button>Sign In or Create Account</Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {user && !loading && !isApproved && (
            <Card className="border-border bg-muted/40">
              <CardHeader>
                <CardTitle>Approval required</CardTitle>
                <CardDescription>Your account must be approved before you can post a topic.</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/community">
                  <Button variant="outline">Back to Community</Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {user && isApproved && (
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Topic Details</CardTitle>
                <CardDescription>Choose a category and describe your topic clearly.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={categoryId} onValueChange={setCategoryId}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories
                        .filter((category) => (isAdmin ? true : !category.is_announcement))
                        .map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  {!isAdmin && (
                    <p className="text-xs text-muted-foreground">
                      Announcement categories are reserved for admins.
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="E.g., Elevator outages in Building C"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="body">Message</Label>
                  <Textarea
                    id="body"
                    rows={6}
                    placeholder="Share details, dates, and what support you need."
                    value={body}
                    onChange={(event) => setBody(event.target.value)}
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button onClick={handleSubmit} disabled={submitting}>
                    Post Topic
                  </Button>
                  <Link to="/community">
                    <Button variant="ghost">Cancel</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </Layout>
  );
}
