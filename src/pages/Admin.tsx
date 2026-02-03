import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { formatDateTime } from "@/lib/format";

type PendingProfile = {
  user_id: string;
  display_name: string | null;
  status: "pending" | "approved" | "rejected";
  role: "user" | "admin";
  created_at: string;
};

type ForumCategory = {
  id: string;
  name: string;
  description: string | null;
  is_announcement: boolean;
};

export default function Admin() {
  const { toast } = useToast();
  const { profile } = useAuth();
  const [pendingUsers, setPendingUsers] = useState<PendingProfile[]>([]);
  const [categories, setCategories] = useState<ForumCategory[]>([]);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    is_announcement: false,
  });

  const isAdmin = profile?.role === "admin";

  const fetchAdminData = async () => {
    const { data: pendingData } = await supabase
      .from("profiles")
      .select("user_id, display_name, status, role, created_at")
      .eq("status", "pending")
      .order("created_at", { ascending: true });

    setPendingUsers(pendingData ?? []);

    const { data: categoryData } = await supabase
      .from("forum_categories")
      .select("id, name, description, is_announcement")
      .order("name", { ascending: true });

    setCategories(categoryData ?? []);
  };

  useEffect(() => {
    if (isAdmin) {
      void fetchAdminData();
    }
  }, [isAdmin]);

  const handleApprove = async (userId: string) => {
    const { error } = await supabase.from("profiles").update({ status: "approved" }).eq("user_id", userId);
    if (error) {
      toast({ title: "Unable to approve", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Tenant approved", description: "The user can now access the forum." });
    void fetchAdminData();
  };

  const handlePromote = async (userId: string) => {
    const { error } = await supabase.from("profiles").update({ role: "admin", status: "approved" }).eq("user_id", userId);
    if (error) {
      toast({ title: "Unable to promote", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Admin promoted", description: "The user now has admin access." });
    void fetchAdminData();
  };

  const handleCategorySave = async (category: ForumCategory) => {
    const { error } = await supabase
      .from("forum_categories")
      .update({
        name: category.name,
        description: category.description,
        is_announcement: category.is_announcement,
      })
      .eq("id", category.id);

    if (error) {
      toast({ title: "Unable to update category", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Category updated" });
    void fetchAdminData();
  };

  const handleCreateCategory = async () => {
    if (!newCategory.name.trim()) {
      toast({ title: "Category name required", variant: "destructive" });
      return;
    }
    const { error } = await supabase.from("forum_categories").insert({
      name: newCategory.name,
      description: newCategory.description,
      is_announcement: newCategory.is_announcement,
    });
    if (error) {
      toast({ title: "Unable to create category", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Category created" });
    setNewCategory({ name: "", description: "", is_announcement: false });
    void fetchAdminData();
  };

  if (!isAdmin) {
    return (
      <Layout>
        <section className="py-16">
          <div className="container max-w-2xl">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Admin access required</CardTitle>
                <CardDescription>This page is only available to forum administrators.</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-12 md:py-16">
        <div className="container space-y-10">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Tools</h1>
            <p className="text-muted-foreground mt-2">
              Approve tenant accounts, manage forum categories, and keep announcements up to date.
            </p>
          </div>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>Pending Tenant Approvals</CardTitle>
              <CardDescription>Approve new tenants or promote trusted members to admins.</CardDescription>
            </CardHeader>
            <CardContent>
              {pendingUsers.length === 0 ? (
                <p className="text-sm text-muted-foreground">No pending users right now.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tenant</TableHead>
                      <TableHead>Requested</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingUsers.map((pendingUser) => (
                      <TableRow key={pendingUser.user_id}>
                        <TableCell>
                          <div className="text-sm font-medium text-foreground">
                            {pendingUser.display_name ?? "New Tenant"}
                          </div>
                          <div className="text-xs text-muted-foreground">{pendingUser.user_id}</div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDateTime(pendingUser.created_at)}
                        </TableCell>
                        <TableCell className="flex flex-wrap gap-2">
                          <Button size="sm" onClick={() => handleApprove(pendingUser.user_id)}>
                            Approve
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handlePromote(pendingUser.user_id)}>
                            Promote to Admin
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>Create a Category</CardTitle>
              <CardDescription>Add new discussion areas or an announcements category.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="new-category-name">Category Name</Label>
                  <Input
                    id="new-category-name"
                    value={newCategory.name}
                    onChange={(event) => setNewCategory((prev) => ({ ...prev, name: event.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-category-description">Description</Label>
                  <Textarea
                    id="new-category-description"
                    value={newCategory.description}
                    onChange={(event) => setNewCategory((prev) => ({ ...prev, description: event.target.value }))}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={newCategory.is_announcement}
                  onCheckedChange={(value) => setNewCategory((prev) => ({ ...prev, is_announcement: value }))}
                />
                <Label>Mark as Announcements (admin-only posts)</Label>
              </div>
              <Button onClick={handleCreateCategory}>Create Category</Button>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>Edit Categories</CardTitle>
              <CardDescription>Update names, descriptions, or announcement status.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {categories.length === 0 ? (
                <p className="text-sm text-muted-foreground">No categories available yet.</p>
              ) : (
                categories.map((category) => (
                  <div key={category.id} className="rounded-lg border border-border p-4 space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Category Name</Label>
                        <Input
                          value={category.name}
                          onChange={(event) =>
                            setCategories((prev) =>
                              prev.map((item) =>
                                item.id === category.id ? { ...item, name: event.target.value } : item
                              )
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          value={category.description ?? ""}
                          onChange={(event) =>
                            setCategories((prev) =>
                              prev.map((item) =>
                                item.id === category.id ? { ...item, description: event.target.value } : item
                              )
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={category.is_announcement}
                        onCheckedChange={(value) =>
                          setCategories((prev) =>
                            prev.map((item) =>
                              item.id === category.id ? { ...item, is_announcement: value } : item
                            )
                          )
                        }
                      />
                      <Label>Announcements category</Label>
                    </div>
                    <Button variant="outline" onClick={() => handleCategorySave(category)}>
                      Save Updates
                    </Button>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
