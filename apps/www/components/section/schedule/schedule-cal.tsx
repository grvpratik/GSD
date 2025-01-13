"use client";
import React from "react";
import { Calendar } from "www/components/ui/calendar";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
} from "www/components/ui/card";
import { Badge } from "www/components/ui/badge";
import TaskList from "./task-list";

export type Task = {
	id: string;
	text: string;
	completed: boolean;
	category: string;
	date: Date;
};

const categoryColors = {
	home: "bg-blue-500/10 text-blue-500",
	work: "bg-purple-500/10 text-purple-500",
	personal: "bg-green-500/10 text-green-500",
};

const ScheduleCalendar = () => {
	const [date, setDate] = React.useState<Date | undefined>(new Date());
	const [tasks, setTasks] = React.useState<Task[]>([
		{
			id: "1",
			text: "bring garbage out",
			completed: false,
			category: "home",
			date: new Date(),
		},
		{
			id: "3",
			text: "bring garbage out",
			completed: false,
			category: "home",
			date: new Date(),
		},
		{
			id: "4",
			text: "bring garbage out",
			completed: false,
			category: "home",
			date: new Date(),
		},
		{
			id: "5",
			text: "bring garbage out",
			completed: false,
			category: "home",
			date: new Date(),
		},
		{
			id: "6",
			text: "bring garbage out",
			completed: false,
			category: "home",
			date: new Date(),
		},
	]);

	const handleTasksReorder = (newTasks: Task[]) => {
		setTasks(newTasks);
	};

	const addTask = (text: string, category: string) => {
		if (!date) return;
		setTasks([
			...tasks,
			{
				id: Date.now().toString(),
				text,
				completed: false,
				category,
				date: date,
			},
		]);
	};

	const deleteTask = (taskId: string) => {
		setTasks(tasks.filter((task: Task) => task.id !== taskId));
	};

	// Filter tasks for selected date
	const selectedDateTasks = tasks.filter(
		(task) => date && task.date.toDateString() === date.toDateString()
	);

	// Get incomplete tasks from previous dates
	const incompleteTasks = tasks.filter(
		(task) =>
			!task.completed &&
			task.date < new Date() &&
			task.date.toDateString() !== date?.toDateString()
	);

	return (
		<main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-screen p-4">
			<Card className="bg-background">
				<CardContent className="p-4">
					<Calendar
						disabled={{ before: new Date() }}
						mode="single"
						selected={date}
						onSelect={setDate}
						className="rounded-md"
					/>
				</CardContent>
			</Card>

			<TaskList
				tasks={selectedDateTasks}
				onTasksReorder={handleTasksReorder}
				onAddTask={addTask}
				onDeleteTask={deleteTask}
			/>

			<Card className="bg-background">
				<CardHeader>
					<CardTitle className="text-xl font-semibold flex items-center gap-2">
						Overdue Tasks
						{incompleteTasks.length > 0 && (
							<Badge variant="destructive" className="rounded-full">
								{incompleteTasks.length}
							</Badge>
						)}
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-2 max-h-[calc(100vh-12rem)] overflow-y-auto pr-2">
						{incompleteTasks.length === 0 ?
							<div className="text-center text-muted-foreground py-8">
								No overdue tasks
							</div>
						:	incompleteTasks.map((task) => (
								<div
									key={task.id}
									className="flex items-center gap-3 bg-card hover:bg-accent/50 rounded-lg p-3 border border-border transition-colors"
								>
									<input
										type="checkbox"
										className="w-4 h-4 rounded-full border-2 border-primary/50 checked:bg-primary checked:border-transparent focus:ring-0 focus:ring-offset-0"
									/>
									<div className="flex-1">
										<div className="text-foreground">{task.text}</div>
										<div className="flex items-center gap-2 mt-1">
											<Badge
												className={`${categoryColors[task.category as keyof typeof categoryColors]} font-medium`}
											>
												{task.category}
											</Badge>
											<span className="text-sm text-muted-foreground">
												Due: {task.date.toLocaleDateString()}
											</span>
										</div>
									</div>
								</div>
							))
						}
					</div>
				</CardContent>
			</Card>
		</main>
	);
};

export default ScheduleCalendar;
