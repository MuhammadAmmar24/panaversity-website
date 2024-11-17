'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { MdCalendarToday, MdAccessTime, MdLanguage, MdPerson } from "react-icons/md"

const daysOfWeek = ['Wed', 'Sat']

function ScheduleEntry() {
  return (
    <div className="flex items-center justify-between space-x-4 py-2 text-sm">
      <div className="flex items-center space-x-2 text-muted-foreground">
        <MdCalendarToday className="h-4 w-4" />
        <span>{daysOfWeek.join(', ')}</span>
      </div>
      {/* <div className="flex items-center space-x-4 text-muted-foreground"> */}
        <div className="flex items-center">
          <MdAccessTime className="mr-1 h-4 w-4" />
          <span>9:00 PM (+5 GMT)</span>
        </div>
        <div className="flex items-center">
          <MdLanguage className="mr-1 h-4 w-4" />
          <span>English, اردو</span>
        </div>
        <div className="flex items-center">
          <MdPerson className="mr-1 h-4 w-4" />
          <span>John Doe</span>
        </div>
      {/* </div> */}
    </div>
  )
}

export default function ClassSections() {
  return (
    <Card className="w-full max-w-6xl">
      <CardHeader>
        <CardTitle>Class Sections</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ScheduleEntry />
        <ScheduleEntry />
        <ScheduleEntry />
      </CardContent>
    </Card>
  )
}