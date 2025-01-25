import React from "react";

// interface technologies {
// 	database: string;
// 	server: string;
// 	frontend: string;
// 	deployment: string;
// 	services: string;
// }


import { Card, CardContent, CardHeader, CardTitle } from "www/components/ui/card";
import { Badge } from "www/components/ui/badge";
import { Trophy, Target, Star, Rocket, Users, Globe } from 'lucide-react';

interface Competitor {
  name: string;
  description: string;
  url: string;
  userBase: string;
  uniqueFeatures: string[];
  advantages: string[];
  disadvantages: string[];
}

const CompetitorCard = ({ competitor }: { competitor: Competitor }) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardHeader className="flex flex-row items-center space-x-4">
      <Globe className="text-primary" size={32} />
      <CardTitle>{competitor.name}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground mb-4">{competitor.description}</p>
      
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="flex items-center">
          <Users className="mr-2 text-primary" size={20} />
          <span className="text-sm">{competitor.userBase}</span>
        </div>
        <a 
          href={competitor.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-primary hover:underline text-sm"
        >
          Website
        </a>
      </div>

      <div className="space-y-2">
        <div>
          <h4 className="flex items-center text-sm font-semibold mb-2">
            <Star className="mr-2 text-yellow-500" size={16} />
            Unique Features
          </h4>
          <div className="flex flex-wrap gap-2">
            {competitor.uniqueFeatures.map((feature, idx) => (
              <Badge key={idx} variant="secondary">{feature}</Badge>
            ))}
          </div>
        </div>
        
        <div className="mt-2">
          <h4 className="flex items-center text-sm font-semibold mb-2">
            <Trophy className="mr-2 text-green-500" size={16} />
            Advantages
          </h4>
          <div className="flex flex-wrap gap-2">
            {competitor.advantages.map((advantage, idx) => (
              <Badge key={idx} variant="outline">{advantage}</Badge>
            ))}
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const MarketAnalysis = () => {
  const { competitors, diff } = {
    competitors: [
      {
        name: "Company A",
        description: "Leading provider of innovative solutions",
        url: "https://company-a.com",
        userBase: "1M+ users",
        uniqueFeatures: ["Feature 1", "Feature 2", "Feature 3"],
        advantages: ["easy-to-use", "fast"],
		disadvantages: ["no customer support"]
      },
      {
        name: "Company B",
        description: "Popular platform for advanced services",
        url: "https://company-b.com",
        userBase: "500K+ users",
        uniqueFeatures: ["Feature 1", "Feature 2", "Feature 3"],
        advantages: ["great customer support"],
		disadvantages: ["slow"]
      }
    ],
    diff: {
      competitorAdvantages: ["Feature 1", "Feature 2"],
      marketGaps: ["Feature 3"],
      innovativeFeatures: ["Feature 4", "Feature 5"]
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center mb-6">
        <Rocket className="mr-4 text-primary" size={48} />
        <h1 className="text-4xl font-bold">Competitive Market Analysis</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {competitors.map((competitor, index) => (
          <CompetitorCard key={index} competitor={competitor} />
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center">
            <Target className="mr-3 text-primary" size={32} />
            <CardTitle>Market Insights</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Competitor Advantages</h3>
              <div className="space-y-2">
                {diff.competitorAdvantages.map((advantage, idx) => (
                  <Badge key={idx} variant="secondary">{advantage}</Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Market Gaps</h3>
              <div className="space-y-2">
                {diff.marketGaps.map((gap, idx) => (
                  <Badge key={idx} variant="destructive">{gap}</Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Innovative Features</h3>
              <div className="space-y-2">
                {diff.innovativeFeatures.map((feature, idx) => (
                  <Badge key={idx} variant="outline">{feature}</Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketAnalysis;