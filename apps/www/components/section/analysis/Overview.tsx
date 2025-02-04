import React from "react";
import { OverviewBarChart } from "www/components/RadarChart";
import ScoreIndicator from "../../ScoreIndicator";

// interface OverviewAnalysisProps {
// 	feasibility: {
// 		score: number;
// 		overview: string;
// 		description: string;
// 		considerations: string[];
// 	};
// 	marketFit: {
// 		score: number;
// 		overview: string;
// 		description: string;
// 		considerations: string[];
// 	};
// 	scalability: {
// 		score: number;
// 		overview: string;
// 		description: string;
// 		considerations: string[];
// 	};
// 	differentiation: {
// 		score: number;
// 		overview: string;
// 		description: string;
// 		considerations: string[];
// 	};
// 	roiPotential: {
// 		score: number;
// 		overview: string;
// 		description: string;
// 		considerations: string[];
// 	};
// }

const OverviewAnalysis: React.FC<{ data: OverviewAnalysisProps }> = ({
	data,
}) => {
	const chart = Object.keys(data).map((key) => {
		const typedKey = key as keyof OverviewAnalysisProps;
		return {
			aspect: key,
			score: data[typedKey].score,
		};
	});
	return (
		<main className="flex flex-col w-full  h-full ">
			{/* <div className="w-full bg-gray-200 h-full grid grid-cols-1">
				<div className="grid grid-cols-3">
					<div className=" col-span-2">overview</div>
					<div className=" col-span-1">rating</div>
				</div>
				<div className="grid grid-cols-3">
					<div className=" col-span-1">mvp</div>
					<div className=" col-span-1">competetiors</div>
                    <div className=" col-span-1">rating</div>

				</div>
			</div> */}
			<div className="  h-full  grid gap-2 lg:grid-cols-3 lg:grid-rows-2 grid-rows- grid-cols-1">
				<div className="flex flex-col gap-1 p-4">
					<div className="size-12 bg-blue-500 rounded-lg"></div>
					<h1 className=" font-bold text-lg">Project Name</h1>
					<span className="  font-semibold text-sm ">Overview</span>
					<span className=" text-sm opacity-90">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. At saepe
						temporibus vel voluptatem repudiandae commodi, eveniet veritatis
						debitis autem magni minima atque voluptas laudantium quaerat
						praesentium repellendus dolorem animi? Eveniet!
					</span>
				</div>
				<div className=" col-span-1 lg:col-span-2 row-span-1 gap-2 grid grid-cols-2 grid-rows-1">
					<div>
						<ScoreIndicator score={54} />
					</div>
					<div>suggestion/missing</div>
				</div>

				<div>mvp/core features</div>
				<div>competetiors</div>
				<div>indication for success</div>
			</div>
			
		</main>
	);
};

export default OverviewAnalysis;
