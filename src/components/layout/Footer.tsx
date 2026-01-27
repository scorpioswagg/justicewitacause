import { Link } from "react-router-dom";
import { Scale } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container py-8 md:py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 font-semibold text-primary">
              <Scale className="h-5 w-5 text-accent" />
              <span>Justice With a Cause</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              A safe, unified space for residents to document issues, share experiences, and stand together for fair housing.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground">Platform</h4>
              <nav className="flex flex-col gap-2">
                <Link to="/submit" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Submit a Concern
                </Link>
                <Link to="/resources" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Resources
                </Link>
                <Link to="/community" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Community
                </Link>
              </nav>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground">Info</h4>
              <nav className="flex flex-col gap-2">
                <Link to="/about" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  About Us
                </Link>
                <Link to="/legal" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Legal & Privacy
                </Link>
              </nav>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Need Help?</h4>
            <p className="text-sm text-muted-foreground">
              If you're experiencing an emergency, please contact local authorities or emergency services immediately.
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground text-center max-w-3xl mx-auto">
            Justice With a Cause is an independent tenant support and documentation platform. We are not a law firm and do not provide legal advice. Submitting a report does not create an attorney-client relationship. This platform helps residents organize and document housing concerns.
          </p>
          <p className="text-xs text-muted-foreground text-center mt-4">
            © {new Date().getFullYear()} Justice With a Cause. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
