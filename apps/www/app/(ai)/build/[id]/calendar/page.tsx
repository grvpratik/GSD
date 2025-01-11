import React from "react";
import ScheduleCalendar from "www/components/section/schedule/schedule-cal";

const Calendar = async ({ params }: { params: { id: string } }) => {
	const { id } = await params;
	return (
		<main className="mx-4">
			<ScheduleCalendar />
		</main>
	);
};

export default Calendar;
