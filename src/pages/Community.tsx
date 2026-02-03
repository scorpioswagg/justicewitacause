import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { formatDateTime } from "@/lib/format";

type ForumCategory = {
  id: string;
  name: string;
  description: string | null;
  is_announcement: boolean;
};

type ForumTopic = {
  id: string;
  title: string;
  created_at: string;
  category_id: string;
  forum_categories?: ForumCategory | null;
  forum_comments?: { id: string }[];
};

export default function Community() {
  const { user, profile, loading } = useAuth();
  const [categories, setCategories] = useState<ForumCategory[]>([]);
  const [topics, setTopics] = useState<ForumTopic[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isApproved = profile?.status === "approved";
  const isAdmin = profile?.role === "admin";

  useEffect(() => {
    const fetchForum = async () => {
      if (!user || !isApproved) {
        return;
      }
      setIsLoading(true);
      setError(null);

      const { data: categoryData, error: categoryError } = await supabase
        .from("forum_categories")
        .select("id, name, description, is_announcement")
        .order("name", { ascending: true });

      if (categoryError) {
        setError(categoryError.message);
      } else {
        setCategories(categoryData ?? []);
      }

      const { data: topicData, error: topicError } = await supabase
        .from("forum_topics")
        .select(
          "id, title, created_at, category_id, forum_categories (id, name, description, is_announcement), forum_comments (id)"
        )
        .order("created_at", { ascending: false })
        .limit(20);

      if (topicError) {
        setError(topicError.message);
      } else {
        setTopics(topicData ?? []);
      }

      setIsLoading(false);
    };

    void fetchForum();
  }, [user, isApproved]);

  const sortedCategories = useMemo(() => {
    return [...categories].sort((a, b) => {
      if (a.is_announcement && !b.is_announcement) return -1;
      if (!a.is_announcement && b.is_announcement) return 1;
      return a.name.localeCompare(b.name);
    });
  }, [categories]);

  return (
    <Layout>
      <section className="gradient-navy text-primary-foreground py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold">Community Forum</h1>
            <p className="mt-3 text-primary-foreground/80 text-lg">
              Connect with neighbors, share concerns, and find trusted guidance. Forum access is limited to approved
              tenants.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container space-y-10">
          {!user && !loading && (
            <Card className="border-border bg-muted/40">
              <CardHeader>
                <CardTitle>Sign in to view the forum</CardTitle>
                <CardDescription>Only verified tenants can view and post in community discussions.</CardDescription>
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
                <CardTitle>Your account is pending approval</CardTitle>
                <CardDescription>
                  An admin must approve your account before you can view or create forum posts. You will be notified
                  once approved.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                <Button variant="outline" disabled>
                  Pending Approval
                </Button>
                <Link to="/auth">
                  <Button variant="ghost">View account status</Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {user && isApproved && (
            <>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground">Forum Categories</h2>
                  <p className="text-sm text-muted-foreground">
                    Browse topics by category. Announcements are pinned to the top for quick updates.
                  </p>
                </div>
                <Link to="/community/new">
                  <Button>Create New Topic</Button>
                </Link>
              </div>

              {error && (
                <Card className="border-destructive/30 bg-destructive/10">
                  <CardContent className="py-6 text-sm text-destructive">{error}</CardContent>
                </Card>
              )}

              <div className="grid gap-4 md:grid-cols-2">
                {sortedCategories.map((category) => (
                  <Card key={category.id} className="border-border">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">{category.name}</CardTitle>
                        {category.is_announcement && <Badge>Announcements</Badge>}
                      </div>
                      <CardDescription>{category.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {topics.filter((topic) => topic.category_id === category.id).length} recent topics
                      </p>
                      {category.is_announcement && !isAdmin && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Only admins can post announcements.
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold text-foreground">Recent Topics</h2>
                  {isLoading && <span className="text-sm text-muted-foreground">Loading...</span>}
                </div>
                <div className="space-y-3">
                  {topics.map((topic) => (
                    <Card key={topic.id} className="border-border">
                      <CardContent className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-4">
                        <div className="space-y-1">
                          <Link to={`/community/topics/${topic.id}`} className="text-lg font-semibold text-foreground">
                            {topic.title}
                          </Link>
                          <p className="text-xs text-muted-foreground">
                            {topic.forum_categories?.name ?? "General"} · {formatDateTime(topic.created_at)}
                          </p>
                        </div>
                        <Badge variant="outline">
                          {topic.forum_comments?.length ?? 0} replies
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                  {!isLoading && topics.length === 0 && (
                    <Card className="border-dashed">
                      <CardContent className="py-8 text-center text-sm text-muted-foreground">
                        No topics yet. Be the first to start a discussion.
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
