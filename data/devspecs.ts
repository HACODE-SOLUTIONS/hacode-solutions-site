import { DevSpec } from "@/types";

export const devSpecs: DevSpec[] = [
  {
    id: "1",
    slug: "nextjs-starter",
    name: "Next.js Starter DevSpec",
    description: "Complete setup guide for Next.js App Router with TypeScript, Tailwind, and best practices.",
    longDescription: "A comprehensive DevSpec pack that guides AI coding agents through building modern Next.js applications using App Router, TypeScript, Tailwind CSS, and industry best practices. Includes routing patterns, API routes, server components, and deployment configs.",
    isPaid: false,
    githubUrl: "https://github.com/HACODE-SOLUTIONS/nextjs-starter-devspec",
    features: [
      "Next.js 14 App Router patterns",
      "TypeScript configuration",
      "Tailwind CSS setup",
      "Server & Client Components",
      "API Routes examples",
      "SEO optimization",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "React"],
    diyTime: "2-3 hours",
    whoFor: "AI agents building modern web applications with Next.js",
    fileCount: 8,
    category: "Web Framework",
    popular: true,
  },
  {
    id: "2",
    slug: "stripe-integration",
    name: "Stripe Payment Integration",
    description: "Production-ready Stripe integration with Checkout, webhooks, and subscription management.",
    longDescription: "Everything your AI coding agent needs to implement Stripe payments in Node.js applications. Covers Checkout Sessions, webhook handling, subscription management, and secure payment flows.",
    isPaid: false,
    githubUrl: "https://github.com/HACODE-SOLUTIONS/stripe-integration-devspec",
    features: [
      "Checkout Session setup",
      "Webhook signature verification",
      "Subscription handling",
      "Payment security best practices",
      "Error handling patterns",
    ],
    stack: ["Stripe API", "Node.js", "TypeScript", "Express"],
    diyTime: "3-4 hours",
    whoFor: "AI agents adding payment functionality to applications",
    fileCount: 6,
    category: "Payments",
    popular: true,
  },
  {
    id: "3",
    slug: "auth-patterns",
    name: "Authentication Patterns",
    description: "Modern authentication patterns with NextAuth.js, session management, and security best practices.",
    longDescription: "A DevSpec focused on implementing secure authentication in modern web applications. Covers NextAuth.js setup, OAuth providers, session management, protected routes, and security considerations.",
    isPaid: false,
    githubUrl: "https://github.com/HACODE-SOLUTIONS/auth-patterns-devspec",
    features: [
      "NextAuth.js configuration",
      "Multiple OAuth providers",
      "Session management",
      "Protected API routes",
      "Security best practices",
      "Role-based access control",
    ],
    stack: ["NextAuth.js", "Next.js", "TypeScript", "Prisma"],
    diyTime: "4-5 hours",
    whoFor: "AI agents implementing user authentication and authorization",
    fileCount: 10,
    category: "Authentication",
  },
  {
    id: "4",
    slug: "enterprise-saas-starter",
    name: "Enterprise SaaS Starter Kit",
    description: "Complete production-ready SaaS application with authentication, payments, admin dashboard, multi-tenancy, and more.",
    longDescription: "The ultimate DevSpec pack for building enterprise-grade SaaS applications. Includes complete authentication flows, Stripe subscription billing, admin dashboard, user management, multi-tenancy architecture, email notifications, analytics integration, and comprehensive testing setup. This pack saves weeks of development time and includes battle-tested patterns from production SaaS applications.",
    isPaid: true,
    price: 149,
    stripePriceId: process.env.STRIPE_PRICE_ID_PREMIUM_DEVSPEC || "",
    features: [
      "Complete authentication system with NextAuth.js",
      "Stripe subscription billing with webhooks",
      "Multi-tenant architecture",
      "Admin dashboard with user management",
      "Email notification system",
      "Database schema and migrations",
      "API rate limiting and security",
      "Analytics and metrics tracking",
      "Comprehensive test suite",
      "CI/CD pipeline configuration",
      "Production deployment guides",
      "Monitoring and error tracking setup",
    ],
    stack: [
      "Next.js 14",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Stripe",
      "NextAuth.js",
      "Tailwind CSS",
      "Resend",
    ],
    diyTime: "2-3 weeks",
    whoFor: "AI agents building production-ready SaaS applications from scratch",
    fileCount: 45,
    category: "SaaS Framework",
    popular: true,
  },
];

export function getDevSpecBySlug(slug: string): DevSpec | undefined {
  return devSpecs.find((spec) => spec.slug === slug);
}

export function getFreeDevSpecs(): DevSpec[] {
  return devSpecs.filter((spec) => !spec.isPaid);
}

export function getPaidDevSpecs(): DevSpec[] {
  return devSpecs.filter((spec) => spec.isPaid);
}
