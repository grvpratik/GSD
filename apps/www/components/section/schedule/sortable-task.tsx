import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, MoreVertical, Trash2 } from "lucide-react";
import { Task } from "./schedule-cal";

interface SortableTaskProps {
	task: Task;
	onDelete: (taskId: string) => void;
}

const SortableTask = ({ task, onDelete }: SortableTaskProps) => {
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: task.id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	const handleDelete = () => {
		setShowDeleteConfirm(true);
	};

	const confirmDelete = () => {
		onDelete(task.id);
		setShowDeleteConfirm(false);
	};

	const cancelDelete = () => {
		setShowDeleteConfirm(false);
	};

	return (
		<div className="relative">
			<div
				ref={setNodeRef}
				style={style}
				className="flex items-center gap-3 bg-gray-800 rounded-lg p-3 cursor-move group"
				{...attributes}
				{...listeners}
			>
				<GripVertical className="w-4 h-4 text-gray-500" />
				<input
					type="checkbox"
					className="w-4 h-4 rounded-full border-2 border-gray-500 checked:bg-teal-500 checked:border-transparent focus:ring-0 focus:ring-offset-0"
				/>
				<span className="flex-1 text-gray-300">{task.text}</span>
				<button
					onClick={handleDelete}
					className="text-gray-500 hover:text-red-400 transition-colors"
				>
					<Trash2 className="w-4 h-4" />
				</button>
			</div>

			{showDeleteConfirm && (
				<div className="absolute right-0 top-full mt-2 bg-gray-800 rounded-lg shadow-lg p-4 z-10">
					<p className="text-sm text-gray-300 mb-3">
						Are you sure you want to delete this task?
					</p>
					<div className="flex gap-2 justify-end">
						<button
							onClick={cancelDelete}
							className="px-3 py-1 text-sm text-gray-400 hover:text-gray-200"
						>
							Cancel
						</button>
						<button
							onClick={confirmDelete}
							className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded"
						>
							Delete
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default SortableTask;
