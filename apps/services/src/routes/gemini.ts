import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

export async function geminiEvaluation(c: any) { 
    const { GEMINI_API } = c.env
    console.log(GEMINI_API, "GEMINI_API");
    const body = await c.req.json();
    const { value, agent, model } = body;
    if (!value || !agent || !model) {
        return c.json({ status: 'error', message: 'Invalid input' }, 400);
    }

    console.log(await body, "BODY");










    const genAI = new GoogleGenerativeAI(GEMINI_API);
    const modelAI = genAI.getGenerativeModel({
        model: "gemini-2.0-flash-exp",
    });

    const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
    };


    const chatSession = modelAI.startChat({
        generationConfig,
        history: [
            {
                role: "user",
                parts: [
                    { text: "# Business Idea Analysis Template\n\nProvide a comprehensive analysis of business ideas using the following structure:\n\n## 1. Overview\nAnalyze the idea across key dimensions:\n- Market fit and potential\n- Implementation complexity (Rate 1-10)\n- Technical difficulty (Rate 1-10)\n- Resource requirements\n- Competitive landscape\n- Time to market\n- Overall viability score (Rate 1-10)\n\n## 2. Core Features\nReturn an array of essential features:\n```typescript\n{\n  features: [\n    {\n      name: string,\n      description: string,\n      priority: \"must-have\" | \"should-have\" | \"nice-to-have\",\n      complexity: 1-10,\n      \n    }\n  ]\n}\n```\n\n## 3. Technology Stack\nCategorize technology options for each component:\n\n### Infrastructure\n- Popular solutions (e.g., AWS, GCP)\n- Cost-effective alternatives (e.g., DigitalOcean)\n- Self-hosted options\n\n### Core Technologies\n- Frontend frameworks\n- Backend technologies\n- Databases\n- Additional services (AI, analytics, etc.)\n\n## 4. Market Analysis\nReturn structured data about:\n\n### Existing Solutions\n```typescript\n{\n  competitors: [\n    {\n      name: string,\n      description: string,\n      url: string,\n      userBase: string,\n      uniqueFeatures: string[]\n    }\n  ]\n}\n```\n\n### Feature Analysis\n```typescript\n{\n  competitorAdvantages: string[], // Features competitors do better\n  marketGaps: string[],          // Features competitors lack\n  innovativeFeatures: string[]   // Suggested new features\n}\n```\n\nExample request: \"Analyze an AI-powered social media scheduler that optimizes posting times and generates content suggestions.\"" },
                ],
            },
            {
                role: "model",
                parts: [
                    { text: "```json\n" },
                    { text: "{\n  \"1. Overview\": {\n    \"Market fit and potential\": \"High demand for social media management tools, especially those leveraging AI for optimization and content creation. Potential for a large user base among businesses and influencers.\",\n    \"Implementation complexity\": \"7\",\n    \"Technical difficulty\": \"8\",\n    \"Resource requirements\": \"Requires a team with expertise in AI, software development, and marketing. Significant server and infrastructure costs.\",\n    \"Competitive landscape\": \"Highly competitive, with established players like Buffer, Hootsuite, and Later, as well as emerging AI-focused tools.\",\n    \"Time to market\": \"6-12 months for a basic version with core features.\",\n     \"Overall viability score\": \"7\"\n  },\n  \"2. Core Features\": {\n    \"features\": [\n      {\n        \"name\": \"AI-powered posting time optimization\",\n        \"description\": \"Analyzes user's audience engagement to suggest optimal posting times for maximum reach.\",\n        \"priority\": \"must-have\",\n        \"complexity\": 7\n      },\n       {\n        \"name\": \"AI content generation suggestions\",\n        \"description\": \"Provides AI-based recommendations for text and visual content tailored to the user's brand and audience.\",\n        \"priority\": \"must-have\",\n        \"complexity\": 9\n      },\n      {\n        \"name\": \"Multi-platform scheduling\",\n        \"description\": \"Supports scheduling content across major social media platforms (e.g., Instagram, Facebook, Twitter, LinkedIn).\",\n        \"priority\": \"must-have\",\n         \"complexity\": 6\n      },\n        {\n        \"name\": \"Content calendar\",\n        \"description\": \"Provides a visual calendar interface to schedule and organize posts.\",\n         \"priority\":\"must-have\",\n        \"complexity\": 4\n      },\n      {\n        \"name\": \"Basic analytics dashboard\",\n        \"description\": \"Tracks key metrics, such as engagement and reach, for scheduled and published content.\",\n         \"priority\": \"should-have\",\n        \"complexity\": 5\n      },\n      {\n        \"name\": \"Hashtag recommendations\",\n        \"description\": \"Suggests relevant hashtags based on the content of the posts.\",\n        \"priority\": \"should-have\",\n        \"complexity\": 6\n      },\n      {\n        \"name\": \"Team collaboration features\",\n        \"description\":\"Allows multiple users to collaborate on content creation and scheduling.\",\n         \"priority\": \"nice-to-have\",\n         \"complexity\": 6\n       }\n    ]\n  },\n  \"3. Technology Stack\": {\n    \"Infrastructure\": {\n      \"Popular solutions\": \"AWS, Google Cloud Platform (GCP), Azure\",\n      \"Cost-effective alternatives\": \"DigitalOcean, Linode\",\n       \"Self-hosted options\": \"Kubernetes, Docker\"\n    },\n    \"Core Technologies\": {\n      \"Frontend frameworks\": \"React, Angular, Vue.js\",\n      \"Backend technologies\": \"Node.js, Python (Django/Flask), Ruby on Rails\",\n       \"Databases\": \"PostgreSQL, MongoDB, MySQL\",\n       \"Additional services\": \"OpenAI API, Tensorflow, Google Analytics API, various social media APIs\"\n    }\n  },\n  \"4. Market Analysis\": {\n    \"Existing Solutions\": {\n      \"competitors\": [\n        {\n          \"name\": \"Buffer\",\n          \"description\": \"Social media management platform with scheduling and analytics features.\",\n          \"url\": \"https://buffer.com\",\n           \"userBase\": \"Millions of users\",\n           \"uniqueFeatures\": [\"Multi-platform support\", \"Content calendar\", \"Basic analytics\"]\n        },\n        {\n          \"name\": \"Hootsuite\",\n          \"description\": \"Comprehensive social media management platform for teams.\",\n           \"url\": \"https://hootsuite.com\",\n           \"userBase\": \"Millions of users\",\n           \"uniqueFeatures\": [\"Team collaboration\", \"Advanced analytics\", \"Social listening\"]\n        },\n         {\n          \"name\": \"Later\",\n          \"description\": \"Social media management platform focused on visual content.\",\n          \"url\":\"https://later.com\",\n           \"userBase\": \"Hundreds of thousands of users\",\n          \"uniqueFeatures\": [\"Visual content scheduling\", \"Instagram-focused\", \"Linkin.bio\"]\n        }\n      ]\n    },\n    \"Feature Analysis\": {\n      \"competitorAdvantages\": [\n        \"Established brand recognition\",\n        \"Large user bases\",\n        \"Mature feature sets\",\n        \"Comprehensive analytics\"\n      ],\n      \"marketGaps\": [\n        \"Advanced AI-powered content generation\",\n        \"More accurate optimization of posting times\",\n        \"Better integration with emerging platforms\"\n      ],\n      \"innovativeFeatures\": [\n        \"AI-powered content repurposing\",\n         \"Predictive analytics for content performance\",\n        \"Personalized content recommendations based on user's style\",\n        \"Integration with image and video editing tools\"\n      ]\n    }\n  }\n}" },
                    { text: "\n```" },
                ],
            },
            {
                role: "user",
                parts: [
                    { text: "only return in this typescript schema interface ProductAnalysis {\n  metadata: {\n    id: string;\n    timestamp: string;\n    version: string;\n  };\n\n  overview: {\n    marketAnalysis: {\n      marketFit: string;\n      potentialScore: number;\n      timeToMarket: string;\n    };\n    complexity: {\n      implementation: number;\n      technical: number;\n      resourceRequirements: string;\n    };\n    competition: {\n      landscapeDescription: string;\n      competitionLevel: 'low' | 'moderate' | 'high';\n    };\n    viabilityScore: number;\n  };\n\n  features: {\n    core: Array<{\n      id: string;\n      name: string;\n      description: string;\n      priority: 'must-have' | 'should-have' | 'nice-to-have';\n      complexity: number;\n      status: 'planned' | 'in-development' | 'completed';\n      estimatedDevelopmentTime: string;\n    }>;\n  };\n\n  technology: {\n    infrastructure: {\n      recommended: Array<string>;\n      alternatives: Array<string>;\n      selfHosted: Array<string>;\n    };\n    stack: {\n      frontend: Array<string>;\n      backend: Array<string>;\n      database: Array<string>;\n      services: Array<string>;\n    };\n    requirements: {\n      hosting: string;\n      storage: string;\n      computing: string;\n      scaling: string;\n    };\n  };\n\n  marketAnalysis: {\n    competitors: Array<{\n      id: string;\n      name: string;\n      description: string;\n      website: string;\n      metrics: {\n        userBase: string;\n        marketShare?: number;\n        pricing?: {\n          min: number;\n          max: number;\n          currency: string;\n        };\n      };\n      features: Array<string>;\n      strengths: Array<string>;\n      weaknesses: Array<string>;\n    }>;\n    opportunities: {\n      gaps: Array<string>;\n      innovations: Array<string>;\n      trends: Array<string>;\n    };\n    risks: Array<{\n      description: string;\n      impact: 'low' | 'medium' | 'high';\n      likelihood: 'low' | 'medium' | 'high';\n      mitigation: string;\n    }>;\n  };\n\n  businessModel: {\n    revenue: {\n      streams: Array<{\n        type: string;\n        description: string;\n        potential: number;\n      }>;\n      pricing: {\n        model: string;\n        tiers: Array<{\n          name: string;\n          price: number;\n          features: Array<string>;\n        }>;\n      };\n    };\n    costs: {\n      fixed: Array<{\n        category: string;\n        description: string;\n        estimatedCost: number;\n      }>;\n      variable: Array<{\n        category: string;\n        description: string;\n        unitCost: number;\n      }>;\n    };\n    metrics: {\n      targetCAC: number;\n      targetLTV: number;\n      targetMargin: number;\n    };\n  };\n}\n\n\n" },
                ],
            },
            {
                role: "model",
                parts: [
                    { text: "```json\n" },
                    { text: "{\n  \"metadata\": {\n    \"id\": \"AI-Social-Scheduler-001\",\n    \"timestamp\": \"2023-11-19T14:30:00Z\",\n    \"version\": \"1.0\"\n  },\n  \"overview\": {\n    \"marketAnalysis\": {\n      \"marketFit\": \"High demand for social media management with AI enhancements.\",\n      \"potentialScore\": 8,\n      \"timeToMarket\": \"6-12 months\"\n    },\n    \"complexity\": {\n      \"implementation\": 7,\n      \"technical\": 8,\n      \"resourceRequirements\": \"Expert team in AI, software, and marketing. Significant server costs.\"\n    },\n    \"competition\": {\n      \"landscapeDescription\": \"Highly competitive with established and emerging tools.\",\n      \"competitionLevel\": \"high\"\n    },\n    \"viabilityScore\": 7\n  },\n  \"features\": {\n    \"core\": [\n      {\n        \"id\": \"feature-1\",\n        \"name\": \"AI Posting Optimization\",\n        \"description\": \"Analyzes audience engagement to optimize posting times.\",\n        \"priority\": \"must-have\",\n        \"complexity\": 7,\n        \"status\": \"planned\",\n        \"estimatedDevelopmentTime\": \"3 months\"\n      },\n      {\n        \"id\": \"feature-2\",\n        \"name\": \"AI Content Suggestions\",\n        \"description\": \"Provides AI-generated content recommendations.\",\n        \"priority\": \"must-have\",\n        \"complexity\": 9,\n         \"status\": \"planned\",\n        \"estimatedDevelopmentTime\": \"4 months\"\n      },\n      {\n         \"id\": \"feature-3\",\n        \"name\": \"Multi-Platform Scheduling\",\n        \"description\": \"Schedules content across major social media platforms.\",\n        \"priority\": \"must-have\",\n        \"complexity\": 6,\n         \"status\": \"planned\",\n        \"estimatedDevelopmentTime\": \"2 months\"\n      },\n       {\n        \"id\": \"feature-4\",\n        \"name\": \"Content Calendar\",\n        \"description\": \"Provides a visual calendar interface for scheduled posts\",\n        \"priority\": \"must-have\",\n        \"complexity\": 4,\n         \"status\": \"planned\",\n        \"estimatedDevelopmentTime\":\"1 month\"\n       },\n        {\n        \"id\":\"feature-5\",\n         \"name\": \"Basic Analytics Dashboard\",\n         \"description\":\"Tracks key metrics\",\n        \"priority\": \"should-have\",\n         \"complexity\": 5,\n        \"status\":\"planned\",\n        \"estimatedDevelopmentTime\":\"1.5 months\"\n       },\n       {\n        \"id\":\"feature-6\",\n         \"name\":\"Hashtag Recommendations\",\n         \"description\":\"Suggests relevant hashtags\",\n        \"priority\": \"should-have\",\n         \"complexity\": 6,\n         \"status\":\"planned\",\n         \"estimatedDevelopmentTime\":\"2 months\"\n       },\n       {\n         \"id\":\"feature-7\",\n         \"name\":\"Team Collaboration Features\",\n         \"description\":\"Allows multiple users to collaborate\",\n        \"priority\":\"nice-to-have\",\n        \"complexity\": 6,\n        \"status\":\"planned\",\n        \"estimatedDevelopmentTime\":\"2 months\"\n      }\n    ]\n  },\n  \"technology\": {\n    \"infrastructure\": {\n      \"recommended\": [\n        \"AWS\",\n        \"GCP\",\n        \"Azure\"\n      ],\n      \"alternatives\": [\n        \"DigitalOcean\",\n        \"Linode\"\n      ],\n      \"selfHosted\": [\n        \"Kubernetes\",\n        \"Docker\"\n      ]\n    },\n    \"stack\": {\n      \"frontend\": [\n        \"React\",\n        \"Angular\",\n        \"Vue.js\"\n      ],\n      \"backend\": [\n        \"Node.js\",\n        \"Python (Django/Flask)\",\n        \"Ruby on Rails\"\n      ],\n      \"database\": [\n        \"PostgreSQL\",\n        \"MongoDB\",\n        \"MySQL\"\n      ],\n      \"services\": [\n        \"OpenAI API\",\n        \"Tensorflow\",\n        \"Google Analytics API\",\n         \"Social media APIs\"\n      ]\n    },\n    \"requirements\": {\n      \"hosting\": \"Cloud hosting with scalability\",\n      \"storage\": \"Object storage for media assets and database\",\n      \"computing\": \"Sufficient CPU and memory for AI processing\",\n      \"scaling\": \"Horizontal scaling to manage load\"\n    }\n  },\n  \"marketAnalysis\": {\n    \"competitors\": [\n      {\n         \"id\":\"competitor-1\",\n        \"name\": \"Buffer\",\n        \"description\": \"Social media management platform with scheduling features.\",\n        \"website\": \"https://buffer.com\",\n        \"metrics\": {\n          \"userBase\": \"Millions\",\n          \"pricing\": {\n            \"min\": 0,\n            \"max\": 100,\n            \"currency\": \"USD\"\n          }\n        },\n        \"features\": [\n          \"Multi-platform\",\n          \"Content calendar\",\n          \"Basic analytics\"\n        ],\n        \"strengths\": [\n          \"Established brand\",\n          \"User-friendly\",\n          \"Reliable\"\n        ],\n          \"weaknesses\": [\n            \"Less AI focus\",\n            \"Basic analytics\",\n            \"Can be expensive for large teams\"\n          ]\n      },\n      {\n        \"id\":\"competitor-2\",\n        \"name\": \"Hootsuite\",\n        \"description\": \"Comprehensive social media management platform.\",\n        \"website\": \"https://hootsuite.com\",\n        \"metrics\": {\n          \"userBase\": \"Millions\",\n             \"pricing\": {\n            \"min\": 49,\n            \"max\": 700,\n            \"currency\": \"USD\"\n          }\n        },\n         \"features\": [\n          \"Team collaboration\",\n          \"Advanced analytics\",\n          \"Social listening\"\n        ],\n        \"strengths\": [\n          \"Feature-rich\",\n          \"Team management\",\n          \"Analytics depth\"\n        ],\n        \"weaknesses\": [\n           \"Can be complex\",\n          \"Expensive\",\n          \"User interface can be clunky\"\n        ]\n      },\n       {\n         \"id\":\"competitor-3\",\n        \"name\": \"Later\",\n        \"description\": \"Social media platform focused on visual content.\",\n         \"website\": \"https://later.com\",\n        \"metrics\": {\n          \"userBase\": \"Hundreds of thousands\",\n           \"pricing\": {\n            \"min\": 0,\n            \"max\": 50,\n            \"currency\": \"USD\"\n          }\n        },\n          \"features\":[\n             \"Visual content scheduling\",\n             \"Instagram-focused\",\n            \"Linkin.bio\"\n          ],\n         \"strengths\":[\n           \"Instagram focus\",\n           \"User-friendly\",\n           \"Visual content management\"\n          ],\n          \"weaknesses\":[\n            \"Less platform support\",\n            \"Limited AI\",\n             \"Less advanced analytics\"\n          ]\n      }\n    ],\n    \"opportunities\": {\n      \"gaps\": [\n        \"Advanced AI content generation\",\n        \"More accurate posting time optimization\",\n        \"Better integration with emerging platforms\"\n      ],\n      \"innovations\": [\n        \"AI content repurposing\",\n        \"Predictive content performance\",\n        \"Personalized content recommendations\",\n         \"Integration with image/video editing tools\"\n      ],\n       \"trends\": [\n        \"AI-powered marketing\",\n         \"Social media automation\",\n        \"Personalized content experiences\"\n       ]\n    },\n     \"risks\": [\n      {\n        \"description\": \"High competition\",\n        \"impact\": \"high\",\n        \"likelihood\": \"high\",\n         \"mitigation\":\"Differentiate through AI features\"\n      },\n      {\n       \"description\": \"Rapid technology changes\",\n        \"impact\":\"medium\",\n        \"likelihood\":\"medium\",\n         \"mitigation\":\"Adopt flexible architecture\"\n      },\n      {\n         \"description\":\"AI accuracy issues\",\n          \"impact\":\"medium\",\n        \"likelihood\":\"medium\",\n        \"mitigation\":\"Continuous monitoring and improvement\"\n      }\n    ]\n  },\n  \"businessModel\": {\n    \"revenue\": {\n      \"streams\": [\n        {\n          \"type\": \"Subscription\",\n          \"description\": \"Recurring monthly or yearly subscriptions.\",\n          \"potential\": 80\n        },\n         {\n           \"type\":\"Add-ons\",\n           \"description\":\"Premium features or add-ons.\",\n           \"potential\": 20\n         }\n      ],\n      \"pricing\": {\n        \"model\": \"Freemium\",\n        \"tiers\": [\n          {\n            \"name\": \"Basic\",\n            \"price\": 0,\n            \"features\": [\n              \"Limited AI suggestions\",\n              \"Basic scheduling\",\n               \"Limited platform support\"\n            ]\n          },\n          {\n            \"name\": \"Pro\",\n             \"price\": 29,\n            \"features\":[\n             \"Full AI features\",\n               \"Multi-platform\",\n              \"Advanced analytics\"\n            ]\n          },\n           {\n            \"name\":\"Business\",\n            \"price\": 99,\n             \"features\":[\n              \"Team collaboration\",\n              \"Custom reports\",\n              \"Priority support\"\n            ]\n           }\n        ]\n      }\n    },\n    \"costs\": {\n      \"fixed\": [\n        {\n          \"category\": \"Salaries\",\n          \"description\": \"Team compensation\",\n          \"estimatedCost\": 30000\n        },\n        {\n          \"category\": \"Office\",\n          \"description\":\"Rent and utilities\",\n          \"estimatedCost\": 5000\n        },\n         {\n            \"category\":\"Software Licenses\",\n            \"description\":\"Tools and subscriptions\",\n             \"estimatedCost\": 2000\n         }\n      ],\n       \"variable\":[\n         {\n           \"category\":\"Server Costs\",\n           \"description\":\"Cloud server usage\",\n           \"unitCost\": 5\n         },\n          {\n            \"category\":\"Customer Support\",\n             \"description\":\"Per hour\",\n            \"unitCost\": 15\n           },\n           {\n            \"category\": \"Marketing Spend\",\n            \"description\": \"Advertising and promotions\",\n            \"unitCost\": 1000\n           }\n       ]\n    },\n    \"metrics\": {\n      \"targetCAC\": 50,\n      \"targetLTV\": 200,\n      \"targetMargin\": 0.6\n    }\n  }\n}" },
                    { text: "\n```" },
                ],
            },
        ],
    });
    const result = await chatSession.sendMessage(value);
    const textRes = result.response.text();
    const JsonRes = JSON.parse(textRes);


    return c.json(JSON.stringify(JsonRes), {
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'max-age=3600',
            'Access-Control-Allow-Origin': 'http://localhost:5173',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'

        },
    })
    
    
}

