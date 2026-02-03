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
const resourceSections = [
  {
    name: "Legal Aid Foundation",
    description: "Free legal services for low-income individuals facing housing issues.",
    link: "#",
    title: "Tenant Rights & Eviction Help",
    description: "Get guidance on tenant protections, eviction processes, and housing stability resources.",
    resources: [
      {
        name: "National Housing Law Project",
        description: "Legal resources and tenant rights advocacy focused on housing justice.",
        link: "https://www.nhlp.org/",
      },
      {
        name: "LawHelp.org",
        description: "Find free legal aid information, tenant rights guides, and local legal services.",
        link: "https://www.lawhelp.org/",
      },
      {
        name: "National Low Income Housing Coalition",
        description: "Tenant protections, policy updates, and emergency housing assistance resources.",
        link: "https://nlihc.org/",
      },
    ],
  },
  {
    name: "Tenant Rights Hotline",
    description: "Call for immediate guidance on tenant rights and housing concerns.",
    link: "#",
    title: "Housing Conditions & Complaints",
    description: "Report unsafe living conditions and learn how to file official housing complaints.",
    resources: [
      {
        name: "USA.gov Housing Complaints",
        description: "Guidance on reporting poor housing conditions and landlord complaints.",
        link: "https://www.usa.gov/complaints-living-conditions",
      },
      {
        name: "U.S. Department of Housing and Urban Development (HUD)",
        description: "File housing complaints and access federal housing assistance information.",
        link: "https://www.hud.gov/topics/housing_complaints",
      },
      {
        name: "Consumer Financial Protection Bureau (CFPB) Housing Resources",
        description: "Information on housing issues, tenant rights, and complaint submission options.",
        link: "https://www.consumerfinance.gov/consumer-tools/housing/",
      },
    ],
  },
  {
    name: "Fair Housing Council",
    description: "Resources and support for fair housing discrimination cases.",
    link: "#",
    title: "Legal Help",
    description: "Connect with free or low-cost legal services for housing and discrimination cases.",
    resources: [
      {
        name: "Legal Services Corporation",
        description: "Locate federally funded legal aid providers in your area.",
        link: "https://www.lsc.gov/",
      },
      {
        name: "National Legal Aid & Defender Association",
        description: "Directory of legal aid organizations and public defender offices.",
        link: "https://www.nlada.org/",
      },
      {
        name: "American Bar Association Free Legal Answers",
        description: "Ask civil legal questions and receive responses from pro bono attorneys.",
        link: "https://www.americanbar.org/groups/legal_services/flh-home/free-legal-answers/",
      },
    ],
  },
  {
    name: "Housing Rights Center",
    description: "Advocacy and legal support for tenant housing rights.",
    link: "#",
    title: "LGBTQ+ Housing & Legal Support",
    description: "Support and legal resources focused on LGBTQ+ housing rights and protections.",
    resources: [
      {
        name: "Lambda Legal",
        description: "Legal advocacy and assistance for LGBTQ+ individuals facing discrimination.",
        link: "https://www.lambdalegal.org/",
      },
      {
        name: "National Center for Lesbian Rights",
        description: "Legal support and resources for LGBTQ+ communities, including housing issues.",
        link: "https://nclrights.org/",
      },
      {
        name: "Transgender Law Center",
        description: "Legal resources and advocacy for transgender and gender-nonconforming people.",
        link: "https://transgenderlawcenter.org/",
      },
    ],
  },
  {
    title: "Crisis / Immediate Support",
    description: "If you are in immediate danger or need urgent support, reach out right away.",
    resources: [
      {
        name: "988 Suicide & Crisis Lifeline",
        description: "24/7 crisis support for mental health emergencies.",
        link: "https://988lifeline.org/",
      },
      {
        name: "National Domestic Violence Hotline",
        description: "Confidential support, safety planning, and local resources.",
        link: "https://www.thehotline.org/",
      },
      {
        name: "National Runaway Safeline",
        description: "Crisis support and resources for youth and families in crisis.",
        link: "https://www.1800runaway.org/",
      },
    ],
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
@@ -97,77 +182,85 @@ export default function Resources() {
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
      {resourceSections.map((section, index) => (
        <section
          key={section.title}
          className={`py-16 md:py-24 ${index % 2 === 0 ? "bg-muted/30" : "bg-background"}`}
        >
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {section.title}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {section.description}
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {section.resources.map((resource) => (
                <Card key={resource.name} className="border-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      {resource.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="gap-2 text-accent hover:text-accent"
                    >
                      <a href={resource.link} target="_blank" rel="noreferrer">
                        <ExternalLink className="h-4 w-4" />
                        Visit Website
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
        </section>
      ))}

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
