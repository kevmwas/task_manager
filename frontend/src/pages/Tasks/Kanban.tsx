import { useEffect, useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import TaskHeader from "./components/tasks_header";
import { getUsers } from "../../api/users";

const KanBanTasks = () => {
  const [users, setUsers] = useState([]);
  const [isActive, setIsActive] = useState(false);
  

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers();
      const allUsers = users.filter((user: any) => user.role === "user");
      setUsers(allUsers);
    }

    fetchUsers();
  }, []);

  const counts = {
    total: 15,
    to_do: 3,
    in_progress: 3,
    completed: 4,
    cancelled: 5
  }

  return (
    <>
      <PageMeta
        title="TasksList"
        description="List af all user tasks"
      />
      <PageBreadcrumb pageTitle="Tasks list" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="flex flex-col items-center px-4 py-5 xl:px-6 xl:py-6">
          <TaskHeader users={users.length ? users : []} counts={counts} isActive={isActive} />
        </div>
        <div className="grid grid-cols-1 border-t border-gray-200 divide-x divide-gray-200 dark:divide-white/[0.05] mt-7 dark:border-white/[0.05] sm:mt-0 sm:grid-cols-2 xl:grid-cols-3">
          <div className="flex flex-col gap-5 p-4 swim-lane xl:p-6">
            <div className="flex items-center justify-between mb-1">
              <h3 className="flex items-center gap-3 text-base font-medium text-gray-800 dark:text-white/90">To Do
                <span className="inline-flex rounded-full px-2 py-0.5 text-theme-xs font-medium bg-gray-100 text-gray-700 dark:bg-white/[0.03] dark:text-white/80">3</span>
              </h3>
              <div className="relative">
                <button className="dropdown-toggle">
                  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400 hover:text-gray-700 size-6 dark:hover:text-gray-300"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.99915 10.2451C6.96564 10.2451 7.74915 11.0286 7.74915 11.9951V12.0051C7.74915 12.9716 6.96564 13.7551 5.99915 13.7551C5.03265 13.7551 4.24915 12.9716 4.24915 12.0051V11.9951C4.24915 11.0286 5.03265 10.2451 5.99915 10.2451ZM17.9991 10.2451C18.9656 10.2451 19.7491 11.0286 19.7491 11.9951V12.0051C19.7491 12.9716 18.9656 13.7551 17.9991 13.7551C17.0326 13.7551 16.2491 12.9716 16.2491 12.0051V11.9951C16.2491 11.0286 17.0326 10.2451 17.9991 10.2451ZM13.7491 11.9951C13.7491 11.0286 12.9656 10.2451 11.9991 10.2451C11.0326 10.2451 10.2491 11.0286 10.2491 11.9951V12.0051C10.2491 12.9716 11.0326 13.7551 11.9991 13.7551C12.9656 13.7551 13.7491 12.9716 13.7491 12.0051V11.9951Z" fill="currentColor"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div style={{ opacity: "0.8" }} className="relative p-5 bg-white border border-gray-200 task rounded-xl shadow-theme-sm dark:border-gray-800 dark:bg-white/5" draggable="true" data-handler-id="T156">
              <div className="space-y-4">
                <div>
                  <h4 className="mb-5 mr-10 text-base text-gray-800 dark:text-white/90">Finish user onboarding</h4>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-sm text-gray-500 cursor-pointer dark:text-gray-400">
                      <svg className="fill-current" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.33329 1.0835C5.74751 1.0835 6.08329 1.41928 6.08329 1.8335V2.25016L9.91663 2.25016V1.8335C9.91663 1.41928 10.2524 1.0835 10.6666 1.0835C11.0808 1.0835 11.4166 1.41928 11.4166 1.8335V2.25016L12.3333 2.25016C13.2998 2.25016 14.0833 3.03366 14.0833 4.00016V6.00016L14.0833 12.6668C14.0833 13.6333 13.2998 14.4168 12.3333 14.4168L3.66663 14.4168C2.70013 14.4168 1.91663 13.6333 1.91663 12.6668L1.91663 6.00016L1.91663 4.00016C1.91663 3.03366 2.70013 2.25016 3.66663 2.25016L4.58329 2.25016V1.8335C4.58329 1.41928 4.91908 1.0835 5.33329 1.0835ZM5.33329 3.75016L3.66663 3.75016C3.52855 3.75016 3.41663 3.86209 3.41663 4.00016V5.25016L12.5833 5.25016V4.00016C12.5833 3.86209 12.4714 3.75016 12.3333 3.75016L10.6666 3.75016L5.33329 3.75016ZM12.5833 6.75016L3.41663 6.75016L3.41663 12.6668C3.41663 12.8049 3.52855 12.9168 3.66663 12.9168L12.3333 12.9168C12.4714 12.9168 12.5833 12.8049 12.5833 12.6668L12.5833 6.75016Z" fill=""></path>
                      </svg>Tomorrow
                    </span>
                    <span className="flex items-center gap-1 text-sm text-gray-500 cursor-pointer dark:text-gray-400">
                      <svg className="stroke-current" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 15.6343C12.6244 15.6343 15.5625 12.6961 15.5625 9.07178C15.5625 5.44741 12.6244 2.50928 9 2.50928C5.37563 2.50928 2.4375 5.44741 2.4375 9.07178C2.4375 10.884 3.17203 12.5246 4.35961 13.7122L2.4375 15.6343H9Z" stroke="" stroke-width="1.5" stroke-linejoin="round"></path>
                      </svg>1
                    </span>
                  </div>
                  <span className="mt-3 inline-flex rounded-full px-2 py-0.5 text-theme-xs font-medium bg-orange-50 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400">Development
                  </span>
                </div>
              </div>
              <div className="h-6 absolute top-5 right-5 top w-full max-w-6 overflow-hidden rounded-full border-[0.5px] border-gray-200 dark:border-gray-800">
                <img alt="user" src="/images/user/user-01.jpg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default KanBanTasks;
