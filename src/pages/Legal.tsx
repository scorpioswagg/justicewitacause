import { Layout } from "@/components/layout/Layout";
import { Separator } from "@/components/ui/separator";

export default function Legal() {
  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-navy text-primary-foreground py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Legal & Privacy
            </h1>
            <p className="text-primary-foreground/80">
              Important information about using Justice With a Cause.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-lg">
            
            {/* Disclaimer */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Not a Law Firm
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Justice With a Cause is an independent tenant support and documentation platform. <strong className="text-foreground">We are not a law firm and do not provide legal advice.</strong> The information provided on this platform is for general informational purposes only and should not be construed as legal advice.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Submitting a report or using any feature on this platform <strong className="text-foreground">does not create an attorney-client relationship</strong>. If you need legal advice, please consult with a licensed attorney in your jurisdiction.
              </p>
            </div>

            <Separator className="my-8" />

            {/* Truthfulness */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Truthfulness Statement
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                By submitting a report through Justice With a Cause, you affirm that the information you provide is <strong className="text-foreground">accurate and truthful to the best of your knowledge</strong>. False or misleading reports harm the community and may have legal consequences.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                We rely on the integrity of our users to maintain a trustworthy platform that genuinely helps residents document and address housing concerns.
              </p>
            </div>

            <Separator className="my-8" />

            {/* Privacy Policy */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Privacy Policy
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Your privacy is important to us. Here's how we handle your information:
              </p>
              <ul className="mt-4 space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  <span><strong className="text-foreground">We do not sell your information.</strong> Your personal data is never sold to third parties.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  <span><strong className="text-foreground">Limited use.</strong> We use your information only to review your submission and support tenant documentation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  <span><strong className="text-foreground">Secure storage.</strong> Your data is stored securely and access is limited to authorized personnel.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  <span><strong className="text-foreground">Anonymous options.</strong> You may choose not to provide your name when submitting reports or posting in the community.</span>
                </li>
              </ul>
            </div>

            <Separator className="my-8" />

            {/* Community Guidelines */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Community Acceptable-Use Rules
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To maintain a safe and supportive environment, all users must follow these guidelines:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">1.</span>
                  <span><strong className="text-foreground">Be respectful.</strong> Treat all community members with dignity. Harassment, bullying, or personal attacks are not tolerated.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">2.</span>
                  <span><strong className="text-foreground">Be truthful.</strong> Share accurate information. Do not post false or misleading content.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">3.</span>
                  <span><strong className="text-foreground">Stay on topic.</strong> Keep discussions relevant to housing issues and tenant support.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">4.</span>
                  <span><strong className="text-foreground">Protect privacy.</strong> Do not share others' personal information without consent.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">5.</span>
                  <span><strong className="text-foreground">No illegal content.</strong> Do not post content that is illegal, harmful, or violates any laws.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">6.</span>
                  <span><strong className="text-foreground">Report concerns.</strong> Use the report feature for content that violates these rules.</span>
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Violations may result in content removal or account suspension at our discretion.
              </p>
            </div>

            <Separator className="my-8" />

            {/* Contact */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Questions?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions about these policies, please reach out through our platform or contact us directly. We're here to help.
              </p>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}
