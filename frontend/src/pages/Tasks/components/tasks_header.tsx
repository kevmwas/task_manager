import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import { Modal } from "../../../components/ui/modal";
import { useModal } from "../../../hooks/useModal";
import { newTask } from "../../../api/tasks";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import type { FormikHelpers } from "formik";

const TaskHeader = ({ users, counts, isActive }) => {
  const { isOpen, openModal, closeModal } = useModal();

  const userData = JSON.parse(localStorage.getItem("user_data"));

  interface TaskFormValues {
    title: string;
    due_date: string;
    description: string;
    status: "TODO" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
    priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
    assigned_to?: string;
    attachment?: File | null;
  }

  const TaskSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    due_date: Yup.string().required("Due date is required"),
    description: Yup.string(),
    status: Yup.mixed<"TODO" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED">()
      .oneOf(["TODO", "IN_PROGRESS", "COMPLETED", "CANCELLED"])
      .required("Status is required"),
    priority: Yup.mixed<"LOW" | "MEDIUM" | "HIGH" | "CRITICAL">()
      .oneOf(["LOW", "MEDIUM", "HIGH", "CRITICAL"])
      .required("Priority is required"),
    assigned_to: userData.role === "admin"
      ? Yup.string().required("Assigned To is required")
      : Yup.string().notRequired(),
    attachment: Yup.mixed<File>().notRequired(),
  });

  const initialValues: TaskFormValues = {
    title: "",
    due_date: new Date().toISOString().split('T')[0],
    description: "",
    status: "TODO",
    priority: "LOW",
    assigned_to: userData.role === "admin" ? "" : undefined,
    attachment: null,
  };

  return (
    <div className="flex flex-col w-full gap-4 sm:justify-between xl:flex-row xl:items-center">
      <div className="grid grid-cols-2 sm:grid-cols-5 items-center gap-x-1 gap-y-2 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-900">
        <button onClick={() => {}} className={`inline-flex items-center xl:justify-start justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md group hover:text-gray-900 dark:hover:text-white ${!isActive ? "text-gray-900 dark:text-white bg-white dark:bg-gray-800" : "dark:text-gray-400"}`}>All Tasks
          <span className="inline-flex rounded-full px-2 py-0.5 text-xs font-medium leading-normal group-hover:bg-brand-50 group-hover:text-brand-500 dark:group-hover:bg-brand-500/15 dark:group-hover:text-brand-400 text-brand-500 dark:text-brand-400 bg-brand-50 dark:bg-brand-500/15">
            {counts.in_progress + counts.completed + counts.to_do + counts.cancelled}
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
        <Formik initialValues={initialValues} validationSchema={TaskSchema} onSubmit={async ( values: TaskFormValues, { setSubmitting, resetForm }: FormikHelpers<TaskFormValues>) => {
            const data: any = {
              title: values.title,
              description: values.description,
              status: values.status,
              priority: values.priority,
              dueDate: values.due_date,
            };

            if (userData.role === "admin") {
              data.assignedTo = { id: Number(values.assigned_to) };
            }

            await newTask(data);
            setSubmitting(false);
            resetForm();
            closeModal();
          }}
        >
          {({ setFieldValue, isSubmitting }) => (
            <Form>
              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <Label>Title<span className="text-error-500">*</span></Label>
                    <Field as={Input} type="text" name="title" placeholder="Task title" />
                    <ErrorMessage name="title" component="div" className="text-error-500 text-xs mt-1" />
                  </div>
                  <div className="sm:col-span-1">
                    <Label> Due Date<span className="text-error-500">*</span></Label>
                    <Field as={Input} type="date" name="due_date" placeholder="task due date" />
                    <ErrorMessage name="due_date" component="div" className="text-error-500 text-xs mt-1"/>
                  </div>
                </div>
                <div>
                  <Label>Task Description</Label>
                  <div className="relative">
                    <Field as="textarea" name="description" className="w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs focus:outline-hidden bg-transparent text-gray-900 dark:text-gray-300 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800" />
                    <ErrorMessage name="description" component="div"className="text-error-500 text-xs mt-1"/>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <Label>Task Status</Label>
                    <Field
                      as="select"
                      name="status"
                      className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    >
                      <option value="TODO">To Do</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="COMPLETED">Completed</option>
                      <option value="CANCELLED">Cancelled</option>
                    </Field>
                    <ErrorMessage
                      name="status"
                      component="div"
                      className="text-error-500 text-xs mt-1"
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <Label>Task Priority</Label>
                    <Field
                      as="select"
                      name="priority"
                      className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    >
                      <option value="LOW">Low</option>
                      <option value="MEDIUM">Medium</option>
                      <option value="HIGH">High</option>
                      <option value="CRITICAL">Critical</option>
                    </Field>
                    <ErrorMessage
                      name="priority"
                      component="div"
                      className="text-error-500 text-xs mt-1"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {userData.role === "admin" ? (
                    <div className="sm:col-span-1">
                      <Label>
                        Assigned To<span className="text-error-500">*</span>
                      </Label>
                      <Field
                        as="select"
                        name="assigned_to"
                        className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                      >
                        <option value="">Select user</option>
                        {users.map(
                          (
                            item: {
                              id: string;
                              first_name: string;
                              last_name: string;
                            },
                            index: number
                          ) => (
                            <option key={index} value={item.id}>
                              {item.first_name} {item.last_name}
                            </option>
                          )
                        )}
                      </Field>
                      <ErrorMessage
                        name="assigned_to"
                        component="div"
                        className="text-error-500 text-xs mt-1"
                      />
                    </div>
                  ) : null}
                  <div className="sm:col-span-1">
                    <Label>Task attachment</Label>
                    <input
                      type="file"
                      name="attachment"
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        if (event.currentTarget.files && event.currentTarget.files[0]) {
                          setFieldValue("attachment", event.currentTarget.files[0]);
                        } else {
                          setFieldValue("attachment", null);
                        }
                      }}
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    />
                    <ErrorMessage
                      name="attachment"
                      component="div"
                      className="text-error-500 text-xs mt-1"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400 flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
                  >
                    {isSubmitting ? "Adding..." : "Add Task"}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  )
}

export default TaskHeader;
