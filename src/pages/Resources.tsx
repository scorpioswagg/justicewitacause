import { Layout } from "@/components/layout/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Download,
  ExternalLink,
  Wrench,
  AlertTriangle,
  Shield,
  Accessibility,
  Scale,
  Home,
  Phone,
  Clock,
  MapPin,
  Heart,
  Users,
  HandHelping,
  Gavel,
  BadgeCheck,
  Building,
  Ban,
  BriefcaseMedical,
  ShieldAlert,
  FileWarning,
  BookOpen,
} from "lucide-react";
import { generateTemplatePdf } from "@/lib/generateTemplatePdf";

// ---------------------------------------------------------------------------
// LETTER TEMPLATES
// ---------------------------------------------------------------------------
const templates = [
  {
    icon: Wrench,
    title: "Repair Request Letter",
    description:
      "A formal letter requesting repairs to your rental unit. Documents maintenance issues and requests timely action from your landlord.",
    body: [
      "[Your Name]",
      "[Your Address]",
      "[City, State, ZIP Code]",
      "[Your Email Address]",
      "[Your Phone Number]",
      "---",
      "[Landlord / Property Manager Name]",
      "[Management Company Name]",
      "[Property Address]",
      "[City, State, ZIP Code]",
      "---",
      "Re: Request for Repairs at [Your Unit / Address]",
      "---",
      "Dear [Landlord / Property Manager Name],",
      "---",
      "I am writing to formally notify you of the following maintenance issue(s) in my rental unit at [Your Address, Unit #]. As my landlord, you are legally obligated to maintain the premises in a habitable condition under state and local housing codes.",
      "---",
      "## Description of Issue(s):",
      "1. [Describe the issue in detail — e.g., \"The kitchen faucet has been leaking continuously since approximately [date], causing water damage to the cabinet below.\"]",
      "2. [Describe additional issues if applicable.]",
      "3. [Describe additional issues if applicable.]",
      "---",
      "## Impact on Habitability:",
      "These conditions affect my ability to use the unit safely and comfortably. [Describe any health or safety concerns — e.g., mold growth, pest infestation, lack of hot water, broken locks, etc.]",
      "---",
      "## Previous Attempts to Resolve:",
      "I previously reported this issue on [date(s)] via [method — phone call, email, maintenance portal, in person]. As of today, the issue has not been resolved.",
      "---",
      "## Requested Action:",
      "I respectfully request that repairs be completed within [14 days / a reasonable timeframe as allowed by your local law]. Please contact me at the number or email above to schedule a time for the repair.",
      "---",
      "If the issue is not resolved within this timeframe, I may exercise my rights under state and local tenant protection laws, which may include contacting the local housing inspection agency, withholding rent as allowed by law, or pursuing other legal remedies.",
      "---",
      "I am retaining a copy of this letter for my records.",
      "---",
      "Sincerely,",
      "[Your Name]",
      "[Date]",
    ],
  },
  {
    icon: FileText,
    title: "Formal Grievance Letter",
    description:
      "Template for filing a formal grievance with property management about ongoing issues, policy violations, or unresolved complaints.",
    body: [
      "[Your Name]",
      "[Your Address]",
      "[City, State, ZIP Code]",
      "[Your Email Address]",
      "[Your Phone Number]",
      "---",
      "[Property Manager / Management Company Name]",
      "[Property Address]",
      "[City, State, ZIP Code]",
      "---",
      "Re: Formal Grievance — [Brief Description of Issue]",
      "---",
      "Dear [Property Manager / Grievance Committee],",
      "---",
      "I am submitting this formal grievance regarding [briefly state the issue — e.g., ongoing noise violations from a neighboring unit, failure to address repeated maintenance requests, unauthorized entry into my unit, etc.].",
      "---",
      "## Background:",
      "I have been a tenant at [Property Address, Unit #] since [move-in date]. During my tenancy, I have experienced the following issue(s):",
      "---",
      "1. [Describe the first incident — include the date, what happened, and how it affected you.]",
      "2. [Describe the second incident if applicable.]",
      "3. [Describe additional incidents if applicable.]",
      "---",
      "## Previous Attempts to Resolve:",
      "I have attempted to resolve this matter through the following actions:",
      "- [Date]: [Describe your action — e.g., spoke with the front desk, submitted a maintenance request, emailed the property manager, etc.]",
      "- [Date]: [Describe follow-up action.]",
      "- [Date]: [Describe any additional follow-up.]",
      "---",
      "Despite these efforts, the issue remains unresolved.",
      "---",
      "## Requested Resolution:",
      "I respectfully request the following action(s):",
      "1. [State what you want — e.g., completion of repairs within 10 days, enforcement of community noise policy, written acknowledgment of the grievance, etc.]",
      "2. [Additional requests if applicable.]",
      "---",
      "I expect a written response within [10–14 business days] acknowledging receipt of this grievance and outlining the steps that will be taken to resolve it. If this matter is not addressed in a timely manner, I may escalate my complaint to the appropriate housing authority or seek legal counsel.",
      "---",
      "I am retaining a copy of this letter and all related documentation for my records.",
      "---",
      "Sincerely,",
      "[Your Name]",
      "[Date]",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Cease Harassment Notice",
    description:
      "A formal notice to request an immediate end to harassment or intimidation from management, staff, or neighbors.",
    body: [
      "[Your Name]",
      "[Your Address]",
      "[City, State, ZIP Code]",
      "[Your Email Address]",
      "[Your Phone Number]",
      "---",
      "[Name of Person / Management Company]",
      "[Their Address]",
      "[City, State, ZIP Code]",
      "---",
      "Re: Demand to Cease Harassment",
      "---",
      "Dear [Name of Person / Property Manager],",
      "---",
      "I am writing to formally demand that you immediately cease and desist all forms of harassment directed at me. Your conduct, as described below, constitutes harassment under applicable state and local laws and violates my rights as a tenant.",
      "---",
      "## Description of Harassing Conduct:",
      "The following incidents have occurred:",
      "---",
      "1. [Date]: [Describe the incident — e.g., \"You entered my unit without providing the legally required 24-hour notice.\"]",
      "2. [Date]: [Describe another incident — e.g., \"You made threatening statements regarding my tenancy when I submitted a maintenance request.\"]",
      "3. [Date]: [Describe additional incidents if applicable.]",
      "---",
      "## Impact:",
      "This ongoing conduct has caused [describe the impact — e.g., significant emotional distress, fear for my safety, disruption to my quiet enjoyment of my home, etc.]. I have documented each of these incidents with [photographs, written records, witness statements, security footage, etc.].",
      "---",
      "## Legal Notice:",
      "Tenant harassment is prohibited under [cite relevant local/state law if known — e.g., your city's tenant protection ordinance, state landlord-tenant statute, or the Fair Housing Act]. I am entitled to the peaceful enjoyment of my home free from intimidation, threats, or retaliatory conduct.",
      "---",
      "## Demand:",
      "I demand that all harassing behavior stop immediately. If the harassment continues, I will take the following actions as permitted by law:",
      "- File a complaint with the local housing authority",
      "- Report the conduct to law enforcement",
      "- Pursue a restraining order or protective order",
      "- Seek legal counsel and file a civil lawsuit for damages",
      "---",
      "This letter serves as formal notice. I am keeping a copy for my records and have shared this letter with [a trusted person / attorney / tenant advocacy organization].",
      "---",
      "Sincerely,",
      "[Your Name]",
      "[Date]",
    ],
  },
  {
    icon: Accessibility,
    title: "Reasonable Accommodation Request",
    description:
      "Template for requesting reasonable accommodations under the Fair Housing Act for disabilities or medical conditions.",
    body: [
      "[Your Name]",
      "[Your Address]",
      "[City, State, ZIP Code]",
      "[Your Email Address]",
      "[Your Phone Number]",
      "---",
      "[Landlord / Property Manager Name]",
      "[Management Company Name]",
      "[Property Address]",
      "[City, State, ZIP Code]",
      "---",
      "Re: Request for Reasonable Accommodation Under the Fair Housing Act",
      "---",
      "Dear [Landlord / Property Manager Name],",
      "---",
      "I am writing to request a reasonable accommodation in accordance with the Fair Housing Act (42 U.S.C. §§ 3601–3619) and applicable state and local fair housing laws. I have a disability that requires a modification to the standard rules, policies, or practices of the property in order for me to have equal opportunity to use and enjoy my dwelling.",
      "---",
      "## My Request:",
      "I am requesting the following accommodation(s):",
      "1. [Describe the accommodation — e.g., \"Permission to keep an emotional support animal in my unit, notwithstanding the property's no-pet policy.\"]",
      "2. [Describe additional accommodations if applicable — e.g., \"Installation of a grab bar in the bathroom.\"]",
      "---",
      "## Reason for Request:",
      "I have a [physical / mental / medical] condition that substantially limits one or more major life activities. The requested accommodation is necessary because [explain the connection — e.g., \"My emotional support animal provides critical therapeutic support for my diagnosed anxiety disorder, which significantly affects my daily functioning.\"].",
      "---",
      "## Supporting Documentation:",
      "I have enclosed / am prepared to provide a letter from my healthcare provider verifying my disability-related need for this accommodation. Please note that under the Fair Housing Act, you may request verification of the disability-related need but may not ask for specific diagnosis details or medical records.",
      "---",
      "## Legal Framework:",
      "Under the Fair Housing Act, housing providers are required to make reasonable accommodations in rules, policies, practices, or services when necessary for a person with a disability to have equal opportunity to use and enjoy their dwelling. Failure to grant a reasonable accommodation without an undue burden or fundamental alteration justification may constitute disability discrimination.",
      "---",
      "I kindly request a written response to this accommodation request within [10–14 business days]. If you have any questions or need additional information, please contact me at the number or email above.",
      "---",
      "Thank you for your prompt attention to this matter.",
      "---",
      "Sincerely,",
      "[Your Name]",
      "[Date]",
    ],
  },
  {
    icon: Ban,
    title: "Illegal Entry Complaint Letter",
    description:
      "Formal complaint when your landlord enters your unit without proper notice or permission, violating your right to privacy.",
    body: [
      "[Your Name]",
      "[Your Address]",
      "[City, State, ZIP Code]",
      "[Your Email Address]",
      "[Your Phone Number]",
      "---",
      "[Landlord / Property Manager Name]",
      "[Management Company Name]",
      "[Property Address]",
      "[City, State, ZIP Code]",
      "---",
      "Re: Unauthorized Entry into My Rental Unit",
      "---",
      "Dear [Landlord / Property Manager Name],",
      "---",
      "I am writing to formally notify you that on [date], my rental unit at [address, unit #] was entered without my consent and without the legally required advance notice.",
      "---",
      "## Details of Unauthorized Entry:",
      "On [date] at approximately [time], [describe what happened — e.g., \"I returned home to find evidence that someone had entered my unit. Maintenance tools were left on the counter, and furniture had been moved.\" or \"I was home when you/your staff entered without knocking or providing advance notice.\"]",
      "---",
      "## Legal Requirements:",
      "Under [state] law, landlords are generally required to provide at least [24/48 hours — check your state] written notice before entering a tenant's unit, except in cases of emergency. The entry described above does not qualify as an emergency and was conducted without proper notice.",
      "---",
      "## Demand:",
      "I demand that all future entries into my unit comply with applicable laws. Specifically:",
      "1. Provide written notice at least [24/48 hours] in advance",
      "2. State the purpose of the entry",
      "3. Enter only during reasonable hours unless I provide consent otherwise",
      "---",
      "If unauthorized entries continue, I will file a complaint with the local housing authority and may pursue legal remedies, including seeking damages for violation of my privacy rights.",
      "---",
      "Sincerely,",
      "[Your Name]",
      "[Date]",
    ],
  },
  {
    icon: Scale,
    title: "Rent Increase Dispute Letter",
    description:
      "Template to challenge an unlawful or excessive rent increase that may violate local rent control or lease terms.",
    body: [
      "[Your Name]",
      "[Your Address]",
      "[City, State, ZIP Code]",
      "[Your Email Address]",
      "[Your Phone Number]",
      "---",
      "[Landlord / Property Manager Name]",
      "[Management Company Name]",
      "[Property Address]",
      "[City, State, ZIP Code]",
      "---",
      "Re: Dispute of Rent Increase Notice",
      "---",
      "Dear [Landlord / Property Manager Name],",
      "---",
      "I am writing to formally dispute the rent increase notice I received on [date], which proposes to raise my monthly rent from $[current amount] to $[proposed amount], effective [effective date].",
      "---",
      "## Basis for Dispute:",
      "I believe this rent increase is [select and edit as applicable]:",
      "- In violation of my current lease agreement, which specifies a fixed rent of $[amount] through [lease end date]",
      "- In excess of the allowable increase under [city/county] rent stabilization ordinance, which limits annual increases to [percentage]%",
      "- Not accompanied by the required [30/60/90-day] written notice as mandated by [state] law",
      "- Retaliatory in nature, as it was issued shortly after I [filed a complaint / requested repairs / exercised a legal right]",
      "---",
      "## Supporting Information:",
      "[Provide any relevant details — e.g., your lease terms, local rent control ordinance provisions, the timeline of any complaints you've filed, comparable rents in the area, etc.]",
      "---",
      "## Requested Action:",
      "I request that you:",
      "1. Withdraw the proposed rent increase, OR",
      "2. Provide a written explanation of the legal basis for the increase, including compliance with all applicable rent control laws and notice requirements",
      "---",
      "If this matter is not resolved within [14 days], I intend to file a complaint with [local rent board / housing authority] and seek legal assistance.",
      "---",
      "Sincerely,",
      "[Your Name]",
      "[Date]",
    ],
  },
  {
    icon: ShieldAlert,
    title: "Security Deposit Return Demand",
    description:
      "Formal demand letter to recover a security deposit that has not been returned within the legally required timeframe.",
    body: [
      "[Your Name]",
      "[Your Current Address]",
      "[City, State, ZIP Code]",
      "[Your Email Address]",
      "[Your Phone Number]",
      "---",
      "[Former Landlord / Property Manager Name]",
      "[Management Company Name]",
      "[Property Address]",
      "[City, State, ZIP Code]",
      "---",
      "Re: Demand for Return of Security Deposit",
      "---",
      "Dear [Former Landlord / Property Manager Name],",
      "---",
      "I am writing to formally demand the return of my security deposit in the amount of $[deposit amount], which I paid upon moving into [property address, unit #] on [move-in date].",
      "---",
      "## Tenancy Details:",
      "- Move-in date: [date]",
      "- Move-out date: [date]",
      "- Security deposit paid: $[amount]",
      "- Forwarding address provided on: [date]",
      "---",
      "## Legal Requirements:",
      "Under [state] law, landlords are required to return the security deposit (minus any lawful deductions with an itemized statement) within [14/21/30 days — check your state] after the tenant vacates the unit. As of today, [number] days have passed since my move-out date, and I have not received my deposit or an itemized statement of deductions.",
      "---",
      "## Condition of Unit:",
      "I left the unit in [clean and good condition / the same condition as move-in, minus normal wear and tear]. I have photographs and a move-out checklist documenting the condition of the unit at the time of departure.",
      "---",
      "## Demand:",
      "I demand the full return of my $[amount] security deposit within [7–10 days] of receipt of this letter. If I do not receive the deposit or an itemized statement of deductions within this timeframe, I will pursue legal action, which may include filing a claim in small claims court. In many states, landlords who wrongfully withhold deposits may be liable for penalties of up to [2–3x] the deposit amount.",
      "---",
      "Sincerely,",
      "[Your Name]",
      "[Date]",
    ],
  },
  {
    icon: FileWarning,
    title: "Retaliation Complaint Letter",
    description:
      "Template to address retaliatory actions by your landlord after you exercised your legal rights as a tenant.",
    body: [
      "[Your Name]",
      "[Your Address]",
      "[City, State, ZIP Code]",
      "[Your Email Address]",
      "[Your Phone Number]",
      "---",
      "[Landlord / Property Manager Name]",
      "[Management Company Name]",
      "[Property Address]",
      "[City, State, ZIP Code]",
      "---",
      "Re: Notice of Retaliatory Conduct",
      "---",
      "Dear [Landlord / Property Manager Name],",
      "---",
      "I am writing to formally notify you that I believe your recent actions constitute illegal retaliation against me for exercising my lawful rights as a tenant.",
      "---",
      "## Protected Activity:",
      "On [date], I [describe the protected activity — e.g., filed a complaint with the housing authority about unsafe conditions, requested repairs, joined a tenant association, reported a code violation, etc.].",
      "---",
      "## Retaliatory Action(s):",
      "Following my protected activity, you took the following adverse action(s):",
      "1. [Date]: [Describe — e.g., served an eviction notice, issued a rent increase, reduced services, threatened me, etc.]",
      "2. [Date]: [Describe additional actions if applicable.]",
      "---",
      "## Legal Protections:",
      "Under [state] law and the [applicable local tenant protection ordinance], landlords are prohibited from retaliating against tenants who exercise their legal rights. Retaliatory actions may include eviction, rent increases, service reductions, or harassment that occur within [6–12 months — check your state] of a protected activity.",
      "---",
      "## Demand:",
      "I demand that you:",
      "1. Immediately cease all retaliatory conduct",
      "2. Rescind [the eviction notice / rent increase / other retaliatory action]",
      "3. Restore [any services that were reduced or eliminated]",
      "---",
      "If this matter is not resolved within [14 days], I will file a complaint with [the local housing authority / tenant protection agency] and may pursue legal action, including seeking damages for illegal retaliation.",
      "---",
      "I am retaining a copy of this letter and all supporting documentation.",
      "---",
      "Sincerely,",
      "[Your Name]",
      "[Date]",
    ],
  },
  {
    icon: Gavel,
    title: "Eviction Defense Response Letter",
    description:
      "Template to formally respond to an eviction notice, asserting your rights and providing defenses.",
    body: [
      "[Your Name]",
      "[Your Address]",
      "[City, State, ZIP Code]",
      "[Your Email Address]",
      "[Your Phone Number]",
      "---",
      "[Landlord / Property Manager Name]",
      "[Management Company Name]",
      "[Property Address]",
      "[City, State, ZIP Code]",
      "---",
      "Re: Response to Eviction Notice Dated [date]",
      "---",
      "Dear [Landlord / Property Manager Name],",
      "---",
      "I am writing in response to the eviction notice (also called a notice to quit or notice to vacate) that I received on [date]. I dispute the validity of this notice and wish to assert my rights under applicable law.",
      "---",
      "## Defenses and Objections:",
      "I believe this eviction notice is improper for the following reason(s):",
      "---",
      "1. [Select and describe applicable defenses:]",
      "- The notice does not comply with [state] law notice requirements (incorrect notice period, missing information, improper service)",
      "- The stated grounds for eviction are factually inaccurate: [explain]",
      "- The eviction is retaliatory — it was issued after I [exercised a protected right, such as requesting repairs or filing a complaint]",
      "- The eviction is discriminatory — based on my [race, color, religion, sex, national origin, familial status, disability, sexual orientation, gender identity, or other protected class]",
      "- I have cured the alleged lease violation as of [date]",
      "- My rent is current; I have receipts/proof of payment for all amounts due",
      "---",
      "## Requested Action:",
      "I request that you withdraw this eviction notice. I am prepared to discuss this matter and resolve any legitimate concerns. If you proceed with an unlawful eviction, I will seek legal counsel and assert all available defenses in court.",
      "---",
      "## Important Notice:",
      "Please be advised that I am aware of my rights as a tenant and will take all necessary steps to protect them. This may include contacting the local tenant protection agency, requesting a court hearing, and seeking representation from a legal aid organization.",
      "---",
      "Sincerely,",
      "[Your Name]",
      "[Date]",
    ],
  },
  {
    icon: Building,
    title: "Habitability Complaint to Housing Authority",
    description:
      "Template for filing a formal complaint with your local housing authority about conditions that violate health and safety codes.",
    body: [
      "[Your Name]",
      "[Your Address]",
      "[City, State, ZIP Code]",
      "[Your Email Address]",
      "[Your Phone Number]",
      "---",
      "[Local Housing Authority / Code Enforcement Agency Name]",
      "[Agency Address]",
      "[City, State, ZIP Code]",
      "---",
      "Re: Formal Complaint — Uninhabitable Conditions at [Your Address]",
      "---",
      "Dear Housing Authority / Code Enforcement Officer,",
      "---",
      "I am writing to file a formal complaint regarding unsafe and uninhabitable conditions at my rental unit located at [full address, unit #]. My landlord, [landlord/management company name], has failed to address these conditions despite repeated requests.",
      "---",
      "## Conditions Requiring Inspection:",
      "The following health and safety violations exist in my unit:",
      "---",
      "1. [Describe condition — e.g., \"Persistent water leak in the ceiling of the bedroom, causing visible mold growth.\"]",
      "2. [Describe condition — e.g., \"No functioning heat in the unit during winter months.\"]",
      "3. [Describe condition — e.g., \"Cockroach and rodent infestation throughout the kitchen and bathroom.\"]",
      "4. [Describe additional conditions as applicable.]",
      "---",
      "## Timeline of Requests to Landlord:",
      "I have notified my landlord of these conditions multiple times:",
      "- [Date]: [Method — written letter, email, phone call, maintenance portal]",
      "- [Date]: [Follow-up communication]",
      "- [Date]: [Additional follow-up]",
      "---",
      "Copies of these communications are attached / available upon request.",
      "---",
      "## Request:",
      "I am requesting that your office:",
      "1. Conduct an inspection of my unit at the earliest possible date",
      "2. Issue any appropriate citations or violations to the property owner",
      "3. Order corrective action with a compliance deadline",
      "---",
      "I am available for an inspection at [provide availability or say \"any time with reasonable notice\"]. Please contact me at the above number or email to schedule.",
      "---",
      "Thank you for your attention to this urgent matter.",
      "---",
      "Sincerely,",
      "[Your Name]",
      "[Date]",
    ],
  },
  {
    icon: BriefcaseMedical,
    title: "Mold / Environmental Hazard Complaint",
    description:
      "Formal notification about mold, lead paint, asbestos, or other environmental hazards in your unit requiring immediate remediation.",
    body: [
      "[Your Name]",
      "[Your Address]",
      "[City, State, ZIP Code]",
      "[Your Email Address]",
      "[Your Phone Number]",
      "---",
      "[Landlord / Property Manager Name]",
      "[Management Company Name]",
      "[Property Address]",
      "[City, State, ZIP Code]",
      "---",
      "Re: Environmental Hazard — Request for Immediate Remediation",
      "---",
      "Dear [Landlord / Property Manager Name],",
      "---",
      "I am writing to notify you of a serious environmental health hazard in my rental unit at [address, unit #] that requires immediate attention and professional remediation.",
      "---",
      "## Nature of Hazard:",
      "[Select and describe the applicable hazard:]",
      "- MOLD: I have discovered visible mold growth in [location(s) — e.g., bathroom ceiling, bedroom walls, under kitchen sink]. The affected area is approximately [size]. The mold appears to be caused by [water leak, poor ventilation, flooding, etc.].",
      "- LEAD PAINT: [If applicable — the building was constructed before 1978 and I have observed peeling or chipping paint in areas accessible to residents.]",
      "- ASBESTOS: [If applicable — I have observed damaged or deteriorating materials that may contain asbestos in the [location].]",
      "- OTHER: [Describe — e.g., carbon monoxide detector not functioning, sewage backup, contaminated water, etc.]",
      "---",
      "## Health Impact:",
      "Since the appearance of this hazard, I / members of my household have experienced [describe symptoms — e.g., respiratory issues, allergic reactions, headaches, skin irritation, etc.]. I have [sought medical attention / documented these symptoms with my healthcare provider].",
      "---",
      "## Requested Action:",
      "I demand that you:",
      "1. Arrange for a professional inspection and assessment within [5 business days]",
      "2. Hire a licensed and certified remediation company to address the hazard",
      "3. Provide temporary alternative housing if remediation requires vacating the unit",
      "4. Address the underlying cause (water leak, ventilation, etc.) to prevent recurrence",
      "---",
      "Environmental hazards pose serious health risks, and landlords are legally required to maintain rental units free from known hazards. If this matter is not addressed promptly, I will contact the local health department, housing authority, and/or the EPA, and may pursue legal action.",
      "---",
      "Sincerely,",
      "[Your Name]",
      "[Date]",
    ],
  },
  {
    icon: BookOpen,
    title: "Lease Violation Dispute Letter",
    description:
      "Template to dispute an alleged lease violation notice that you believe is unfounded, inaccurate, or retaliatory.",
    body: [
      "[Your Name]",
      "[Your Address]",
      "[City, State, ZIP Code]",
      "[Your Email Address]",
      "[Your Phone Number]",
      "---",
      "[Landlord / Property Manager Name]",
      "[Management Company Name]",
      "[Property Address]",
      "[City, State, ZIP Code]",
      "---",
      "Re: Dispute of Lease Violation Notice Dated [date]",
      "---",
      "Dear [Landlord / Property Manager Name],",
      "---",
      "I received a lease violation notice dated [date] alleging that I violated [section/provision] of my lease agreement. I am writing to formally dispute this notice.",
      "---",
      "## Alleged Violation:",
      "The notice states that I [describe the alleged violation — e.g., had an unauthorized occupant, created excessive noise, had a pet in violation of the no-pet policy, etc.].",
      "---",
      "## My Response:",
      "I dispute this allegation for the following reason(s):",
      "1. [Explain — e.g., \"The individual referenced is a guest who visited for [number] days, which is permitted under Section [X] of my lease, which allows guests for up to [number] days.\"]",
      "2. [Provide additional context or evidence — e.g., \"I have witness statements and security camera footage showing that the alleged noise complaint originated from a different unit.\"]",
      "3. [If retaliatory: \"I believe this notice is retaliatory, as it was issued within [timeframe] of my [protected activity].\"]",
      "---",
      "## Supporting Evidence:",
      "I have the following documentation to support my position:",
      "- [List evidence — e.g., photos, emails, text messages, witness statements, lease provisions, etc.]",
      "---",
      "## Requested Action:",
      "I request that this lease violation notice be withdrawn and removed from my tenant file. If you believe the violation is valid, I request a meeting to discuss the matter and review the evidence before any further action is taken.",
      "---",
      "Sincerely,",
      "[Your Name]",
      "[Date]",
    ],
  },
];

// ---------------------------------------------------------------------------
// RESOURCE SECTIONS (Community Resources & Legal Aid)
// ---------------------------------------------------------------------------
const resourceSections = [
  {
    title: "Tenant Rights & Eviction Help",
    description:
      "Know your rights, get eviction defense guidance, and locate tenant advocacy support.",
    links: [
      {
        name: "LawHelp.org",
        description:
          "Find free legal aid and tenant rights resources by state. Enter your ZIP code to locate nearby attorneys who offer free representation in housing matters.",
        url: "https://www.lawhelp.org/",
        phone: "Varies by local office",
        hours: "Mon–Fri 9:00 AM – 5:00 PM (varies by office)",
        howToGetHelp:
          "Visit the website, enter your ZIP code, and browse available legal aid providers. Most offices accept walk-ins and phone inquiries.",
        whatYouNeed:
          "Your ZIP code, a brief description of your issue, and any relevant documents (lease, notices, correspondence).",
      },
      {
        name: "National Housing Law Project",
        description:
          "National legal advocacy focused on preserving affordable housing and protecting tenants' rights through policy, litigation, and education.",
        url: "https://www.nhlp.org/",
        phone: "(415) 546-7000",
        hours: "Mon–Fri 9:00 AM – 5:00 PM PT",
        howToGetHelp:
          "NHLP primarily assists legal aid attorneys and organizations. Tenants can use their online resources and publications for self-help.",
        whatYouNeed:
          "Browse their resource library for guides on eviction defense, voucher protections, and fair housing.",
      },
      {
        name: "JustFix",
        description:
          "Free tenant tools for repairs, eviction defense, housing records access, and letter-writing to landlords. Available in multiple languages.",
        url: "https://www.justfix.org/",
        phone: "Online tools only",
        hours: "Available 24/7 online",
        howToGetHelp:
          "Create a free account on the website. Use their letter-builder tool to generate repair requests or access your building's violation history.",
        whatYouNeed: "Your address and a description of your housing issue.",
      },
      {
        name: "Tenants Together",
        description:
          "California statewide coalition for tenant rights. Provides a tenant rights hotline, educational workshops, and advocacy campaigns.",
        url: "https://www.tenantstogether.org/",
        phone: "(888) 495-8020",
        hours: "Mon–Fri 9:00 AM – 5:00 PM PT (Hotline hours may vary)",
        howToGetHelp:
          "Call the tenant rights hotline for guidance. Browse their website for know-your-rights guides and local tenant union contacts.",
        whatYouNeed:
          "Your rental address, lease agreement, and any notices or communications from your landlord.",
      },
    ],
  },
  {
    title: "Housing Conditions & Complaints",
    description:
      "Report unsafe conditions, request inspections, and learn about healthy housing standards.",
    links: [
      {
        name: "USA.gov Housing Complaints",
        description:
          "Federal guidance on where and how to file housing complaints. Covers discrimination, unsafe conditions, and landlord-tenant disputes.",
        url: "https://www.usa.gov/housing-complaints",
        phone: "Varies by agency",
        hours: "Information available 24/7 online",
        howToGetHelp:
          "Visit the website to find the correct agency for your complaint type. You'll be directed to HUD, your state attorney general, or local agencies.",
        whatYouNeed:
          "Details of your complaint, your address, landlord information, and any documentation of the issue.",
      },
      {
        name: "National Center for Healthy Housing",
        description:
          "Research and advocacy organization focused on eliminating health hazards in housing. Provides standards, assessments, and policy resources.",
        url: "https://nchh.org/",
        phone: "(443) 539-4160",
        hours: "Mon–Fri 9:00 AM – 5:00 PM ET",
        howToGetHelp:
          "Use their online resources to learn about healthy housing standards. They also offer training for advocates and health professionals.",
        whatYouNeed: "N/A — resources are freely available online.",
      },
      {
        name: "EPA Indoor Air Quality",
        description:
          "EPA guidance on mold, air quality, indoor hazards, and environmental health in residential buildings.",
        url: "https://www.epa.gov/indoor-air-quality-iaq",
        phone: "(800) 438-4318 (IAQ INFO Line)",
        hours: "Mon–Fri 10:00 AM – 4:00 PM ET",
        howToGetHelp:
          "Call the IAQ Info Line or browse the EPA website for guides on mold remediation, radon testing, and indoor pollutant management.",
        whatYouNeed:
          "A description of the issue (mold, odors, ventilation problems). Photos are helpful but not required for phone consultations.",
      },
      {
        name: "CDC Healthy Housing Reference Manual",
        description:
          "Comprehensive health guidance on housing conditions including mold, pests, ventilation, water quality, and structural safety.",
        url: "https://www.cdc.gov/healthy-housing/php/reference-manual/index.html",
        phone: "(800) 232-4636 (CDC Info Line)",
        hours: "Mon–Fri 8:00 AM – 8:00 PM ET",
        howToGetHelp:
          "Browse the reference manual online for detailed guidance on housing-related health hazards. Call CDC Info for general health questions.",
        whatYouNeed: "N/A — resources are freely available online.",
      },
    ],
  },
  {
    title: "Legal Aid Organizations",
    description:
      "Free or low-cost legal services for housing, discrimination, and tenant advocacy. These organizations can provide attorneys, advice, and representation.",
    links: [
      {
        name: "Legal Services Corporation (LSC)",
        description:
          "The nation's largest funder of civil legal aid. LSC-funded programs serve every county in America, providing free legal help to low-income individuals.",
        url: "https://www.lsc.gov/about-lsc/what-legal-aid/get-legal-help",
        phone: "Varies by local office — use website to find yours",
        hours: "Mon–Fri 8:30 AM – 5:30 PM (varies by local office)",
        howToGetHelp:
          "Visit the website and use the 'Get Legal Help' tool to find your nearest LSC-funded legal aid office. Call them to schedule an intake appointment.",
        whatYouNeed:
          "Proof of income (pay stubs, benefits letters), ID, and documents related to your case (lease, notices, correspondence).",
      },
      {
        name: "ABA Free Legal Answers",
        description:
          "Pro bono legal advice online from volunteer attorneys. Ask a housing question and receive a written response from a licensed attorney in your state.",
        url: "https://abafreelegalanswers.org/",
        phone: "Online-only platform",
        hours: "Submit questions 24/7; responses typically within 2–7 business days",
        howToGetHelp:
          "Create a free account, select your state, and post your legal question. A volunteer attorney will provide a written response. Income eligibility required (generally 250% of federal poverty level or below).",
        whatYouNeed:
          "Proof of income eligibility, a clear description of your legal question, and any relevant documents.",
      },
      {
        name: "HUD Fair Housing Complaint",
        description:
          "File a housing discrimination complaint directly with the U.S. Department of Housing and Urban Development. HUD investigates complaints at no cost.",
        url: "https://www.hud.gov/program_offices/fair_housing_equal_opp/online-complaint",
        phone: "(800) 669-9777",
        hours: "Mon–Fri 10:00 AM – 8:00 PM ET; TTY: (800) 877-8339",
        howToGetHelp:
          "Call the hotline or file online. HUD will investigate your complaint for free. You must file within one year of the alleged discrimination.",
        whatYouNeed:
          "Your name and contact info, the name and address of the person/company you're filing against, a description of what happened and when, and how you were discriminated against.",
      },
      {
        name: "Equal Justice Works",
        description:
          "National organization connecting lawyers to communities in need. Funds legal aid fellowships and programs serving low-income populations.",
        url: "https://www.equaljusticeworks.org/",
        phone: "(202) 466-3686",
        hours: "Mon–Fri 9:00 AM – 5:00 PM ET",
        howToGetHelp:
          "Visit the website to find legal aid programs and fellows serving your community. They can connect you with pro bono attorneys.",
        whatYouNeed:
          "Your location, a brief description of your legal issue, and income information.",
      },
      {
        name: "National Legal Aid & Defender Association",
        description:
          "The oldest and largest national membership organization for legal aid and public defense. Provides a directory of legal aid programs nationwide.",
        url: "https://www.nlada.org/",
        phone: "(202) 452-0620",
        hours: "Mon–Fri 9:00 AM – 5:00 PM ET",
        howToGetHelp:
          "Use their website to locate legal aid programs in your area. They maintain a comprehensive directory of civil legal aid providers.",
        whatYouNeed: "Your ZIP code and a description of your legal issue.",
      },
      {
        name: "LegalMatch",
        description:
          "Free service that matches you with local attorneys based on your legal issue. Includes tenant rights, eviction defense, and housing discrimination.",
        url: "https://www.legalmatch.com/",
        phone: "Online matching service",
        hours: "Available 24/7 online",
        howToGetHelp:
          "Submit your case details online. Local attorneys will review and respond if interested. Compare attorney responses and choose the best fit.",
        whatYouNeed:
          "A description of your legal issue, your location, and timeline of events.",
      },
    ],
  },
  {
    title: "LGBTQ+ Housing & Legal Support",
    description:
      "Affirming legal services, discrimination support, and housing advocacy for LGBTQ+ tenants. These organizations specialize in protecting LGBTQ+ rights.",
    links: [
      {
        name: "Lambda Legal",
        description:
          "National legal organization fighting for civil rights of LGBTQ+ people and everyone living with HIV. Provides litigation, education, and policy advocacy.",
        url: "https://lambdalegal.org/",
        phone: "(212) 809-8585 | Help Desk: (866) 542-8336",
        hours: "Mon–Fri 9:00 AM – 5:00 PM ET (Help Desk hours may vary)",
        howToGetHelp:
          "Call the Help Desk or submit an intake form online. Lambda Legal takes impact cases and can refer you to local LGBTQ+ affirming attorneys.",
        whatYouNeed:
          "A description of your situation, documentation of discrimination, and contact information.",
      },
      {
        name: "National Center for Lesbian Rights (NCLR)",
        description:
          "Legal advocacy organization dedicated to advancing rights and safety of LGBTQ+ people through litigation, legislation, policy, and public education.",
        url: "https://www.nclrights.org/",
        phone: "(415) 392-6257 | Legal Helpline: (800) 528-6257",
        hours: "Mon–Fri 9:00 AM – 5:00 PM PT",
        howToGetHelp:
          "Call the legal helpline for free legal advice. They handle cases involving housing discrimination, family law, immigration, and more.",
        whatYouNeed:
          "A summary of your legal issue and any supporting documentation.",
      },
      {
        name: "Transgender Law Center",
        description:
          "Legal organization led by transgender people, providing direct legal services, litigation, and policy advocacy to change law and culture.",
        url: "https://transgenderlawcenter.org/",
        phone: "(510) 587-9696",
        hours: "Mon–Fri 9:00 AM – 5:00 PM PT",
        howToGetHelp:
          "Submit a legal help request through their website. They provide direct legal services and can connect you with local attorneys experienced in trans rights.",
        whatYouNeed:
          "Completed online intake form with details about your situation and any documentation.",
      },
      {
        name: "True Colors United",
        description:
          "Works to end homelessness among LGBTQ+ youth through advocacy, training, education, and collaboration with service providers.",
        url: "https://truecolorsunited.org/",
        phone: "(212) 461-4401",
        hours: "Mon–Fri 9:00 AM – 5:00 PM ET",
        howToGetHelp:
          "Visit the website for resources on LGBTQ+ youth homelessness. They provide training to service providers and advocate for policy changes.",
        whatYouNeed: "N/A — resources and guides are available online.",
      },
      {
        name: "GLBTQ Legal Advocates & Defenders (GLAD)",
        description:
          "New England-based legal rights organization dedicated to ending discrimination based on sexual orientation, gender identity, and HIV status.",
        url: "https://www.glad.org/",
        phone: "(617) 426-1350 | Legal InfoLine: (800) 455-4523",
        hours: "Mon–Fri 1:30 PM – 4:30 PM ET (Legal InfoLine)",
        howToGetHelp:
          "Call the Legal InfoLine for free legal information and referrals. They handle impact litigation and can connect you with affirming attorneys.",
        whatYouNeed:
          "A description of your legal concern. No documentation needed for initial call.",
      },
      {
        name: "National LGBTQ+ Task Force",
        description:
          "Advocates for justice and equality for LGBTQ+ people. Provides policy research, community organizing, and power-building campaigns.",
        url: "https://www.thetaskforce.org/",
        phone: "(202) 393-5177",
        hours: "Mon–Fri 9:00 AM – 5:30 PM ET",
        howToGetHelp:
          "Visit the website for policy reports, community resources, and information about local organizing efforts. They focus on systemic change and can connect you with local LGBTQ+ organizations.",
        whatYouNeed: "N/A — advocacy resources are freely available online.",
      },
      {
        name: "CenterLink (LGBT Community Center Directory)",
        description:
          "Connects you to your nearest LGBTQ+ community center. Centers often provide housing assistance, legal referrals, support groups, and basic needs.",
        url: "https://www.lgbtcenters.org/",
        phone: "(954) 765-6024",
        hours: "Mon–Fri 9:00 AM – 5:00 PM ET",
        howToGetHelp:
          "Use the online directory to find your nearest LGBTQ+ community center. Contact the center directly for local housing, legal, and support services.",
        whatYouNeed: "Your location — the directory will show nearby centers.",
      },
      {
        name: "National Queer Asian Pacific Islander Alliance (NQAPIA)",
        description:
          "Advocacy organization for LGBTQ+ Asian American, South Asian, Southeast Asian, and Pacific Islander communities. Addresses housing insecurity and discrimination.",
        url: "https://www.nqapia.org/",
        phone: "Contact via website",
        hours: "Mon–Fri 9:00 AM – 5:00 PM ET",
        howToGetHelp:
          "Visit the website for community resources, events, and connections to local LGBTQ+ AAPI organizations that provide housing support.",
        whatYouNeed: "N/A — resources are available online.",
      },
    ],
  },
  {
    title: "Fair Housing & Discrimination",
    description:
      "Resources for filing discrimination complaints and understanding fair housing protections based on race, color, religion, sex, national origin, disability, familial status, sexual orientation, and gender identity.",
    links: [
      {
        name: "National Fair Housing Alliance",
        description:
          "The nation's leading fair housing organization. Provides education, advocacy, and enforcement to eliminate housing discrimination.",
        url: "https://nationalfairhousing.org/",
        phone: "(202) 898-1661",
        hours: "Mon–Fri 9:00 AM – 5:00 PM ET",
        howToGetHelp:
          "Visit the website to find a local fair housing organization near you. They can help you file a complaint and understand your rights.",
        whatYouNeed:
          "A description of the discrimination, dates, names of individuals involved, and any supporting evidence.",
      },
      {
        name: "HUD Office of Fair Housing",
        description:
          "Federal agency that enforces fair housing laws. Investigates discrimination complaints based on protected classes at no cost to you.",
        url: "https://www.hud.gov/fairhousing",
        phone: "(800) 669-9777 | TTY: (800) 877-8339",
        hours: "Mon–Fri 10:00 AM – 8:00 PM ET",
        howToGetHelp:
          "Call the hotline or file online. HUD accepts complaints within one year of the alleged discrimination and investigates at no cost.",
        whatYouNeed:
          "Your contact info, the respondent's name and address, a description of the discrimination, and the date(s) it occurred.",
      },
      {
        name: "ACLU",
        description:
          "Defends and preserves individual rights and liberties, including housing rights, through litigation, advocacy, and community empowerment.",
        url: "https://www.aclu.org/",
        phone: "(212) 549-2500",
        hours: "Mon–Fri 9:00 AM – 5:00 PM ET (varies by affiliate)",
        howToGetHelp:
          "Visit the website to find your state ACLU affiliate. Submit a complaint through their online intake form or contact your local office.",
        whatYouNeed:
          "A description of the civil rights violation, your contact information, and any documentation.",
      },
      {
        name: "Disability Rights Advocates",
        description:
          "National nonprofit disability rights legal center. Provides free legal representation in disability discrimination cases, including housing.",
        url: "https://dralegal.org/",
        phone: "(510) 665-8644",
        hours: "Mon–Fri 9:00 AM – 5:00 PM PT",
        howToGetHelp:
          "Contact them through their website or phone to report disability-related housing discrimination. They take impact cases and provide referrals.",
        whatYouNeed:
          "Details about the discrimination, your disability (general description only), and how you were denied housing or accommodations.",
      },
    ],
  },
  {
    title: "Crisis / Immediate Support",
    description:
      "If you or someone you know needs urgent help, use these 24/7 services. These are free, confidential, and available anytime.",
    links: [
      {
        name: "988 Suicide & Crisis Lifeline",
        description:
          "Free, confidential support for people in distress. Call or text 988 anytime, 24/7. Available in English and Spanish with interpreter services for 250+ languages.",
        url: "https://988lifeline.org/",
        phone: "988 (call or text)",
        hours: "24/7/365",
        howToGetHelp:
          "Call or text 988 from any phone. You will be connected to a trained crisis counselor. Chat is also available at 988lifeline.org.",
        whatYouNeed: "Nothing — just call, text, or chat.",
      },
      {
        name: "National Domestic Violence Hotline",
        description:
          "Safety planning, support, and resources for survivors of domestic violence. Confidential and available in 200+ languages.",
        url: "https://www.thehotline.org/",
        phone: "(800) 799-7233 | TTY: (800) 787-3224 | Text START to 88788",
        hours: "24/7/365",
        howToGetHelp:
          "Call the hotline, text START to 88788, or use the online chat at thehotline.org. Advocates provide safety planning, resources, and referrals.",
        whatYouNeed:
          "Nothing — services are free and confidential. You don't need to provide your name.",
      },
      {
        name: "Crisis Text Line",
        description:
          "Free, 24/7 text-based crisis support. Text with a trained volunteer crisis counselor for any type of crisis.",
        url: "https://www.crisistextline.org/",
        phone: "Text HOME to 741741",
        hours: "24/7/365",
        howToGetHelp:
          "Text HOME to 741741 from any phone. You'll be connected to a trained crisis counselor who will help you through your crisis via text.",
        whatYouNeed:
          "A cell phone capable of texting. That's it — services are free and confidential.",
      },
      {
        name: "SAMHSA National Helpline",
        description:
          "Free, confidential information and referrals for substance use disorders and mental health. Available in English and Spanish.",
        url: "https://www.samhsa.gov/find-help/national-helpline",
        phone: "(800) 662-4357",
        hours: "24/7/365",
        howToGetHelp:
          "Call the helpline for treatment referrals, information about mental health and substance use disorders, and local support groups.",
        whatYouNeed:
          "No insurance or ID needed. Services are free and confidential.",
      },
      {
        name: "Trevor Project (LGBTQ+ Youth Crisis)",
        description:
          "Crisis intervention and suicide prevention for LGBTQ+ young people under 25. Provides phone, text, and chat support.",
        url: "https://www.thetrevorproject.org/",
        phone: "(866) 488-7386 | Text START to 678-678",
        hours: "24/7/365",
        howToGetHelp:
          "Call, text START to 678-678, or chat online at TheTrevorProject.org. Trained counselors provide crisis support specifically for LGBTQ+ youth.",
        whatYouNeed:
          "Nothing — free and confidential for anyone under 25.",
      },
      {
        name: "Trans Lifeline",
        description:
          "Peer support hotline run by and for transgender people. Provides direct emotional and financial support to trans people in crisis.",
        url: "https://translifeline.org/",
        phone: "(877) 565-8860 | En Español: (877) 330-6366",
        hours: "Available 24/7 (staffing varies; best coverage evenings/nights)",
        howToGetHelp:
          "Call the hotline to speak with a trans peer support operator. They also offer microgrants for legal name changes and ID updates.",
        whatYouNeed:
          "Nothing — just call. Services are free, confidential, and affirming.",
      },
    ],
  },
  {
    title: "Housing Assistance & Homelessness Prevention",
    description:
      "Emergency rental assistance, shelter services, and programs to help prevent eviction and homelessness.",
    links: [
      {
        name: "211.org",
        description:
          "Dial 2-1-1 or visit 211.org to connect with local social services including housing assistance, food, utilities, and emergency shelter.",
        url: "https://www.211.org/",
        phone: "211 (call or text your ZIP code)",
        hours: "24/7 in most areas",
        howToGetHelp:
          "Call 211 or text your ZIP code to 898211 to be connected with local services. You can also search online at 211.org.",
        whatYouNeed:
          "Your ZIP code and a brief description of what you need help with.",
      },
      {
        name: "National Alliance to End Homelessness",
        description:
          "Provides research, policy solutions, and resources to prevent and end homelessness. Connects individuals with local Continuum of Care programs.",
        url: "https://endhomelessness.org/",
        phone: "(202) 638-1526",
        hours: "Mon–Fri 9:00 AM – 5:00 PM ET",
        howToGetHelp:
          "Visit their website for research reports and to find local homelessness prevention resources in your area.",
        whatYouNeed: "N/A — resources are available online.",
      },
      {
        name: "HUD Rental Assistance",
        description:
          "Information about federal rental assistance programs including Housing Choice Vouchers (Section 8), public housing, and emergency rental assistance.",
        url: "https://www.hud.gov/topics/rental_assistance",
        phone: "(800) 955-2232",
        hours: "Mon–Fri 9:00 AM – 5:00 PM ET",
        howToGetHelp:
          "Visit the website to learn about available programs. Contact your local Public Housing Authority (PHA) to apply for assistance.",
        whatYouNeed:
          "Income documentation, identification, and household information. Eligibility varies by program.",
      },
      {
        name: "National Low Income Housing Coalition",
        description:
          "Advocates for affordable housing policy. Provides data on housing needs, gap analysis reports, and information on rental assistance programs.",
        url: "https://nlihc.org/",
        phone: "(202) 662-1530",
        hours: "Mon–Fri 9:00 AM – 5:00 PM ET",
        howToGetHelp:
          "Browse their website for reports on housing affordability, or use their resource page to find emergency rental assistance programs in your state.",
        whatYouNeed: "N/A — resources and data are available online.",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// COMPONENT
// ---------------------------------------------------------------------------
export default function Resources() {
  const handleDownload = (template: (typeof templates)[number]) => {
    generateTemplatePdf({
      title: template.title,
      body: template.body,
    });
  };

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
              Access templates, guides, and resources to help you navigate
              housing challenges confidently.
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
              Professional letter templates to help you communicate formally
              with landlords, property management, and housing authorities.
              Download as PDF and customize with your details.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {templates.map((template) => (
              <Card key={template.title} className="border-border shadow-elegant flex flex-col">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <template.icon className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        {template.title}
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {template.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="mt-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={() => handleDownload(template)}
                  >
                    <Download className="h-4 w-4" />
                    Download PDF
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Verified Community Resources
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These organizations provide tenant rights guidance, housing
              support, legal aid, LGBTQ+ resources, and crisis services. All
              links have been verified and direct you to official websites.
            </p>
          </div>
          <div className="space-y-14 max-w-6xl mx-auto">
            {resourceSections.map((section) => (
              <div key={section.title} className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {section.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {section.description}
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {section.links.map((link) => (
                    <Card
                      key={link.name}
                      className="border-border shadow-elegant"
                    >
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Shield className="h-5 w-5 text-accent shrink-0" />
                          {link.name}
                        </CardTitle>
                        <CardDescription>{link.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {link.phone && (
                          <div className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Phone className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                            <span>{link.phone}</span>
                          </div>
                        )}
                        {link.hours && (
                          <div className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                            <span>{link.hours}</span>
                          </div>
                        )}
                        {link.howToGetHelp && (
                          <div className="flex items-start gap-2 text-sm text-muted-foreground">
                            <HandHelping className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                            <span>
                              <strong className="text-foreground">How to get help:</strong>{" "}
                              {link.howToGetHelp}
                            </span>
                          </div>
                        )}
                        {link.whatYouNeed && (
                          <div className="flex items-start gap-2 text-sm text-muted-foreground">
                            <BadgeCheck className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                            <span>
                              <strong className="text-foreground">What you need:</strong>{" "}
                              {link.whatYouNeed}
                            </span>
                          </div>
                        )}
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 mt-2"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Visit Site
                        </a>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Note */}
      <section className="py-12 bg-background">
        <div className="container">
          <div className="max-w-2xl mx-auto bg-primary/5 border border-primary/10 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Important Disclaimer
            </h3>
            <p className="text-sm text-muted-foreground">
              These templates and resources are for informational purposes only
              and do not constitute legal advice. For specific legal guidance,
              please consult with a licensed attorney or contact one of the legal
              aid organizations listed above. All external links direct to
              official organization websites and are provided as a public
              service.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
