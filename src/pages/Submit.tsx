import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Upload, CheckCircle, AlertCircle, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const ISSUE_TYPES = [
  "Harassment",
  "Unsafe Conditions",
  "Maintenance Neglect",
  "Discrimination",
  "Privacy Violations",
  "Retaliation",
  "Other",
] as const;

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "video/mp4",
  "video/quicktime",
  "video/webm",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "audio/mpeg",
  "audio/wav",
  "audio/mp4",
];

const formSchema = z.object({
  fullName: z.string().optional(),
  propertyName: z.string().min(1, "Property name is required").max(200),
  unitNumber: z.string().min(1, "Unit number is required").max(50),
  contactInfo: z.string().max(200).optional(),
  issueType: z.enum(ISSUE_TYPES, {
    required_error: "Please select an issue type",
  }),
  incidentDates: z.string().min(1, "Incident date(s) is required").max(200),
  description: z.string().min(10, "Please provide a detailed description (at least 10 characters)").max(5000),
  locationNotes: z.string().max(500).optional(),
  truthfulnessAffirmation: z.boolean().refine((val) => val === true, {
    message: "You must affirm that the information is accurate",
  }),
  allowFollowup: z.boolean().default(false),
});

type FormData = z.infer<typeof formSchema>;

interface UploadedFile {
  file: File;
  preview?: string;
}

