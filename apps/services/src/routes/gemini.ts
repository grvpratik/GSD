import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";



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