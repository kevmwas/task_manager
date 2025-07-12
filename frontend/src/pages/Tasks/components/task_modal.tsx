import { ErrorMessage, Form, Formik, FormikHelpers } from "formik";
import { Modal } from "../../../components/ui/modal";
import Label from "../../../components/form/Label";
import * as Yup from "yup";
import { newTask, updateTask } from "../../../api/tasks";
import Input from "../../../components/form/input/InputField";


interface TaskModalProps {
  isOpen: boolean;
  closeModal: () => void;
  isEdit: boolean;
  task: any;
  users: any;
}

const TaskModal = ({ isOpen, closeModal, isEdit, task, users }: TaskModalProps) => {

    const userDataString = localStorage.getItem("user_data");
    const userData = userDataString ? JSON.parse(userDataString) : {};
  
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
      title: isEdit && task ? task.title || "" : "",
      due_date: isEdit && task ? (task.due_date || new Date().toISOString().split('T')[0]) : new Date().toISOString().split('T')[0],
      description: isEdit && task ? task.description || "" : "",
      status: isEdit && task ? task.status || "TODO" : "TODO",
      priority: isEdit && task ? task.priority || "LOW" : "LOW",
      assigned_to: userData.role === "admin" 
        ? (isEdit && task ? (task.assigned_to?.id?.toString() || "") : "") 
        : undefined,
      attachment: null,
    };
    
    return (
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

            if(isEdit) {
                await updateTask(data, task.id)
            } else {
                await newTask(data);
            }

            setSubmitting(false);
            resetForm();
            closeModal();
          }}
        >
          {({ values, handleChange, handleBlur, setFieldValue, isSubmitting }) => (
            <Form>
              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <Label>Title<span className="text-error-500">*</span></Label>
                    <Input
                      type="text"
                      name="title"
                      placeholder="Task title"
                      value={values.title}
                      onChange={handleChange}
                    />
                    <ErrorMessage name="title" component="div" className="text-error-500 text-xs mt-1" />
                  </div>
                  <div className="sm:col-span-1">
                    <Label> Due Date<span className="text-error-500">*</span></Label>
                    <Input
                      type="date"
                      name="due_date"
                      placeholder="task due date"
                      value={values.due_date}
                      onChange={handleChange}
                    />
                    <ErrorMessage name="due_date" component="div" className="text-error-500 text-xs mt-1"/>
                  </div>
                </div>
                <div>
                  <Label>Task Description</Label>
                  <div className="relative">
                    <textarea
                      name="description"
                      className="w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs focus:outline-hidden bg-transparent text-gray-900 dark:text-gray-300 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage name="description" component="div" className="text-error-500 text-xs mt-1"/>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <Label>Task Status</Label>
                    <select
                      name="status"
                      className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                      value={values.status}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="TODO">To Do</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="COMPLETED">Completed</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>
                    <ErrorMessage
                      name="status"
                      component="div"
                      className="text-error-500 text-xs mt-1"
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <Label>Task Priority</Label>
                    <select
                      name="priority"
                      className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                      value={values.priority}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="LOW">Low</option>
                      <option value="MEDIUM">Medium</option>
                      <option value="HIGH">High</option>
                      <option value="CRITICAL">Critical</option>
                    </select>
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
                      <select
                        name="assigned_to"
                        className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                        value={values.assigned_to}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value="">Select user</option>
                        {users && users.map(
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
                      </select>
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
                    {isSubmitting
                      ? isEdit ? "Updating..." : "Adding..."
                      : isEdit ? "Update Task" : "Add Task"}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    )
}

export default TaskModal