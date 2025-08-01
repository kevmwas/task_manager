import { useModal } from "../../../hooks/useModal";
import TaskModal from "./task_modal";

interface TaskCounts {
  in_progress: number;
  completed: number;
  to_do: number;
  cancelled: number;
}


interface TaskHeaderProps {
  users: any;
  counts: TaskCounts;
}

const TaskHeader = ({ users, counts }: TaskHeaderProps) => {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div className="flex flex-col w-full gap-4 sm:justify-between xl:flex-row xl:items-center">
      <div className="grid grid-cols-2 sm:grid-cols-5 items-center gap-x-1 gap-y-2 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-900">
        <button className="inline-flex items-center xl:justify-start justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md group hover:text-gray-900 dark:hover:text-white text-gray-900 dark:text-white bg-white dark:bg-gray-800 dark:text-gray-400">All Tasks
          <span className="inline-flex rounded-full px-2 py-0.5 text-xs font-medium leading-normal group-hover:bg-brand-50 group-hover:text-brand-500 dark:group-hover:bg-brand-500/15 dark:group-hover:text-brand-400 text-brand-500 dark:text-brand-400 bg-brand-50 dark:bg-brand-500/15">
            {counts.in_progress + counts.completed + counts.to_do + counts.cancelled}
          </span>
        </button>
        <button className="inline-flex items-center xl:justify-start justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md group hover:text-gray-900 dark:hover:text-white dark:text-gray-400">To do
          <span className="inline-flex rounded-full px-2 py-0.5 text-xs font-medium leading-normal group-hover:bg-brand-50 group-hover:text-brand-500 dark:group-hover:bg-brand-500/15 dark:group-hover:text-brand-400 bg-white dark:bg-white/[0.03]">{counts.to_do}
          </span>
        </button>
        <button className="inline-flex items-center xl:justify-start justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md group hover:text-gray-900 dark:hover:text-white dark:text-gray-400">In Progress
          <span className="inline-flex rounded-full px-2 py-0.5 text-xs font-medium leading-normal group-hover:bg-brand-50 group-hover:text-brand-500 dark:group-hover:bg-brand-500/15 dark:group-hover:text-brand-400 bg-white dark:bg-white/[0.03]">{counts.in_progress}
          </span>
        </button>
        <button className="inline-flex items-center xl:justify-start justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md group hover:text-gray-900 dark:hover:text-white dark:text-gray-400">Completed
          <span className="inline-flex rounded-full px-2 py-0.5 text-xs font-medium leading-normal group-hover:bg-brand-50 group-hover:text-brand-500 dark:group-hover:bg-brand-500/15 dark:group-hover:text-brand-400 bg-white dark:bg-white/[0.03]">{counts.completed}
          </span>
        </button>
        <button className="inline-flex items-center xl:justify-start justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md group hover:text-gray-900 dark:hover:text-white dark:text-gray-400">Cancelled
          <span className="inline-flex rounded-full px-2 py-0.5 text-xs font-medium leading-normal group-hover:bg-brand-50 group-hover:text-brand-500 dark:group-hover:bg-brand-500/15 dark:group-hover:text-brand-400 bg-white dark:bg-white/[0.03]">{counts.cancelled}
          </span>
        </button>
      </div>
      <div className="flex flex-wrap items-center gap-2 xl:justify-end">
        <button onClick={() => { openModal()}} className="inline-flex items-center justify-center gap-2 rounded-lg transition  px-4 py-3 text-sm bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 ">Add New Task
          <svg className="fill-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.2502 4.99951C9.2502 4.5853 9.58599 4.24951 10.0002 4.24951C10.4144 4.24951 10.7502 4.5853 10.7502 4.99951V9.24971H15.0006C15.4148 9.24971 15.7506 9.5855 15.7506 9.99971C15.7506 10.4139 15.4148 10.7497 15.0006 10.7497H10.7502V15.0001C10.7502 15.4143 10.4144 15.7501 10.0002 15.7501C9.58599 15.7501 9.2502 15.4143 9.2502 15.0001V10.7497H5C4.58579 10.7497 4.25 10.4139 4.25 9.99971C4.25 9.5855 4.58579 9.24971 5 9.24971H9.2502V4.99951Z" fill=""></path>
          </svg>
        </button>
      </div>
      <TaskModal isOpen={isOpen} closeModal={closeModal } isEdit={false} task={{}} users={users} />
    </div>
  )
}

export default TaskHeader;
