// This file defines TypeScript types and interfaces related to the analysis data structure, ensuring type safety throughout the components.

export interface Metadata {
	id: string;
	timestamp: string;
	version: string;
}

export interface MarketAnalysis {
	marketFit: string;
	potentialScore: number;
}

export interface Complexity {
	implementation: number;
	technical: number;
}

export interface Feature {
	id: string;
	name: string;
	description: string;
	priority: string;
	status: string;
	complexity: number;
	estimatedDevelopmentTime: string;
}

export interface Technology {
	infrastructure: Record<string, string[]>;
	stack: Record<string, string[]>;
}

export interface Competitor {
	id: string;
	name: string;
	description: string;
	metrics: {
		userBase: number;
	};
	features: string[];
}

export interface MarketOpportunities {
	[key: string]: string[];
}

export interface BusinessModel {
	revenue: {
		streams: {
			type: string;
			description: string;
			potential: number;
		}[];
	};
	metrics: Record<string, number>;
}

export interface AnalysisData {
	metadata: Metadata;
	overview: {
		marketAnalysis: MarketAnalysis;
		complexity: Complexity;
	};
	features: {
		core: Feature[];
	};
	technology: Technology;
	marketAnalysis: {
		competitors: Competitor[];
		opportunities: MarketOpportunities;
	};
	businessModel: BusinessModel;
}


