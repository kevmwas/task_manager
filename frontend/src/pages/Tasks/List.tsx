import { useEffect, useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import TaskHeader from "./components/tasks_header";
import TaskListFlow from "./components/task_list";
import { useModal } from "../../hooks/useModal";
import TaskModal from "./components/task_modal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../hooks/store";
import { fetchTasks, fetchTasksCount } from "../../api/tasks";
import { fetchUsers } from "../../api/users";

const TasksList = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const [count, setCount] = useState({ to_do: 0, in_progress: 0, completed: 0, cancelled: 0 });
  const [activeTask, setActiveTask] = useState({});

  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.value);
  const users = useSelector((state: RootState) => state.users.value);

  const userDataString = localStorage.getItem("user_data");
  const userData = userDataString ? JSON.parse(userDataString) : {};

  useEffect(() => {
    dispatch(fetchTasks() as any);

    Promise.all([
      dispatch(fetchTasksCount("TODO") as any),
      dispatch(fetchTasksCount("IN_PROGRESS") as any),
      dispatch(fetchTasksCount("COMPLETED") as any),
      dispatch(fetchTasksCount("CANCELLED") as any)
    ]).then((results) => {
      const counts = {
        to_do: results[0]?.payload?.TODO || 0,
        in_progress: results[1]?.payload?.IN_PROGRESS || 0,
        completed: results[2]?.payload?.COMPLETED || 0,
        cancelled: results[3]?.payload?.CANCELLED || 0,
      };
      setCount(counts);
    });

    if (userData.role === "admin") {
      dispatch(fetchUsers() as any);
    }

  }, [dispatch]);

  const todoTasks = tasks.filter((task: any) => task.status === "TODO");
  const inProgressTasks = tasks.filter((task: any) => task.status === "IN_PROGRESS");
  const completedTasks = tasks.filter((task: any) => task.status === "COMPLETED");
  const cancelledTasks = tasks.filter((task: any) => task.status === "CANCELLED");

  return (
    <>
      <PageMeta
        title="TasksList"
        description="List af all user tasks"
      />
      <PageBreadcrumb pageTitle="Tasks list" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="flex flex-col items-center px-4 py-5 xl:px-6 xl:py-6">
          <TaskHeader users={users.length ? users : []} counts={count} />
        </div>
        <div className="p-4 space-y-8 border-t border-gray-200 mt-7 dark:border-gray-800 sm:mt-0 xl:p-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="flex items-center gap-3 text-base font-medium text-gray-800 capitalize dark:text-white/90">todo
                <span className="inline-flex rounded-full px-2 py-0.5 text-theme-xs font-medium bg-gray-100 text-gray-700 dark:bg-white/[0.03] dark:text-white/80">{count.to_do}
                </span>
              </h3>
              <div className="relative">
                <button className="dropdown-toggle">
                  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400 hover:text-gray-700 size-6 dark:hover:text-gray-300"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.99915 10.2451C6.96564 10.2451 7.74915 11.0286 7.74915 11.9951V12.0051C7.74915 12.9716 6.96564 13.7551 5.99915 13.7551C5.03265 13.7551 4.24915 12.9716 4.24915 12.0051V11.9951C4.24915 11.0286 5.03265 10.2451 5.99915 10.2451ZM17.9991 10.2451C18.9656 10.2451 19.7491 11.0286 19.7491 11.9951V12.0051C19.7491 12.9716 18.9656 13.7551 17.9991 13.7551C17.0326 13.7551 16.2491 12.9716 16.2491 12.0051V11.9951C16.2491 11.0286 17.0326 10.2451 17.9991 10.2451ZM13.7491 11.9951C13.7491 11.0286 12.9656 10.2451 11.9991 10.2451C11.0326 10.2451 10.2491 11.0286 10.2491 11.9951V12.0051C10.2491 12.9716 11.0326 13.7551 11.9991 13.7551C12.9656 13.7551 13.7491 12.9716 13.7491 12.0051V11.9951Z" fill="currentColor"></path>
                  </svg>
                </button>
              </div>
            </div>
            {todoTasks ? todoTasks.map((item, index) => {
              return <TaskListFlow task={item} key={index} modal={() => {openModal(); setActiveTask(item)}} />
            }) : "no available tasks to do"}
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="flex items-center gap-3 text-base font-medium text-gray-800 capitalize dark:text-white/90">In Progress
                <span className="inline-flex rounded-full px-2 py-0.5 text-theme-xs font-medium bg-gray-100 text-gray-700 dark:bg-white/[0.03] dark:text-white/80">{count.in_progress}
                </span>
              </h3>
              <div className="relative">
                <button className="dropdown-toggle">
                  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400 hover:text-gray-700 size-6 dark:hover:text-gray-300"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.99915 10.2451C6.96564 10.2451 7.74915 11.0286 7.74915 11.9951V12.0051C7.74915 12.9716 6.96564 13.7551 5.99915 13.7551C5.03265 13.7551 4.24915 12.9716 4.24915 12.0051V11.9951C4.24915 11.0286 5.03265 10.2451 5.99915 10.2451ZM17.9991 10.2451C18.9656 10.2451 19.7491 11.0286 19.7491 11.9951V12.0051C19.7491 12.9716 18.9656 13.7551 17.9991 13.7551C17.0326 13.7551 16.2491 12.9716 16.2491 12.0051V11.9951C16.2491 11.0286 17.0326 10.2451 17.9991 10.2451ZM13.7491 11.9951C13.7491 11.0286 12.9656 10.2451 11.9991 10.2451C11.0326 10.2451 10.2491 11.0286 10.2491 11.9951V12.0051C10.2491 12.9716 11.0326 13.7551 11.9991 13.7551C12.9656 13.7551 13.7491 12.9716 13.7491 12.0051V11.9951Z" fill="currentColor"></path>
                  </svg>
                </button>
              </div>
            </div>
            {inProgressTasks ? inProgressTasks.map((item, index) => {
              return <TaskListFlow task={item} key={index} modal={() => {openModal(); setActiveTask(item)}} />
            }) : "no available tasks in progress"}
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="flex items-center gap-3 text-base font-medium text-gray-800 capitalize dark:text-white/90">Completed
                <span className="inline-flex rounded-full px-2 py-0.5 text-theme-xs font-medium bg-gray-100 text-gray-700 dark:bg-white/[0.03] dark:text-white/80">{count.completed}
                </span>
              </h3>
              <div className="relative">
                <button className="dropdown-toggle">
                  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400 hover:text-gray-700 size-6 dark:hover:text-gray-300"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.99915 10.2451C6.96564 10.2451 7.74915 11.0286 7.74915 11.9951V12.0051C7.74915 12.9716 6.96564 13.7551 5.99915 13.7551C5.03265 13.7551 4.24915 12.9716 4.24915 12.0051V11.9951C4.24915 11.0286 5.03265 10.2451 5.99915 10.2451ZM17.9991 10.2451C18.9656 10.2451 19.7491 11.0286 19.7491 11.9951V12.0051C19.7491 12.9716 18.9656 13.7551 17.9991 13.7551C17.0326 13.7551 16.2491 12.9716 16.2491 12.0051V11.9951C16.2491 11.0286 17.0326 10.2451 17.9991 10.2451ZM13.7491 11.9951C13.7491 11.0286 12.9656 10.2451 11.9991 10.2451C11.0326 10.2451 10.2491 11.0286 10.2491 11.9951V12.0051C10.2491 12.9716 11.0326 13.7551 11.9991 13.7551C12.9656 13.7551 13.7491 12.9716 13.7491 12.0051V11.9951Z" fill="currentColor"></path>
                  </svg>
                </button>
              </div>
            </div>
            {completedTasks ? completedTasks.map((item, index) => {
              return <TaskListFlow task={item} key={index} modal={() => {openModal(); setActiveTask(item)}} />
            }) : "no tasks completed"}
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="flex items-center gap-3 text-base font-medium text-gray-800 capitalize dark:text-white/90">Cancelled
                <span className="inline-flex rounded-full px-2 py-0.5 text-theme-xs font-medium bg-gray-100 text-gray-700 dark:bg-white/[0.03] dark:text-white/80">{count.cancelled}
                </span>
              </h3>
              <div className="relative">
                <button className="dropdown-toggle">
                  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400 hover:text-gray-700 size-6 dark:hover:text-gray-300"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.99915 10.2451C6.96564 10.2451 7.74915 11.0286 7.74915 11.9951V12.0051C7.74915 12.9716 6.96564 13.7551 5.99915 13.7551C5.03265 13.7551 4.24915 12.9716 4.24915 12.0051V11.9951C4.24915 11.0286 5.03265 10.2451 5.99915 10.2451ZM17.9991 10.2451C18.9656 10.2451 19.7491 11.0286 19.7491 11.9951V12.0051C19.7491 12.9716 18.9656 13.7551 17.9991 13.7551C17.0326 13.7551 16.2491 12.9716 16.2491 12.0051V11.9951C16.2491 11.0286 17.0326 10.2451 17.9991 10.2451ZM13.7491 11.9951C13.7491 11.0286 12.9656 10.2451 11.9991 10.2451C11.0326 10.2451 10.2491 11.0286 10.2491 11.9951V12.0051C10.2491 12.9716 11.0326 13.7551 11.9991 13.7551C12.9656 13.7551 13.7491 12.9716 13.7491 12.0051V11.9951Z" fill="currentColor"></path>
                  </svg>
                </button>
              </div>
            </div>
            {cancelledTasks ? cancelledTasks.map((item, index) => {
              return <TaskListFlow task={item} key={index} modal={() => {openModal(); setActiveTask(item)}} />
            }) : "no cancelled tasks"}
          </div>
        </div>
      </div>
      <TaskModal isOpen={isOpen} closeModal={closeModal} isEdit={true} task={activeTask} users={users} />
    </>
  );
}

export default TasksList;
