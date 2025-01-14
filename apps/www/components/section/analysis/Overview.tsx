import React from 'react'


interface OverviewAnalysisProps {
    feasibility: {
        score: number,
        overview: string,
        description: string,
        considerations: string[]
    },
    marketFit: {
        score: number,
        overview: string,
        description: string,
        considerations: string[]
    },
    scalability: {
        score: number,
        overview: string,
        description: string,
        considerations: string[]
    },
    differentiation: {
        score: number,
        overview: string,
        description: string,
        considerations: string[]
    },
    roiPotential: {
        score: number,
        overview: string,
        description: string,
        considerations: string[]
    }
}

const assessmentData :OverviewAnalysisProps= {
    feasibility: {
      score: 85,
      overview: "Technical implementation capability using current resources",
      description: "Evaluates whether the idea can be built with existing technologies, skills, and resources within reasonable constraints.",
      considerations: [
        "Technical complexity",
        "Resource availability",
        "Implementation timeline"
      ]
    },
    marketFit: {
      score: 92,
      overview: "Problem-solution alignment with market needs",
      description: "Measures how well the idea addresses a significant market need or pain point.",
      considerations: [
        "Target market size",
        "Problem urgency",
        "Solution effectiveness"
      ]
    },
    scalability: {
      score: 78,
      overview: "Growth potential and adaptation capability",
      description: "Assesses the ability to handle increased demand and market expansion.",
      considerations: [
        "Technical architecture",
        "Operational efficiency",
        "Resource requirements"
      ]
    },
    differentiation: {
      score: 88,
      overview: "Unique value proposition versus competitors",
      description: "Evaluates distinctive features and competitive advantages.",
      considerations: [
        "Competitor analysis",
        "Unique features",
        "Market positioning"
      ]
    },
    roiPotential: {
      score: 82,
      overview: "Financial and strategic return prospects",
      description: "Projects potential returns on investment and strategic value.",
      considerations: [
        "Revenue potential",
        "Cost structure",
        "Strategic benefits"
      ]
    }
  };

const OverviewAnalysis = () => {
  return (
    <div>OverviewAnalysis</div>
  )
}

export default OverviewAnalysis