"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent } from "www/components/ui/card";
import Calendar from "www/components/section/schedule/Calendar";
import TodoList from "www/components/section/schedule/TodoList";
import Phases from "www/components/section/schedule/Phases";
import type { Task, Phase } from "www/types";
import { response } from "www/app/(ai)/layout";
interface ScheduleCalendarProps {
	calendarData: any;
}
const selectedDateTasks = (date: Date, phases: Phase[]): Phase | undefined => {
	const targetDate = new Date(date!);
	return phases.find((phase: Phase) => {
		const start = new Date(phase.start_date);
		const end = new Date(phase.end_date);
		return targetDate >= start && targetDate <= end;
	});
};
const ScheduleCalendar = ({ calendarData }: ScheduleCalendarProps) => {
	const [date, setDate] = useState<Date | undefined>(new Date());

	const phases = calendarData?.phases ?? [];

	const PhaseTasks: Phase | undefined = selectedDateTasks(date!, phases);

	return (
		<main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-screen p-4">
			<Card className="bg-background">
				<CardContent className="p-4">
					<Calendar date={date} setDate={setDate} />
				</CardContent>
			</Card>
			<TodoList tasks={PhaseTasks?.tasks ?? []} date={date} />
			<Phases phases={phases} />
		</main>
	);
};

export default ScheduleCalendar;
