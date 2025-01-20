import React from "react";
import ScheduleCalendar from "www/components/section/schedule/ScheduleCalendar";
import { response } from "www/app/(ai)/layout";
const Calendar = async ({ params }: { params: { id: string } }) => {
	const { id } = await params;
	const data = response.find((idx) => idx.id === Number(id));
	if (!data) return <div>Not found</div>;
	return (
		<main className="mx-4">
			<ScheduleCalendar calendarData={data}/>
		</main>
	);
};

export default Calendar;
