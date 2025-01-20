import React from "react";
import Analysis from "www/components/section/analysis/AnalysisSection";
import { response } from "www/app/(ai)/layout";

const BuildPage = ({ params }: { params: { id: string } }) => {
	console.log(params.id);
	const result = response.filter((data) => data.id === Number(params.id))[0];
	console.log(result, "result");
	if (!result)
		return (
			<main className="flex flex-col justify-center items-center h-full w-full  font-bold">
				404 Not found
			</main>
		);

	return (
		<div className=" flex-1 mx-4 flex flex-col ">
			<Analysis res={result} />
		</div>
	);
};

export default BuildPage;
