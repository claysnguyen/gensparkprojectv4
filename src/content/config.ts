import { defineCollection, z } from 'astro:content';

const brokers = defineCollection({
  type: 'data',
  schema: z.object({
    rank: z.number(),
    name: z.string(),
    slug: z.string(),
    websiteUrl: z.string().url().optional().or(z.string()),
    logoUrl: z.string().optional(),
    rating: z.number().min(0).max(5),
    established: z.number().min(1900).max(2025),
    headquarters: z.string(),
    description: z.string().optional(),
    pros: z.array(z.string()).optional(),
    cons: z.array(z.string()).optional(),
    platforms: z.array(z.string()).optional(),
    scores: z.object({
      regulationTrust: z.number().min(0).max(10).optional(),
      fees: z.number().min(0).max(10).optional(),
      platformTools: z.number().min(0).max(10).optional(),
      depositWithdrawal: z.number().min(0).max(10).optional(),
      customerSupport: z.number().min(0).max(10).optional(),
      researchEducation: z.number().min(0).max(10).optional(),
    }).optional(),
    userReviewsCount: z.number().optional(),
    spreads: z.array(z.object({
      currencyPair: z.string(),
      spreadFrom: z.number(),
      spreadAvg: z.number(),
      accountType: z.string(),
    })).optional(),
    regulations: z.array(z.object({
      name: z.string(),
      jurisdiction: z.string(),
      licenseNumber: z.string().optional(),
    })).optional(),
  }),
});

export const collections = { brokers };
