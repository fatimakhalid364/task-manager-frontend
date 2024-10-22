import dayjs from 'dayjs';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateHighStatus } from "src/store/slices/highPrioritySlice";
import { updateLowStatus } from "src/store/slices/lowPrioritySlice";
import { updateMediumStatus } from "src/store/slices/mediumPrioritySLice";
import { updateTaskStatus } from "src/store/slices/taskSlice";

function UpdateTaskStatuses() {
    const dispatch = useDispatch();
    const highPriorityTasks = useSelector((state) => state.highPriorityTasks);
    const mediumPriorityTasks = useSelector((state) => state.mediumPriorityTasks);
    const lowPriorityTasks = useSelector((state) => state.lowPriorityTasks);
    const tasksT = useSelector((state) => state.tasks.tasks);
    const intervalRef = useRef(null);
    useEffect(() => {
        console.log("Inside the loggginggggggggggg inner");

        intervalRef.current = setInterval(() => {
            const today = dayjs();
            tasksT.forEach(task => {
                const dueDate = dayjs(task.dueDate);
                const minutesUntilDueDate = dueDate.diff(today, 'minutes');
                if (minutesUntilDueDate < 0 &&
                    task.status !== 'PENDING' && task.status !== 'COMPLETED' && task.status !== 'IN_PROGRESS') {
                    dispatch(updateTaskStatus({ taskId: task._id, newStatus: 'PENDING' }));
                }
            });
            highPriorityTasks?.highPriorityTasks.forEach(task => {
                const dueDate = dayjs(task.dueDate);
                const minutesUntilDueDate = dueDate.diff(today, 'minutes');
                if (minutesUntilDueDate < 0 &&
                    task.status !== 'PENDING' && task.status !== 'COMPLETED' && task.status !== 'IN_PROGRESS') {
                    dispatch(updateHighStatus({ taskId: task._id, newStatus: 'PENDING' }));
                }
            });
            mediumPriorityTasks?.mediumPriorityTasks.forEach(task => {
                const dueDate = dayjs(task.dueDate);
                const minutesUntilDueDate = dueDate.diff(today, 'minutes');
                if (minutesUntilDueDate < 0 &&
                    task.status !== 'PENDING' && task.status !== 'COMPLETED' && task.status !== 'IN_PROGRESS') {
                    dispatch(updateMediumStatus({ taskId: task._id, newStatus: 'PENDING' }));
                }
            });
            lowPriorityTasks?.lowPriorityTasks.forEach(task => {
                const dueDate = dayjs(task.dueDate);
                const minutesUntilDueDate = dueDate.diff(today, 'minutes');
                if (minutesUntilDueDate < 0 &&
                    task.status !== 'PENDING' && task.status !== 'COMPLETED' && task.status !== 'IN_PROGRESS') {
                    dispatch(updateLowStatus({ taskId: task._id, newStatus: 'PENDING' }));
                }
            });
        }, 10000);

        return () => clearInterval(intervalRef.current);
    }, [tasksT]);

    return null;
}

export default UpdateTaskStatuses;
