import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import { Modal } from "../../../components/ui/modal";
import { useModal } from "../../../hooks/useModal";

const TaskHeader = ({ users, counts, isActive }) => {
  const { isOpen, openModal, closeModal } = useModal();

  const addtask = (event: any) => {

  }

  const userData = JSON.parse(localStorage.getItem("user_data"));

  return (
    <div className="flex flex-col w-full gap-4 sm:justify-between xl:flex-row xl:items-center">
      <div className="grid grid-cols-2 sm:grid-cols-5 items-center gap-x-1 gap-y-2 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-900">
        <button onClick={() => {}} className={`inline-flex items-center xl:justify-start justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md group hover:text-gray-900 dark:hover:text-white ${!isActive ? "text-gray-900 dark:text-white bg-white dark:bg-gray-800" : "dark:text-gray-400"}`}>All Tasks
          <span className="inline-flex rounded-full px-2 py-0.5 text-xs font-medium leading-normal group-hover:bg-brand-50 group-hover:text-brand-500 dark:group-hover:bg-brand-500/15 dark:group-hover:text-brand-400 text-brand-500 dark:text-brand-400 bg-brand-50 dark:bg-brand-500/15">{counts.total}
          </span>
        </button>
        <button onClick={() => {}} className={`inline-flex items-center xl:justify-start justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md group hover:text-gray-900 dark:hover:text-white ${isActive ? "text-gray-900 dark:text-white bg-white dark:bg-gray-800" : "dark:text-gray-400"}`}>To do
          <span className="inline-flex rounded-full px-2 py-0.5 text-xs font-medium leading-normal group-hover:bg-brand-50 group-hover:text-brand-500 dark:group-hover:bg-brand-500/15 dark:group-hover:text-brand-400 bg-white dark:bg-white/[0.03]">{counts.to_do}
          </span>
        </button>
        <button onClick={() => {}} className={`inline-flex items-center xl:justify-start justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md group hover:text-gray-900 dark:hover:text-white ${isActive ? "text-gray-900 dark:text-white bg-white dark:bg-gray-800" : "dark:text-gray-400"}`}>In Progress
          <span className="inline-flex rounded-full px-2 py-0.5 text-xs font-medium leading-normal group-hover:bg-brand-50 group-hover:text-brand-500 dark:group-hover:bg-brand-500/15 dark:group-hover:text-brand-400 bg-white dark:bg-white/[0.03]">{counts.in_progress}
          </span>
        </button>
        <button onClick={() => {}} className={`inline-flex items-center xl:justify-start justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md group hover:text-gray-900 dark:hover:text-white ${isActive ? "text-gray-900 dark:text-white bg-white dark:bg-gray-800" : "dark:text-gray-400"}`}>Completed
          <span className="inline-flex rounded-full px-2 py-0.5 text-xs font-medium leading-normal group-hover:bg-brand-50 group-hover:text-brand-500 dark:group-hover:bg-brand-500/15 dark:group-hover:text-brand-400 bg-white dark:bg-white/[0.03]">{counts.completed}
          </span>
        </button>
        <button onClick={() => {}} className={`inline-flex items-center xl:justify-start justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md group hover:text-gray-900 dark:hover:text-white ${isActive ? "text-gray-900 dark:text-white bg-white dark:bg-gray-800" : "dark:text-gray-400"}`}>Cancelled
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
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] p-6 lg:p-10">
        <form method="POST" onSubmit={addtask}>
          <div className="space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <Label>Title<span className="text-error-500">*</span></Label>
                <Input type="text" name="title" placeholder="Task title" />
              </div>
              <div className="sm:col-span-1">
                <Label>Due Date<span className="text-error-500">*</span></Label>
                <Input type="date" name="due_date" placeholder="task due date" />
              </div>
            </div>
            <div>
              <Label>Task Description</Label>
              <div className="relative">
                <textarea name="description" className="w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs focus:outline-hidden bg-transparent text-gray-900 dark:text-gray-300 text-gray-900 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"></textarea>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <Label>Task Status</Label>
                <select required name="status" className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800">
                  <option value="TODO">To Do</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>
              <div className="sm:col-span-1">
                <Label>Task Priority</Label>
                <select required name="priority" className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800">
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>    
                  <option value="CRITICAL">Critical</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {userData.role === "admin" ? 
                <div className="sm:col-span-1"> 
                  <Label>Assigned To<span className="text-error-500">*</span></Label>
                  <select required name="assigned_to" className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800">
                    {users.map((item: any, index: any) => {
                      return <option key={index} value={item.id}>{item.first_name} {item.last_name}</option>
                    })}
                  </select>
                </div> : ""
              }
              <div className="sm:col-span-1">
                <Label>Task attachment</Label>
                <Input type="file" name="attachment" placeholder="select attachment" />
              </div>
            </div>
            <div>
              <button className="disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400 flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600">
                Add Task
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default TaskHeader;
