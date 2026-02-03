import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { formatDateTime } from "@/lib/format";

type ForumCategory = {
  id: string;
  name: string;
  is_announcement: boolean;
};

type ForumTopic = {
  id: string;
  title: string;
  body: string;
  created_at: string;
  created_by: string;
  is_hidden: boolean;
  forum_categories?: ForumCategory | null;
  profiles?: { display_name: string | null } | null;
};

type ForumComment = {
  id: string;
  body: string;
  created_at: string;
  created_by: string;
  is_hidden: boolean;
  profiles?: { display_name: string | null } | null;
};

export default function TopicDetail() {
  const { topicId } = useParams();
  const { toast } = useToast();
  const { user, profile, loading } = useAuth();
  const [topic, setTopic] = useState<ForumTopic | null>(null);
  const [comments, setComments] = useState<ForumComment[]>([]);
  const [commentBody, setCommentBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isApproved = profile?.status === "approved";
  const isAdmin = profile?.role === "admin";

  const canView = useMemo(() => Boolean(user && isApproved), [user, isApproved]);

  useEffect(() => {
    const fetchTopic = async () => {
      if (!topicId || !canView) return;
      setIsLoading(true);

      const { data: topicData } = await supabase
        .from("forum_topics")
        .select(
          "id, title, body, created_at, created_by, is_hidden, forum_categories (id, name, is_announcement), profiles (display_name)"
        )
        .eq("id", topicId)
        .maybeSingle();

      if (topicData) {
        setTopic(topicData);
      }

      const { data: commentData } = await supabase
        .from("forum_comments")
        .select("id, body, created_at, created_by, is_hidden, profiles (display_name)")
        .eq("topic_id", topicId)
        .order("created_at", { ascending: true });

      setComments(commentData ?? []);
      setIsLoading(false);
    };

    void fetchTopic();
  }, [topicId, canView]);

  const handleAddComment = async () => {
    if (!user || !topicId) return;
    if (!commentBody.trim()) {
      toast({
        title: "Comment is empty",
        description: "Please add a message before posting.",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase.from("forum_comments").insert({
      topic_id: topicId,
      body: commentBody,
      created_by: user.id,
    });

    if (error) {
      toast({
        title: "Unable to post comment",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setCommentBody("");
    const { data: refreshedComments } = await supabase
      .from("forum_comments")
      .select("id, body, created_at, created_by, is_hidden, profiles (display_name)")
      .eq("topic_id", topicId)
      .order("created_at", { ascending: true });
    setComments(refreshedComments ?? []);
  };

  const handleHideTopic = async () => {
    if (!topicId) return;
    await supabase.from("forum_topics").update({ is_hidden: true }).eq("id", topicId);
    toast({ title: "Topic hidden", description: "The topic is now hidden from members." });
    setTopic((prev) => (prev ? { ...prev, is_hidden: true } : prev));
  };

  const handleDeleteTopic = async () => {
    if (!topicId) return;
    await supabase.from("forum_topics").delete().eq("id", topicId);
    toast({ title: "Topic deleted", description: "The topic and its comments were removed." });
  };

  const handleHideComment = async (commentId: string) => {
    await supabase.from("forum_comments").update({ is_hidden: true }).eq("id", commentId);
    setComments((prev) =>
      prev.map((comment) => (comment.id === commentId ? { ...comment, is_hidden: true } : comment))
    );
  };

  const handleDeleteComment = async (commentId: string) => {
    await supabase.from("forum_comments").delete().eq("id", commentId);
    setComments((prev) => prev.filter((comment) => comment.id !== commentId));
  };

  return (
    <Layout>
      <section className="py-10 md:py-14">
        <div className="container max-w-3xl space-y-6">
          <div>
            <Link to="/community" className="text-sm text-muted-foreground hover:text-accent">
              ← Back to Community
            </Link>
          </div>

          {!user && !loading && (
            <Card className="border-border bg-muted/40">
              <CardHeader>
                <CardTitle>Sign in required</CardTitle>
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
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  You are pending approval, so forum topics are not visible yet.
                </p>
              </CardContent>
            </Card>
          )}

          {canView && (
            <>
              {!topic && !isLoading && (
                <Card className="border-border">
                  <CardContent className="py-8 text-center text-sm text-muted-foreground">
                    This topic could not be found or you do not have access.
                  </CardContent>
                </Card>
              )}
              <Card className="border-border">
                <CardHeader className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <CardTitle className="text-2xl">{topic?.title ?? "Loading topic..."}</CardTitle>
                    {topic?.forum_categories?.is_announcement && <Badge>Announcement</Badge>}
                    {topic?.is_hidden && <Badge variant="destructive">Hidden</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {topic?.forum_categories?.name ?? "General"} ·{" "}
                    {topic?.created_at ? formatDateTime(topic.created_at) : ""} ·{" "}
                    {topic?.profiles?.display_name ?? "Community Member"}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-foreground whitespace-pre-line">{topic?.body}</p>
                  {isAdmin && (
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" onClick={handleHideTopic}>
                        Hide Topic
                      </Button>
                      <Link to="/community">
                        <Button variant="destructive" size="sm" onClick={handleDeleteTopic}>
                          Delete Topic
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Comments</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="rounded-lg border border-border p-4 space-y-2">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <span>{comment.profiles?.display_name ?? "Community Member"}</span>
                        <span>•</span>
                        <span>{formatDateTime(comment.created_at)}</span>
                        {comment.is_hidden && <Badge variant="destructive">Hidden</Badge>}
                      </div>
                      <p className="text-sm text-foreground whitespace-pre-line">{comment.body}</p>
                      {isAdmin && (
                        <div className="flex flex-wrap gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleHideComment(comment.id)}>
                            Hide Comment
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteComment(comment.id)}>
                            Delete Comment
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                  {!isLoading && comments.length === 0 && (
                    <p className="text-sm text-muted-foreground">No comments yet. Start the conversation below.</p>
                  )}
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Add a Comment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Textarea
                    rows={4}
                    placeholder="Share your response or update."
                    value={commentBody}
                    onChange={(event) => setCommentBody(event.target.value)}
                  />
                  <Button onClick={handleAddComment}>Post Comment</Button>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
