export interface IdeaAnalysis {
    metadata: {
        id: string;
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
            competitionLevel: 'low' | 'moderate' | 'high';
        };
        viabilityScore: number;
    };

    features: {
        core: Array<{
            id: string;
            name: string;
            description: string;
            priority: 'must-have' | 'should-have' | 'nice-to-have';
            complexity: number;
            status: 'planned' | 'in-development' | 'completed';
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
            impact: 'low' | 'medium' | 'high';
            likelihood: 'low' | 'medium' | 'high';
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
export interface ScheduleCalander{
    category: string;
    start_date: Date;
    end_date: Date;
    tasks: Array<{
        id: string;
        title: string;
        completed: boolean;
        priority: 'low' | 'medium' | 'high';
    }>
}

export interface IdeaInput {
    value: string;
    model: string;
    type: 'personal'| 'buissness' ;
}