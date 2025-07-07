import { useEffect, useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";
import { Modal } from "../../components/ui/modal";
import { useModal } from "../../hooks/useModal";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import { getUsers, newUser } from "../../api/users";

const Users = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const [showPassword, setShowPassword] = useState(false);
  const [users, setUsers] = useState([]);
  
  const addUser = async (event: any) => {
    event.preventDefault();

    await newUser(event)
  }

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers();
      setUsers(users);
    }

    fetchUsers();
  }, []);

console.log(users)
  return (
    <>
      <PageMeta
        title="Users"
        description="App Users"
      />
      <PageBreadcrumb pageTitle="Users" />
      <div className="space-y-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="flex flex-col items-center px-4 py-5 xl:px-6 xl:py-6">
          <div className="flex flex-col w-full gap-5 sm:justify-between xl:flex-row xl:items-center">
            <div className="grid grid-cols-2 sm:grid-cols-4 items-center gap-x-1 gap-y-2 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-900">
              <button className="inline-flex items-center xl:justify-start justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md group hover:text-gray-900 dark:hover:text-white text-gray-900 dark:text-white bg-white dark:bg-gray-800">Userss
              </button>
              <button className="inline-flex items-center xl:justify-start justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md group hover:text-gray-900 dark:hover:text-white text-gray-500 dark:text-gray-400">Admins
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
            <BasicTableOne />
          </div>
        </div>
      </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] p-6 lg:p-10">
        <form method="POST" onSubmit={addUser}>
          <div className="space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <Label>First Name<span className="text-error-500">*</span></Label>
                <Input type="text" name="first_name" placeholder="Enter your first name" />
              </div>
              <div className="sm:col-span-1">
                <Label>Last Name<span className="text-error-500">*</span></Label>
                <Input type="text" name="last_name" placeholder="Enter your last name" />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <Label>Email<span className="text-error-500">*</span></Label>
                <Input type="email"name="email" placeholder="Enter your email" />
              </div>
              <div className="sm:col-span-1">
                <Label>Phone Number<span className="text-error-500">*</span></Label>
                <Input type="number" name="phone" placeholder="Enter your phone number" />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <Label>id</Label>
                <Input type="text" name="id_no" placeholder="Enter your id no" />
              </div>
              <div className="sm:col-span-1">
                <Label>User Role</Label>
                <select name="role" className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800">
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
              </div>
            </div>
            <div>
              <Label>User Bio</Label>
              <div className="relative">
                <textarea className="w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs focus:outline-hidden bg-transparent text-gray-900 dark:text-gray-300 text-gray-900 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"></textarea>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <Label>Date of Birth</Label>
                <Input type="date"name="dob" placeholder="date of birth" />
              </div>
              <div className="sm:col-span-1">
                <Label>Country</Label>
                <Input type="text" name="country" placeholder="your country" />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <Label>County</Label>
                <Input type="text"name="county" placeholder="Enter your county" />
              </div>
              <div className="sm:col-span-1">
                <Label>Location</Label>
                <Input type="text" name="location" placeholder="Enter your phone location" />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <Label>City</Label>
                <Input type="text" name="city" placeholder="Enter your city" />
              </div>
              <div className="sm:col-span-1">
                <Label>Gender</Label>
                <select name="gender" className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div>
                <Label>Profile picture</Label>
                <Input type="file" name="profile" />
            </div>
            <div>
              <Label>Password</Label>
              <div className="relative">
                <Input placeholder="Enter your password" name="password" type={showPassword ? "text" : "password"} />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                >
                  {showPassword ? (
                    <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                  ) : (
                    <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                  )}
                </span>
              </div>
            </div>
            <div>
              <button className="disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400 flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600">
                Add User
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default Users;
