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



const OverviewAnalysis: React.FC<{ data: OverviewAnalysisProps }> = ({ data }) => {
  const chart = Object.keys(data).map((key) => {
		const typedKey = key as keyof OverviewAnalysisProps;
		return {
			aspect: key,
			score: data[typedKey].score,
		};
	});
  return (
    <main className='flex flex-col w-full'>
      <OverviewBarChart data={chart} />
      
        <div className='grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2'>
            {Object.keys(data).map((key) => {
            const { score, overview, description, considerations } = data[key as keyof OverviewAnalysisProps];
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