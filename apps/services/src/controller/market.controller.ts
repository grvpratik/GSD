import { z } from "zod";
import { GoogleGenerativeAI } from "@google/generative-ai";

// === Zod Schemas ===
const CompetitorSchema = z.object({
	name: z.string(),
	description: z.string(),
	url: z.string().url(),
	image: z.string().url(),
	key_features: z.array(z.string()),
	missing_features: z.array(z.string()),
	strengths: z.array(z.string()),
	weaknesses: z.array(z.string()),
	sentiment: z.enum(["positive", "neutral", "negative"]),
});

const AudienceDemographicsSchema = z.object({
	age_range: z.tuple([z.number(), z.number()]),
	gender_ratio: z.object({
		male: z.number(),
		female: z.number(),
		other: z.number(),
	}),
	locations: z.array(z.string()),
	income_levels: z.array(z.string()),
});

const AudienceBehaviorSchema = z.object({
	needs: z.array(z.string()),
	frustrations: z.array(z.string()),
	online_habits: z.array(z.string()),
	preferred_channels: z.array(z.string()),
});

const AudienceSchema = z.object({
	demographics: AudienceDemographicsSchema,
	psychographics: z.object({
		values: z.array(z.string()),
		interests: z.array(z.string()),
	}),
	behavior: AudienceBehaviorSchema,
});

const MarketTrendsSchema = z.object({
	market_size: z.string(),
	growth_rate: z.string(),
	emerging_technologies: z.array(z.string()),
	regulatory_factors: z.array(z.string()),
});

const SocialListeningSchema = z.object({
	reddit: z.object({
		popular_threads: z.array(z.string()),
		common_complaints: z.array(z.string()),
	}),
	google_trends: z.object({
		interest_over_time: z.record(z.number()),
		related_queries: z.array(z.string()),
	}),
});

const MarketSchema = z.object({
	competitors: z.array(CompetitorSchema),
	audience: AudienceSchema,
	pain_points: z.array(z.string()),
	gaps: z.array(z.string()),
	trends: MarketTrendsSchema,
	social_listening: SocialListeningSchema,
});

// === System Instruction ===
const SYSTEM_PROMPT = `
Act as a market analysis expert. Analyze the market for the given idea and generate structured data following these rules:

1. Identify direct and indirect competitors
2. Analyze audience demographics and behavior
3. Highlight market gaps and pain points
4. Include social listening data from Reddit and Google Trends
5. Maintain numeric consistency for percentages and ratios
6. Validate URLs and image links

Return valid JSON matching this schema:
${JSON.stringify(MarketSchema.shape)}
`;

async function MarketController(idea: string, env: any) {
	const genAI = new GoogleGenerativeAI(env.GEMINI_API);
	const model = genAI.getGenerativeModel({
		model: "gemini-pro",
		systemInstruction: SYSTEM_PROMPT,
	});

	// Example conversation history
	const history = [
		{
			role: "user",
			parts: [{ text: "Analyze market for AI-powered meal planning app" }],
		},
		{
			role: "model",
			parts: [
				{
					text: JSON.stringify({
						competitors: [
							{
								name: "Mealime",
								description: "AI-powered meal planner with grocery lists",
								url: "https://mealime.com",
								image: "https://mealime.com/logo.png",
								key_features: ["Recipe suggestions", "Grocery integration"],
								missing_features: ["Nutrition tracking", "Dietician support"],
								strengths: ["User-friendly interface", "Large recipe database"],
								weaknesses: [
									"Limited dietary options",
									"No community features",
								],
								sentiment: "neutral",
							},
						],
						audience: {
							demographics: {
								age_range: [25, 45],
								gender_ratio: { male: 40, female: 55, other: 5 },
								locations: ["Urban areas"],
								income_levels: ["$50k-$100k"],
							},
							psychographics: {
								values: ["Health", "Convenience"],
								interests: ["Nutrition", "Fitness"],
							},
							behavior: {
								needs: ["Time-saving solutions", "Healthy eating"],
								frustrations: ["Meal prep time", "Food waste"],
								online_habits: ["Mobile app usage", "Recipe blogs"],
								preferred_channels: ["Instagram", "Health forums"],
							},
						},
						pain_points: ["Time-consuming meal planning", "Food waste"],
						gaps: ["Personalized nutrition tracking", "Community support"],
						trends: {
							market_size: "$12.4B",
							growth_rate: "8.2% CAGR",
							emerging_technologies: [
								"AI nutritionists",
								"Smart kitchen integration",
							],
							regulatory_factors: [
								"FDA nutrition guidelines",
								"GDPR compliance",
							],
						},
						social_listening: {
							reddit: {
								popular_threads: ["Meal prep tips", "Budget eating"],
								common_complaints: [
									"App subscription costs",
									"Limited recipes",
								],
							},
							google_trends: {
								interest_over_time: { "2023-01": 65, "2023-06": 82 },
								related_queries: ["healthy recipes", "meal planning template"],
							},
						},
					}),
				},
			],
		},
	];

	try {
		const chat = model.startChat({ history });
		const result = await chat.sendMessage(idea);
		const response = await result.response.text();

		// Validate and parse response
		const rawData = JSON.parse(response);
		return MarketSchema.parse(rawData);
	} catch (error) {
		console.error("Market Analysis Error:", error);
		throw new Error("Failed to generate valid market analysis");
	}
}

// Type exports
type Competitors = z.infer<typeof CompetitorSchema>;
type Audience = z.infer<typeof AudienceSchema>;
type Market = z.infer<typeof MarketSchema>;
