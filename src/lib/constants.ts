export const APP = {
  name: "Atna",
  product: "Atna",
  tier: "QA Testing",
} as const;

/** From content metadata document */
export const CURRENT_USER = {
  firstName: "Santhosh",
  lastName: "Kumar",
  email: "kaushikganesh1512@gmail.com",
  mobile: "+91 1309218093",
  role: "QA SuperAdmin",
  displayName: "Santhosh Kumar",
} as const;

export const ORGANIZATION = {
  name: "QA Testing",
  type: "CUSTOMER",
  level: "Central",
  id: 128,
  code: "QAAA1121121",
  country: "India",
  city: "Pandharpur",
  plan: "FREE_TRIAL",
  parentOrganization: "Atna",
  address: "West Coast, Pandharpur - 121221, Maharashtra, India",
  status: "Active",
} as const;

export const PERMISSIONS = {
  fullAccess: ["Case Management", "Customer Management", "Hyre"] as const,
  viewOnly: [
    "User",
    "Role",
    "Rule",
    "Organization",
    "Transaction",
    "Organization Level",
  ] as const,
  noAccess: [
    "DF Docs",
    "Docs",
    "KYB Investigation",
    "KYC Investigation",
    "AML",
    "AML Only",
    "AI Services",
    "Social Behaviour",
    "Digital Footprinting",
    "KYB",
    "KYC",
    "Manual Lookup",
    "Rule Engine",
  ] as const,
} as const;

export const TOP_NAV = [
  { href: "/", label: "Tracker" },
  { href: "/customers", label: "Customer Management" },
  { href: "/hyre/resume-agent", label: "Intelli Hire" },
  { href: "/cases", label: "Case Management" },
  { href: "/workflows", label: "Workflow Builder" },
  { href: "/support", label: "Support" },
] as const;

export const SIDE_NAV = [
  { href: "/", label: "Tracker", icon: "overview" },
  { href: "/customers", label: "Customer Management", icon: "customers" },
  { href: "/hyre/resume-agent", label: "Resume Agent", icon: "hyre" },
  { href: "/hyre/fraud", label: "AI Fraud Detection", icon: "fraud" },
  { href: "/hyre/deepfake", label: "AI Interview Deepfake", icon: "deepfake" },
  { href: "/hyre/documents", label: "Document Tampering", icon: "docs" },
  { href: "/cases", label: "Case Management", icon: "cases" },
  { href: "/workflows", label: "Workflow Builder", icon: "workflows" },
  { href: "/support", label: "Support", icon: "support" },
] as const;