export async function projectDetails(c: any) {
    return c.json({
        
        "success": true,
        "evaluation": {
          "name": "AI-powered meme coin analyzer",
          "description": "A web/mobile app that uses AI to analyze social media sentiment, news, and on-chain data to provide insights and risk assessment for meme coins.",
          "overview": {
            "feasibility": {
              "score": 75,
              "overview": "Building an AI-powered meme coin analyzer is feasible, leveraging existing NLP and crypto data APIs. Data availability for meme coins can be fragmented, requiring robust data aggregation strategies.",
              "considerations": [
                "Availability and reliability of real-time meme coin data sources.",
                "Development and training of accurate sentiment analysis models for meme coin specific language.",
                "Scalability of AI models to handle large volumes of social media data.",
                "Infrastructure costs for data processing and storage."
              ]
            },
            "marketFit": {
              "score": 65,
              "overview": "There's a niche market for meme coin analysis, driven by the speculative and community-driven nature of meme coins. However, the market is volatile and highly dependent on trends.",
              "considerations": [
                "High volatility and risk associated with meme coins can deter serious investors.",
                "Market demand is heavily influenced by internet trends and social media hype, making it unpredictable.",
                "Educating users about the limitations and risks of meme coin analysis is crucial.",
                "Potential for user churn if meme coin interest wanes."
              ]
            },
            "uniqueness": {
              "score": 70,
              "overview": "While crypto analysis tools exist, a dedicated AI-powered meme coin analyzer with sentiment focus offers a degree of uniqueness. Differentiating from general crypto analysis platforms is key.",
              "considerations": [
                "Existing crypto sentiment analysis tools may already cover some aspects of meme coin analysis.",
                "Need to clearly define the unique value proposition compared to broader crypto analytics platforms.",
                "Continuous innovation in AI models and data sources is needed to maintain uniqueness.",
                "Marketing efforts should emphasize the meme coin specific AI analysis."
              ]
            },
            "technical": {
              "score": 70,
              "overview": "Technically challenging but achievable. Requires expertise in AI/ML, NLP, crypto APIs, and real-time data processing. Building a robust and reliable system needs careful planning and execution.",
              "considerations": [
                "Complexity of developing accurate sentiment analysis models for informal and meme-heavy language.",
                "Integration with diverse crypto data APIs and social media platforms.",
                "Ensuring real-time data processing and low latency for timely insights.",
                "Scalability and reliability of the infrastructure to handle fluctuating user loads and data volumes."
              ]
            }
          },
          "features": [
            {
              "id": "F1",
              "name": "Real-time Sentiment Analysis Dashboard",
              "description": "Display real-time sentiment scores for selected meme coins, visualizing sentiment trends from social media and news sources.",
              "priority": "high",
              "complexity": 7,
              "type": "must-have"
            },
            {
              "id": "F2",
              "name": "Meme Coin Price & On-Chain Data Tracking",
              "description": "Provide real-time price charts, market cap, volume, and on-chain metrics (like transaction volume, holder distribution) for meme coins.",
              "priority": "high",
              "complexity": 5,
              "type": "must-have"
            },
            {
              "id": "F3",
              "name": "Risk Assessment Score & Volatility Index",
              "description": "Calculate a risk score for each meme coin based on sentiment, volatility, and on-chain data, along with a volatility index.",
              "priority": "medium",
              "complexity": 6,
              "type": "should-have"
            },
            {
              "id": "F4",
              "name": "Customizable Alerts & Notifications",
              "description": "Allow users to set up custom alerts for significant sentiment changes, price movements, or risk score fluctuations.",
              "priority": "medium",
              "complexity": 4,
              "type": "should-have"
            },
            {
              "id": "F5",
              "name": "Community Trend Analysis & Hype Meter",
              "description": "Identify trending meme coins based on social media activity and community buzz, visualized through a 'hype meter'.",
              "priority": "low",
              "complexity": 5,
              "type": "nice-to-have"
            }
          ],
          "market": [
            {
              "name": "LunarCrush",
              "description": "Crypto social intelligence platform providing social media analytics and insights for cryptocurrencies.",
              "url": "https://lunarcrush.com/",
              "userBase": "Crypto investors, traders, and enthusiasts",
              "uniqueFeatures": [
                "Social media sentiment analysis",
                "Influencer tracking",
                "Community insights"
              ],
              "marketGaps": [
                "Less focus on meme coins specifically",
                "Sentiment analysis might be broader, not tailored for meme coin language",
                "Less emphasis on risk assessment specific to meme coins"
              ]
            },
            {
              "name": "CoinGecko",
              "description": "Comprehensive cryptocurrency data aggregator providing price tracking, market charts, and information for thousands of cryptocurrencies.",
              "url": "https://www.coingecko.com/",
              "userBase": "Broad range of crypto users, from beginners to experienced traders",
              "uniqueFeatures": [
                "Extensive cryptocurrency database",
                "Portfolio tracking",
                "API access"
              ],
              "marketGaps": [
                "No AI-powered sentiment analysis",
                "Broad market coverage, not specialized in meme coins",
                "Lacks specific tools for meme coin risk assessment and community hype analysis"
              ]
            }
          ]
        }
      });
}