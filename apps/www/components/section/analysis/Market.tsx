import React from "react";

interface technologies {
	database: string;
	server: string;
	frontend: string;
	deployment: string;
	services: string;
}
interface MarketAnalysisProps {
	marketSize: {
		score: number;
		overview: string;
		description: string;
		considerations: string[];
	};
	marketTrends: {
		score: number;
		overview: string;
		description: string;
		considerations: string[];
	};
	targetAudience: {
		score: number;
		overview: string;
		description: string;
		considerations: string[];
	};
	competition: {
		score: number;
		overview: string;
		description: string;
		considerations: string[];
	};
}
interface Competitor {
	competitors: [
		{
			name: string;
			description: string;
			url: string;
			userBase: string;
			uniqueFeatures: string[];
		},
	];
	diff: {
		competitorAdvantages: string[]; // Features competitors do better
		marketGaps: string[]; // Features competitors lack
		innovativeFeatures: string[]; // Suggested new features
	};
}
const MarketAnalysis = () => {
	return <main className="flex flex-col w-full">Market analysis </main>;
};

export default MarketAnalysis;
