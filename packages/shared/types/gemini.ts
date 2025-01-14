import { features } from "process";
import { start } from "repl";

export interface IdeaAnalysis {
	metadata: {
		id: string;
		title: string;
		timestamp: string;
		version: string;
	};

	overview: {
		marketAnalysis: {
			marketFit: string;
			potentialScore: number;
			timeToMarket: string;
		};
		complexity: {
			implementation: number;
			technical: number;
			resourceRequirements: string;
		};
		competition: {
			landscapeDescription: string;
			competitionLevel: "low" | "moderate" | "high";
		};
		viabilityScore: number;
	};

	features: {
		core: Array<{
			id: string;
			name: string;
			description: string;
			priority: "must-have" | "should-have" | "nice-to-have";
			complexity: number;
			status: "planned" | "in-development" | "completed";
			estimatedDevelopmentTime: string;
		}>;
	};

	technology: {
		infrastructure: {
			recommended: Array<string>;
			alternatives: Array<string>;
			selfHosted: Array<string>;
		};
		stack: {
			frontend: Array<string>;
			backend: Array<string>;
			database: Array<string>;
			services: Array<string>;
		};
		requirements: {
			hosting: string;
			storage: string;
			computing: string;
			scaling: string;
		};
	};

	marketAnalysis: {
		competitors: Array<{
			id: string;
			name: string;
			description: string;
			website: string;
			metrics: {
				userBase: string;
				marketShare?: number;
				pricing?: {
					min: number;
					max: number;
					currency: string;
				};
			};
			features: Array<string>;
			strengths: Array<string>;
			weaknesses: Array<string>;
		}>;
		opportunities: {
			gaps: Array<string>;
			innovations: Array<string>;
			trends: Array<string>;
		};
		risks: Array<{
			description: string;
			impact: "low" | "medium" | "high";
			likelihood: "low" | "medium" | "high";
			mitigation: string;
		}>;
	};

	businessModel: {
		revenue: {
			streams: Array<{
				type: string;
				description: string;
				potential: number;
			}>;
			pricing: {
				model: string;
				tiers: Array<{
					name: string;
					price: number;
					features: Array<string>;
				}>;
			};
		};
		costs: {
			fixed: Array<{
				category: string;
				description: string;
				estimatedCost: number;
			}>;
			variable: Array<{
				category: string;
				description: string;
				unitCost: number;
			}>;
		};
	};
}
export interface ScheduleCalander {
	category: string;
	start_date: Date;
	end_date: Date;
	tasks: Array<{
		id: string;
		title: string;
		completed: boolean;
		priority: "low" | "medium" | "high";
	}>;
}

export interface IdeaInput {
	value: string;
	model: string;
	type: "personal" | "buissness";
}

export const MainResponse = [
	{
		idea:{
			title: "AI Writer",
			desc:"AI writer is a tool that helps you write content faster and more efficiently. It uses artificial intelligence to generate text based on your input, saving you time and effort.",
		},
		analysis: {
			feasibility: {
				score: 85,
				overview: "Technical implementation capability using current resources",
				description:
					"Evaluates whether the idea can be built with existing technologies, skills, and resources within reasonable constraints.",
				considerations: [
					"Technical complexity",
					"Resource availability",
					"Implementation timeline",
				],
			},
			marketFit: {
				score: 92,
				overview: "Problem-solution alignment with market needs",
				description:
					"Measures how well the idea addresses a significant market need or pain point.",
				considerations: [
					"Target market size",
					"Problem urgency",
					"Solution effectiveness",
				],
			},
			scalability: {
				score: 78,
				overview: "Growth potential and adaptation capability",
				description:
					"Assesses the ability to handle increased demand and market expansion.",
				considerations: [
					"Technical architecture",
					"Operational efficiency",
					"Resource requirements",
				],
			},
			differentiation: {
				score: 88,
				overview: "Unique value proposition versus competitors",
				description:
					"Evaluates distinctive features and competitive advantages.",
				considerations: [
					"Competitor analysis",
					"Unique features",
					"Market positioning",
				],
			},
			roiPotential: {
				score: 82,
				overview: "Financial and strategic return prospects",
				description:
					"Projects potential returns on investment and strategic value.",
				considerations: [
					"Revenue potential",
					"Cost structure",
					"Strategic benefits",
				],
			},
		},

		schedule: {
			core: {
				start_date: new Date("2022-01-01"),
				end_date: new Date("2022-06-30"),
				tasks:[
					{
						id: "1",
						title: "Market Research",
						desc: "Conduct market research to identify target audience and competitors.",
						completed: true,
						priority: "high",
					},
					{
						id: "2",
						title: "Competitor Analysis",
						desc: "Conduct market research to identify target audience and competitors.",
						completed: true,
						priority: "medium",
					},
				
				]//atleast
			},//core fratures implementation
			features: {},//,mvp development 

			database: {},
			server: {},
			services: {},
			ui: {},
			optimisation: {},
			deployment: {},
		},
	},
];
