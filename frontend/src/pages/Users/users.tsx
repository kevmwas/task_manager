import { useEffect, useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import UsersTable from "./components/users_table";
import { Modal } from "../../components/ui/modal";
import { useModal } from "../../hooks/useModal";
import { fetchUsers } from "../../api/users";
import Skeleton from "../../components/ui/skeleton";
import AddUser from "./components/add_user";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../hooks/store";

type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: null;
  phone: string;
  id_no: string | null;
  bio: string | null;
  gender: string | null;
  dob: string | null;
  country: string | null;
  county: string | null;
  location: string | null;
  city: string | null;
  otp_code: string | null;
  otp_expiration: string | null;
  is_active: boolean;
  profile: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

const Users = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const [isAdmin, setIsAdmin] = useState(false);
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.value);

  useEffect(() => {
    dispatch(fetchUsers() as any);
  }, [dispatch]);


  const allUsers = Array.isArray(users) && users.length > 0
    ? (users as User[]).filter((user) => user.role === "user")
    : [];
  const allAdmins = Array.isArray(users) && users.length > 0
    ? (users as User[]).filter((user) => user.role === "admin")
    : [];

  return (
    <>
      <PageMeta
        title="Users"
        description="App Users"
      />
      <PageBreadcrumb pageTitle={isAdmin ? "Admins" : "Users"} />
      <div className="space-y-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="flex flex-col items-center px-4 py-5 xl:px-6 xl:py-6">
          <div className="flex flex-col w-full gap-5 sm:justify-between xl:flex-row xl:items-center">
            <div className="grid grid-cols-2 sm:grid-cols-4 items-center gap-x-1 gap-y-2 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-900">
              <button onClick={() => setIsAdmin(false)} className={`inline-flex items-center xl:justify-start justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md group hover:text-gray-900 dark:hover:text-white text-gray-900 ${!isAdmin ? "dark:text-white bg-white dark:bg-gray-800" : "dark:text-gray-400"}`}>Users
              </button>
              <button onClick={() => setIsAdmin(true)} className={`inline-flex items-center xl:justify-start justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md group hover:text-gray-900 dark:hover:text-white text-gray-500 ${isAdmin ? "dark:text-white bg-white dark:bg-gray-800" : "dark:text-gray-400"}`}>Admins
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-3 xl:justify-end">
              <button onClick={() => { openModal()}} className="inline-flex items-center justify-center gap-2 rounded-lg transition  px-4 py-3 text-sm bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 ">Add New User
                <svg className="fill-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.2502 4.99951C9.2502 4.5853 9.58599 4.24951 10.0002 4.24951C10.4144 4.24951 10.7502 4.5853 10.7502 4.99951V9.24971H15.0006C15.4148 9.24971 15.7506 9.5855 15.7506 9.99971C15.7506 10.4139 15.4148 10.7497 15.0006 10.7497H10.7502V15.0001C10.7502 15.4143 10.4144 15.7501 10.0002 15.7501C9.58599 15.7501 9.2502 15.4143 9.2502 15.0001V10.7497H5C4.58579 10.7497 4.25 10.4139 4.25 9.99971C4.25 9.5855 4.58579 9.24971 5 9.24971H9.2502V4.99951Z" fill=""></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="p-4 space-y-8 border-t border-gray-200 mt-7 dark:border-gray-800 sm:mt-0 xl:p-6">
          <div>
            {users && users.length ? isAdmin ? <UsersTable data={allAdmins} /> : <UsersTable data={allUsers} /> : <Skeleton />}
          </div>
        </div>
      </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] p-6 lg:p-10">
        <AddUser close={closeModal} user={{}} isEdit={false} />
      </Modal>
    </>
  );
}

export default Users;
