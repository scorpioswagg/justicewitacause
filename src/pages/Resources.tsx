import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, ExternalLink, Wrench, AlertTriangle, Shield, Accessibility } from "lucide-react";

const templates = [
  {
    icon: Wrench,
    title: "Repair Request Letter",
    description: "A formal letter template for requesting repairs to your unit. Document maintenance issues and request action.",
    downloadLabel: "Download Template",
  },
  {
    icon: FileText,
    title: "Formal Grievance Letter",
    description: "Template for filing a formal grievance with property management about ongoing issues or policy violations.",
    downloadLabel: "Download Template",
  },
  {
    icon: AlertTriangle,
    title: "Cease Harassment Notice",
    description: "A notice template to formally request an end to harassment or intimidation from management or neighbors.",
    downloadLabel: "Download Template",
  },
  {
    icon: Accessibility,
    title: "Reasonable Accommodation Request",
    description: "Template for requesting reasonable accommodations under the Fair Housing Act for disabilities or medical conditions.",
    downloadLabel: "Download Template",
  },
];

const legalAidOrgs = [
  {
    name: "Legal Aid Foundation",
    description: "Free legal services for low-income individuals facing housing issues.",
    link: "#",
  },
  {
    name: "Tenant Rights Hotline",
    description: "Call for immediate guidance on tenant rights and housing concerns.",
    link: "#",
  },
  {
    name: "Fair Housing Council",
    description: "Resources and support for fair housing discrimination cases.",
    link: "#",
  },
  {
    name: "Housing Rights Center",
    description: "Advocacy and legal support for tenant housing rights.",
    link: "#",
  },
];

export default function Resources() {
  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-navy text-primary-foreground py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Know Your Rights.{" "}
              <span className="text-accent">Protect Your Home.</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80">
              Access templates, guides, and resources to help you navigate housing challenges confidently.
            </p>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Document Templates
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Professional letter templates to help you communicate formally with property management.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {templates.map((template) => (
              <Card key={template.title} className="border-border shadow-elegant">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <template.icon className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{template.title}</CardTitle>
                      <CardDescription className="mt-2">
                        {template.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2" disabled>
                      <Download className="h-4 w-4" />
                      PDF
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2" disabled>
                      <Download className="h-4 w-4" />
                      DOCX
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Templates coming soon
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Aid Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Legal Aid Organizations
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              If you need legal assistance, these organizations may be able to help.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {legalAidOrgs.map((org) => (
              <Card key={org.name} className="border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    {org.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{org.description}</p>
                  <Button variant="ghost" size="sm" className="gap-2 text-accent hover:text-accent" disabled>
                    <ExternalLink className="h-4 w-4" />
                    Visit Website
                  </Button>
                  <p className="text-xs text-muted-foreground mt-1">
                    Links coming soon
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Important Note */}
      <section className="py-12 bg-background">
        <div className="container">
          <div className="max-w-2xl mx-auto bg-primary/5 border border-primary/10 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Remember
            </h3>
            <p className="text-sm text-muted-foreground">
              These templates are for informational purposes only and do not constitute legal advice. For specific legal guidance, please consult with a licensed attorney or contact one of the legal aid organizations listed above.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