export default function Submit() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      propertyName: "",
      unitNumber: "",
      contactInfo: "",
      incidentDates: "",
      description: "",
      locationNotes: "",
      truthfulnessAffirmation: false,
      allowFollowup: false,
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploadError(null);
    const newFiles: UploadedFile[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      if (file.size > MAX_FILE_SIZE) {
        setUploadError(`File "${file.name}" exceeds 50MB limit`);
        continue;
      }

      if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
        setUploadError(`File "${file.name}" has an unsupported format`);
        continue;
      }

      const preview = file.type.startsWith("image/") 
        ? URL.createObjectURL(file) 
        : undefined;

      newFiles.push({ file, preview });
    }

    setUploadedFiles((prev) => [...prev, ...newFiles]);
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => {
      const newFiles = [...prev];
      if (newFiles[index].preview) {
        URL.revokeObjectURL(newFiles[index].preview!);
      }
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      // Generate IDs client-side to avoid needing SELECT permissions
      const submissionId = crypto.randomUUID();
      const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const referenceId = `JWC-${today}-${submissionId.slice(0, 8)}`;

      // Insert submission without .select() to avoid RLS SELECT restriction
      const { error: submissionError } = await supabase
        .from("submissions")
        .insert({
          id: submissionId,
          reference_id: referenceId,
          full_name: data.fullName || null,
          property_name: data.propertyName,
          unit_number: data.unitNumber,
          contact_info: data.contactInfo || null,
          issue_type: data.issueType,
          incident_dates: data.incidentDates,
          description: data.description,
          location_notes: data.locationNotes || null,
          allow_followup: data.allowFollowup,
        } as any);

      if (submissionError) throw submissionError;

      // Upload files if any
      if (uploadedFiles.length > 0) {
        for (const { file } of uploadedFiles) {
          const filePath = `${submissionId}/${Date.now()}-${file.name}`;
          
          const { error: uploadError } = await supabase.storage
            .from("evidence")
            .upload(filePath, file);

          if (uploadError) {
            console.error("File upload error:", uploadError);
            continue;
          }

          // Record file in database
          await supabase.from("submission_files").insert({
            submission_id: submissionId,
            file_name: file.name,
            file_path: filePath,
            file_size: file.size,
            file_type: file.type,
          } as any);
        }
      }

      setSubmissionSuccess(referenceId);
      form.reset();
      setUploadedFiles([]);

      toast({
        title: "Submission Received",
        description: `Your reference ID is ${referenceId}`,
      });

    } catch (error: any) {
      console.error("Submission error:", error);
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submissionSuccess) {
    return (
      <Layout>
        <div className="min-h-screen bg-muted/30 py-12">
          <div className="container max-w-2xl">
            <Card className="border-accent">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                  <CheckCircle className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-2xl text-primary">Submission Received</CardTitle>
                <CardDescription className="text-base">
                  Thank you for reporting your concern. Your submission has been securely recorded.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 text-center">
                <div className="rounded-lg bg-muted p-6">
                  <p className="text-sm text-muted-foreground mb-2">Your Reference ID</p>
                  <p className="text-2xl font-mono font-bold text-primary">{submissionSuccess}</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Please save this reference ID for your records. You may need it for follow-up inquiries.
                </p>
                <Button onClick={() => setSubmissionSuccess(null)} variant="outline">
                  Submit Another Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-muted/30 py-12">
        <div className="container max-w-3xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-primary mb-2">
              Report an Issue Safely & Securely
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Your information is protected. Only authorized administrators can view submissions.
              You may submit anonymously if you prefer.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Incident Report Form</CardTitle>
              <CardDescription>
                Fields marked with <span className="text-destructive">*</span> are required
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Contact Information Section */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-primary">Contact Information</h3>
                    
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormDescription>
                            You may submit anonymously by leaving this blank
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="propertyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Property Name <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Sunset Apartments" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="unitNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Unit Number <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 101, 2B" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="contactInfo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Email or Phone (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="email@example.com or (555) 123-4567" {...field} />
                          </FormControl>
                          <FormDescription>
                            Provide this if you'd like to be contacted about your submission
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Incident Details Section */}
                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="font-semibold text-primary">Incident Details</h3>

                    <FormField
                      control={form.control}
                      name="issueType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Issue Type <span className="text-destructive">*</span></FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select the type of issue" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {ISSUE_TYPES.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="incidentDates"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Incident Date(s) <span className="text-destructive">*</span></FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g., January 15, 2025 or Ongoing since December 2024" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Specify when the incident(s) occurred or if it's ongoing
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Detailed Description <span className="text-destructive">*</span></FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Please describe the incident in detail. Include what happened, who was involved, and any other relevant information."
                              className="min-h-[150px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="locationNotes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location Notes (Optional)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g., Occurred in the parking garage, Building B lobby" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Evidence Upload Section */}
                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="font-semibold text-primary">Upload Evidence (Optional)</h3>
                    <p className="text-sm text-muted-foreground">
                      Supported formats: Images, Video, PDF, DOCX, Audio. Max 50MB per file.
                    </p>

                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                      <Upload className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
                      <Label
                        htmlFor="file-upload"
                        className="cursor-pointer text-primary hover:text-primary/80"
                      >
                        Click to upload files
                      </Label>
                      <Input
                        id="file-upload"
                        type="file"
                        multiple
                        accept={ACCEPTED_FILE_TYPES.join(",")}
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        or drag and drop
                      </p>
                    </div>

                    {uploadError && (
                      <div className="flex items-center gap-2 text-destructive text-sm">
                        <AlertCircle className="h-4 w-4" />
                        {uploadError}
                      </div>
                    )}

                    {uploadedFiles.length > 0 && (
                      <div className="space-y-2">
                        {uploadedFiles.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-3 bg-muted rounded-lg"
                          >
                            {item.preview ? (
                              <img
                                src={item.preview}
                                alt={item.file.name}
                                className="h-12 w-12 object-cover rounded"
                              />
                            ) : (
                              <div className="h-12 w-12 bg-primary/10 rounded flex items-center justify-center">
                                <Upload className="h-5 w-5 text-primary" />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">
                                {item.file.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {(item.file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFile(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Affirmations Section */}
                  <div className="space-y-4 pt-4 border-t">
                    <FormField
                      control={form.control}
                      name="truthfulnessAffirmation"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              Truthfulness Affirmation <span className="text-destructive">*</span>
                            </FormLabel>
                            <FormDescription>
                              By checking this box, I affirm that the information provided is accurate 
                              to the best of my knowledge.
                            </FormDescription>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="allowFollowup"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Allow Follow-up (Optional)</FormLabel>
                            <FormDescription>
                              Check this box if you consent to being contacted about this submission.
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Privacy Notice */}
                  <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
                    <strong className="text-foreground">Privacy Notice:</strong> We do not sell your 
                    information. We use it only to review your submission and support tenant documentation. 
                    Your submission is only visible to authorized administrators.
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Report"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
