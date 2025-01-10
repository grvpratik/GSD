import React from 'react'
import ScheduleCalendar from 'www/components/section/schedule/schedule-cal'

const Calendar = ({ params }: { params: { id: string } }) => {
  return (
    <div>Calendar{params.id}
    
      <ScheduleCalendar />
    
    
    </div>
  )
}

export default Calendar