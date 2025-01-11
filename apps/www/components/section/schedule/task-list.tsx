import React, { useState } from "react";
import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Plus } from "lucide-react";
import { Task } from "./schedule-cal";
import SortableTask from "./sortable-task";

interface TaskListProps {
	tasks: Task[];
	onTasksReorder: (tasks: Task[]) => void;
	onAddTask: (text: string) => void;
	onDeleteTask: (taskId: string) => void;
}

const TaskList = ({
	tasks,
	onTasksReorder,
	onAddTask,
	onDeleteTask,
}: TaskListProps) => {
	const [newTaskText, setNewTaskText] = useState("");

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	const handleDragEnd = (event: any) => {
		const { active, over } = event;

		if (active.id !== over.id) {
			const oldIndex = tasks.findIndex((task) => task.id === active.id);
			const newIndex = tasks.findIndex((task) => task.id === over.id);
			onTasksReorder(arrayMove(tasks, oldIndex, newIndex));
		}
	};

	const handleAddTask = (e: React.FormEvent) => {
		e.preventDefault();
		if (newTaskText.trim()) {
			onAddTask(newTaskText.trim());
			setNewTaskText("");
		}
	};

	return (
		<div className="bg-gray-700/50 rounded-lg p-6">
			<h2 className="text-xl mb-4">Tasks</h2>

			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
			>
				<SortableContext items={tasks} strategy={verticalListSortingStrategy}>
					<div className="space-y-2">
						{tasks.map((task) => (
							<SortableTask key={task.id} task={task} onDelete={onDeleteTask} />
						))}
					</div>
				</SortableContext>
			</DndContext>

			<form onSubmit={handleAddTask} className="mt-4">
				<div className="flex items-center">
					<button
						type="submit"
						className="bg-teal-500 hover:bg-teal-600 text-white rounded-lg px-4 py-2 flex items-center gap-2"
					>
						<Plus className="w-5 h-5" />
						ADD TASK
					</button>
				</div>
			</form>
		</div>
	);
};

export default TaskList;
