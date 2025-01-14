"use client";
import { Calendar, ChevronRight } from "lucide-react";
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
	Overview,
	Features,
	Market,
}
type TabValue = "Overview" | "Features" | "Market";
type TabsType = {
	value: string;
	label: TabValue;
	content: JSX.Element;
};
const tabs: TabsType[] = [
	{
		value: "Overview",
		label: "Overview",
		content: <OverviewAnalysis />,
	},
	{
		value: "Features",
		label: "Features",
		content: <FeaturesAnalysis />,
	},
	{ value: "Market", label: "Market", content: <MarketAnalysis /> },
];

const Analysis = () => {
	const [activeTab, setActiveTab] = useState<TabValue>(
		tabs[0].value as TabValue
	);

	const handleTabChange = (value: string) => {
		setActiveTab(value as TabValue);
	};

	const handleNext = () => {
		// if (activeTab === 'account') {
		//   setActiveTab('password');
		// }
	};

	return (
		<div className="flex flex-col w-full h-full">
			<main className="flex-1 flex flex-col">
				<Tabs
					value={activeTab}
					onValueChange={handleTabChange}
					className="lg:flex w-full h-full "
					orientation="vertical"
				>
					<TabsList className="lg:h-fit bg-transparent m-2 lg:flex-col lg:gap-2 lg:items-start lg:justify-start lg:*:w-full">
						{tabs.map((tab) => (
							<TabsTrigger key={tab.value} value={tab.value}>
								{tab.label}
							</TabsTrigger>
						))}
					</TabsList>
					{tabs.map((tab) => (
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
			<div className="flex justify-end">
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
			</div>
		</div>
	);
};

export default Analysis;
