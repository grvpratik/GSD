import React from 'react'
import { OverviewBarChart } from 'www/components/RadarChart'

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
const chart=Object.keys(assessmentData).map((key) => {
  const typedKey = key as keyof OverviewAnalysisProps;
  return {
      aspect: key,
      score: assessmentData[typedKey].score
  }
})
console.log(chart)
const OverviewAnalysis = () => {
  return (
    <main className='flex flex-col w-full'>
      <OverviewBarChart data={chart} />
      
        <div className='grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2'>
            {Object.keys(assessmentData).map((key) => {
            const { score, overview, description, considerations } = assessmentData[key as keyof OverviewAnalysisProps];
            return (
                <div key={key} className='p-6 bg-white rounded-lg shadow-md'>
                <h3 className='text-lg font-semibold text-gray-800'>{key.toUpperCase()}</h3>
                <p className='text-sm text-gray-600 mt-2'>{overview}</p>
                <p className='text-sm text-gray-600 mt-2'>{description}</p>
                <ul className='list-disc list-inside mt-4'>
                    {considerations.map((consideration) => (
                    <li key={consideration} className='text-sm text-gray-600'>{consideration}</li>
                    ))}
                </ul>
                <div className='mt-4'>
                    <span className='text-sm font-semibold text-gray-800'>Score:</span>
                    <span className='text-sm text-gray-600 ml-2'>{score}</span>
                </div>
                </div>
            );
            })}
        </div>
    </main>
  )
}

export default OverviewAnalysis