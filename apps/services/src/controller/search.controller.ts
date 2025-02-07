import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { FeatureController } from "./feature.controller";
import { MarketController } from "./market.controller";
import { OverviewController } from "./overview.controller";
import { ValidateIdeaController } from "./validate.controller";

import { z } from "zod";
import { InfoController } from "./info.controller";
import { ContentfulStatusCode } from "hono/utils/http-status";
import { ValidationError } from "../error";

export const SearchRequestSchema = z.object({
	value: z
		.string()
		.min(10, "Search value must be at least 10 characters")
		.max(1000, "Search value must not exceed 1000 characters"),
	project: z
		.string()
		.min(1, "Project is required")
		.max(100, "Project name too long"),
	model: z.string().min(1, "Model is required"),
	// .refine((val) => ["gpt-4", "gpt-3.5-turbo", "claude"].includes(val), {
	// 	message: "Invalid model specified",
	// }),
});

// Define interfaces for type safety
interface SearchRequest {
	value: string;
	project: string;
	model: string;
}

interface MetaData {
	name: string;
	image: string;
	description: string;
}

interface SearchResponse {
	metadata: MetaData;
	id: number;
	timestamp: Date;
	overview: any;
	market?: any;
	feature?: any;
}

class BusinessError extends Error {
	constructor(
		message: string,
		public statusCode: number = 400
	) {
		super(message);
		this.name = "BusinessError";
	}
}

export async function searchController(c: Context): Promise<Response> {
	
	try {
		const body = await c.req.json();
		const parsed = SearchRequestSchema.safeParse(body);
		console.log(body);
		if (!parsed.success) {
			return c.json(
				{
					success: false,
					message: parsed.error,
				},
				400
			);
		}
		const { value, project, model } = parsed.data;

		// Log request with sensitive data handling
		console.log("Processing search request:", {
			project,
			model,
			valueLength: value.length,
		});

		// Get metadata information
		const metadata = await InfoController(value, c);
		console.log(metadata);
		if (!metadata) {
			throw new BusinessError("Failed to retrieve metadata");
		}

		const validationResult = await ValidateIdeaController(value, c);
		if (!validationResult?.isValid) {
			throw new BusinessError(
				validationResult?.reasoning ?? "Invalid prompt",
				400
			);
		}

		// Parallel processing for better performance
		const [overviewResult, marketResult, featureResult] = await Promise.all([
			OverviewController(value, c).catch((error) => {
				console.error("Overview processing failed:", error);
				return null;
			}),
			MarketController(value, c).catch((error) => {
				console.error("Market processing failed:", error);
				return null;
			}),
			FeatureController(value, c).catch((error) => {
				console.error("Market processing failed:", error);
				return null;
			}),
		]);
		if (!featureResult || !overviewResult || !marketResult) {
			return c.json(
				{
					success: false,
					message: "failed to generate full report",
				},
				400
			);
		}
		// Construct response
		const response: SearchResponse = {
			metadata: {
				name: metadata.name,
				image: metadata.image,
				description: metadata.description,
			},
			id: generateUniqueId(), // Implement this function based on your needs
			timestamp: new Date(),
			overview: overviewResult,
			...(marketResult && { market: marketResult }),
			...(featureResult && { feature: featureResult }),
		};

		return c.json(
			{
				status: "success",
				data: response,
			},
			200
		);
	} catch (error) {
		console.error("Search controller error:", error);

		if (error instanceof BusinessError) {
			return c.json(
				{
					status: "error",
					message: error.message,
				},
				(error.statusCode as ContentfulStatusCode) ??
					(400 as ContentfulStatusCode)
			);
		}

		if (error instanceof HTTPException) {
			return c.json(
				{
					status: "error",
					message: error.message,
				},
				error.status
			);
		}

		// Handle unexpected errors
		return c.json(
			{
				status: "error",
				message: "An unexpected error occurred",
			},
			500
		);
	}
}

// Utility function to generate unique ID
function generateUniqueId(): number {
	return Math.floor(Date.now() / 1000);
}
