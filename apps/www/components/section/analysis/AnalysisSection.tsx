"use client";
import { Calendar, ChevronRight, Feather, Store } from "lucide-react";
import React, { JSX, useState } from "react";
import { Button } from "www/components/ui/button";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "www/components/ui/tabs";
import OverviewAnalysis from "./Overview";
import FeaturesAnalysis from "./Features";
import MarketAnalysis from "./Market";

enum AnalysisTabs {
	Overview = "Overview",
	Features = "Features",
	Market = "Market",
}
type TabsType = {
	value: AnalysisTabs;
	label: AnalysisTabs;
	icon: any;
	content: JSX.Element;
};

const Analysis = ({ res }) => {
	const tabs: TabsType[] = [
		{
			value: AnalysisTabs.Overview,
			label: AnalysisTabs.Overview,
			icon: Calendar,
			content: <OverviewAnalysis data={res.analysis} />,
		},
		{
			value: AnalysisTabs.Features,
			label: AnalysisTabs.Features,
			icon: Feather,
			content: <FeaturesAnalysis />,
		},
		{
			value: AnalysisTabs.Market,
			label: AnalysisTabs.Market,
			icon: Store,
			content: <MarketAnalysis />,
		},
	];
	const [activeTab, setActiveTab] = useState<AnalysisTabs>(
		tabs[0].value as AnalysisTabs
	);

	const handleTabChange = (value: string) => {
		setActiveTab(value as AnalysisTabs);
	};

	const handleNext = () => {
		// if (activeTab === 'account') {
		//   setActiveTab('password');
		// }
	};

	return (
		<div className="flex flex-col w-full h-full font-sans">
			<main className="flex-1 flex flex-col">
				<Tabs
					value={activeTab}
					onValueChange={handleTabChange}
					className="lg:flex w-full h-full "
					orientation="vertical"
				>
					<TabsList className="lg:h-fit bg-transparent m-2 lg:flex-col lg:gap-2 lg:items-start lg:justify-start lg:*:w-48 gap-2">
						{tabs.map((tab) => (
							<TabsTrigger
								key={tab.value}
								value={tab.value}
								className=" items-center justify-start flex p-1 gap-2 text-sm pr-2 min-w-28"
							>
								<tab.icon className="lg:size-8 size-6 text-primary-foreground  bg-blue-400 p-1.5 rounded-md" />{" "}
								<span>{tab.label.toLowerCase()}</span>
							</TabsTrigger>
						))}
					</TabsList>
					{tabs &&
						tabs.map((tab) => (
							<TabsContent
								className=" flex-1 m-2 rounded-lg overflow-hidden"
								key={tab.value}
								value={tab.value}
							>
								{tab.content}
							</TabsContent>
						))}
				</Tabs>
			</main>
			{/* <div className="flex justify-end">
				<Button
					variant="default"
					className="relative pe-12 mb-4"
					onClick={handleNext}
				>
					Next
					<span className="pointer-events-none absolute inset-y-0 end-0 flex w-9 items-center justify-center">
						<ChevronRight
							className="opacity-60"
							size={16}
							strokeWidth={2}
							aria-hidden="true"
						/>
					</span>
				</Button>
			</div> */}
		</div>
	);
};

export default Analysis;
