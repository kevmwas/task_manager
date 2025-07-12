interface KanbanTask {
    id: Number;
    title: string;
    dueDate: string;
    priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" | string;
}

interface TaskListFlowProps {
    task: KanbanTask;
    modal: () => void;
}

const KanbanList = ({ task, modal } : TaskListFlowProps) => {
    const taskPriority =
        task.priority === "LOW"
            ? "bg-green-400/10 text-green-400"
            : task.priority === "MEDIUM"
            ? "bg-blue-400/10 text-blue-400"
            : task.priority === "HIGH"
            ? "bg-yellow-400/10 text-yellow-400"
            : "bg-red-400/10 text-red-400";

    return (
        <div draggable="true" className="task rounded-xl border border-gray-200 bg-white p-5 shadow-theme-sm dark:border-gray-800 dark:bg-white/5">
            <div className="flex items-start justify-between gap-6">
                <div>
                    <h4 className="mb-5 text-base text-gray-800 dark:text-white/90">
                        {task.title}
                    </h4>

                    <div className="flex items-center gap-3">
                        <span className="flex cursor-pointer items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                            <svg className="fill-current" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M5.33329 1.0835C5.74751 1.0835 6.08329 1.41928 6.08329 1.8335V2.25016L9.91663 2.25016V1.8335C9.91663 1.41928 10.2524 1.0835 10.6666 1.0835C11.0808 1.0835 11.4166 1.41928 11.4166 1.8335V2.25016L12.3333 2.25016C13.2998 2.25016 14.0833 3.03366 14.0833 4.00016V6.00016L14.0833 12.6668C14.0833 13.6333 13.2998 14.4168 12.3333 14.4168L3.66663 14.4168C2.70013 14.4168 1.91663 13.6333 1.91663 12.6668L1.91663 6.00016L1.91663 4.00016C1.91663 3.03366 2.70013 2.25016 3.66663 2.25016L4.58329 2.25016V1.8335C4.58329 1.41928 4.91908 1.0835 5.33329 1.0835ZM5.33329 3.75016L3.66663 3.75016C3.52855 3.75016 3.41663 3.86209 3.41663 4.00016V5.25016L12.5833 5.25016V4.00016C12.5833 3.86209 12.4714 3.75016 12.3333 3.75016L10.6666 3.75016L5.33329 3.75016ZM12.5833 6.75016L3.41663 6.75016L3.41663 12.6668C3.41663 12.8049 3.52855 12.9168 3.66663 12.9168L12.3333 12.9168C12.4714 12.9168 12.5833 12.8049 12.5833 12.6668L12.5833 6.75016Z" fill=""></path>
                            </svg>
                            {task.dueDate}
                        </span>
                    </div>

                    <span className={`mt-3 inline-flex rounded-full px-2 py-0.5 text-theme-xs font-medium ${taskPriority}`}>
                        {task.priority.toLowerCase()}
                    </span>
                </div>

                <div onClick={modal} className="h-6 w-full max-w-6 overflow-hidden border-gray-200 dark:border-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" height="14" width="14" viewBox="0 0 512 512">
                        <path fill="#98a2b3" d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default KanbanList