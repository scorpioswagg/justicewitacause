-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table for role-based access
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Policy: users can view their own roles
CREATE POLICY "Users can view own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Policy: admins can view all roles
CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create enum for issue types
CREATE TYPE public.issue_type AS ENUM (
    'Harassment',
    'Unsafe Conditions', 
    'Maintenance Neglect',
    'Discrimination',
    'Privacy Violations',
    'Retaliation',
    'Other'
);

-- Create enum for submission status
CREATE TYPE public.submission_status AS ENUM ('new', 'reviewed', 'resolved');

-- Create submissions table
CREATE TABLE public.submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference_id TEXT NOT NULL UNIQUE,
    full_name TEXT,
    property_name TEXT NOT NULL,
    unit_number TEXT NOT NULL,
    contact_info TEXT,
    issue_type issue_type NOT NULL,
    incident_dates TEXT NOT NULL,
    description TEXT NOT NULL,
    location_notes TEXT,
    allow_followup BOOLEAN DEFAULT false,
    status submission_status DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on submissions
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- Policy: anyone can insert submissions (public intake form)
CREATE POLICY "Anyone can submit"
ON public.submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Policy: only admins can view submissions
CREATE POLICY "Admins can view submissions"
ON public.submissions
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Policy: only admins can update submissions
CREATE POLICY "Admins can update submissions"
ON public.submissions
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create submission_files table
CREATE TABLE public.submission_files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    submission_id UUID REFERENCES public.submissions(id) ON DELETE CASCADE NOT NULL,
    file_name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    file_size INTEGER NOT NULL,
    file_type TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on submission_files
ALTER TABLE public.submission_files ENABLE ROW LEVEL SECURITY;

-- Policy: anyone can insert files (during submission)
CREATE POLICY "Anyone can upload files"
ON public.submission_files
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Policy: only admins can view files
CREATE POLICY "Admins can view files"
ON public.submission_files
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create function to generate reference ID
CREATE OR REPLACE FUNCTION public.generate_reference_id()
RETURNS TRIGGER AS $$
BEGIN
    NEW.reference_id := 'JWC-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || SUBSTRING(NEW.id::TEXT, 1, 8);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for reference ID
CREATE TRIGGER set_reference_id
    BEFORE INSERT ON public.submissions
    FOR EACH ROW
    EXECUTE FUNCTION public.generate_reference_id();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_submissions_updated_at
    BEFORE UPDATE ON public.submissions
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for evidence files
INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES ('evidence', 'evidence', false, 52428800);

-- Storage policies: anyone can upload to evidence bucket
CREATE POLICY "Anyone can upload evidence"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'evidence');

-- Storage policies: only admins can view evidence files
CREATE POLICY "Admins can view evidence"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'evidence' AND public.has_role(auth.uid(), 'admin'));