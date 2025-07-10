import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import { useState } from "react";
import { useModal } from "../../hooks/useModal";
import { newUser } from "../../api/users";

interface AddUserProps {
  close: () => void;
}

const AddUser: React.FC<AddUserProps> = ({ close }) => {
    const [showPassword, setShowPassword] = useState(false);

    interface TaskFormValues {
        first_name: string,
        last_name: string,
        email: string,
        phone: string,
        id_no: string,
        role: "user" | "admin",
        bio: string,
        dob: string,
        country: string,
        county: string,
        location: string,
        city: string,
        gender: string,
        profile: File | null,
        password: string,
      }

    const initialValues: TaskFormValues = {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        id_no: "",
        role: "user",
        bio: "",
        dob: "",
        country: "",
        county: "",
        location: "",
        city: "",
        gender: "",
        profile: null as File | null,
        password: "",
    }

    const UserSchema = Yup.object({
        first_name: Yup.string().required("First name is required"),
        last_name: Yup.string().required("Last name is required"),
        email: Yup.string().email("Invalid email address").required("Email is required"),
        phone: Yup.string()
            .matches(/^[0-9]{7,15}$/, "Phone number must be 7-15 digits")
            .required("Phone number is required"),
        id_no: Yup.string(),
        role: Yup.string().oneOf(["user", "admin"]).required("Role is required"),
        bio: Yup.string(),
        dob: Yup.date().nullable(),
        country: Yup.string(),
        county: Yup.string(),
        location: Yup.string(),
        city: Yup.string(),
        gender: Yup.string().oneOf(["male", "female", "other", ""]).notRequired(),
        profile: Yup.mixed().notRequired(),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    });
    
    return (
    <Formik
        initialValues={ initialValues }
        validationSchema= { UserSchema }
        onSubmit={async (values, { setSubmitting, resetForm }) => {
            const data = {
                first_name: values.first_name,
                last_name: values.last_name,
                email: values.email,
                phone: values.phone,
                password: values.password,
                id_no: values.id_no,
                bio: values.bio,
                gender: values.gender,
                dob: values.dob,
                country: values.country,
                county: values.county,
                location: values.location,
                city: values.city,
                role: values.role || "user"
              };

              await newUser(data);
              setSubmitting(false);
              resetForm();
              close();
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, setFieldValue, isSubmitting }) => (
          <Form method="POST">
            <div className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <Label>
                    First Name<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    name="first_name"
                    placeholder="Enter your first name"
                    value={values.first_name}
                    onChange={handleChange}
                  />
                  {touched.first_name && errors.first_name && (
                    <div className="text-error-500 text-xs mt-1">{errors.first_name}</div>
                  )}
                </div>
                <div className="sm:col-span-1">
                  <Label>
                    Last Name<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    name="last_name"
                    placeholder="Enter your last name"
                    value={values.last_name}
                    onChange={handleChange}
                  />
                  {touched.last_name && errors.last_name && (
                    <div className="text-error-500 text-xs mt-1">{errors.last_name}</div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <Label>
                    Email<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={values.email}
                    onChange={handleChange}
                  />
                  {touched.email && errors.email && (
                    <div className="text-error-500 text-xs mt-1">{errors.email}</div>
                  )}
                </div>
                <div className="sm:col-span-1">
                  <Label>
                    Phone Number<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={values.phone}
                    onChange={handleChange}
                  />
                  {touched.phone && errors.phone && (
                    <div className="text-error-500 text-xs mt-1">{errors.phone}</div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <Label>id</Label>
                  <Input
                    type="text"
                    name="id_no"
                    placeholder="Enter your id no"
                    value={values.id_no}
                    onChange={handleChange}
                  />
                  {touched.id_no && errors.id_no && (
                    <div className="text-error-500 text-xs mt-1">{errors.id_no}</div>
                  )}
                </div>
                <div className="sm:col-span-1">
                  <Label>User Role</Label>
                  <select
                    name="role"
                    value={values.role}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                  {touched.role && errors.role && (
                    <div className="text-error-500 text-xs mt-1">{errors.role}</div>
                  )}
                </div>
              </div>
              <div>
                <Label>User Bio</Label>
                <div className="relative">
                  <textarea
                    name="bio"
                    value={values.bio}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs focus:outline-hidden bg-transparent text-gray-900 dark:text-gray-300 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
                  />
                  {touched.bio && errors.bio && (
                    <div className="text-error-500 text-xs mt-1">{errors.bio}</div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <Label>Date of Birth</Label>
                  <Input
                    type="date"
                    name="dob"
                    placeholder="date of birth"
                    value={values.dob}
                    onChange={handleChange}
                  />
                  {touched.dob && errors.dob && (
                    <div className="text-error-500 text-xs mt-1">{errors.dob}</div>
                  )}
                </div>
                <div className="sm:col-span-1">
                  <Label>Country</Label>
                  <Input
                    type="text"
                    name="country"
                    placeholder="your country"
                    value={values.country}
                    onChange={handleChange}
                  />
                  {touched.country && errors.country && (
                    <div className="text-error-500 text-xs mt-1">{errors.country}</div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <Label>County</Label>
                  <Input
                    type="text"
                    name="county"
                    placeholder="Enter your county"
                    value={values.county}
                    onChange={handleChange}
                  />
                  {touched.county && errors.county && (
                    <div className="text-error-500 text-xs mt-1">{errors.county}</div>
                  )}
                </div>
                <div className="sm:col-span-1">
                  <Label>Location</Label>
                  <Input
                    type="text"
                    name="location"
                    placeholder="Enter your phone location"
                    value={values.location}
                    onChange={handleChange}
                  />
                  {touched.location && errors.location && (
                    <div className="text-error-500 text-xs mt-1">{errors.location}</div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <Label>City</Label>
                  <Input
                    type="text"
                    name="city"
                    placeholder="Enter your city"
                    value={values.city}
                    onChange={handleChange}
                  />
                  {touched.city && errors.city && (
                    <div className="text-error-500 text-xs mt-1">{errors.city}</div>
                  )}
                </div>
                <div className="sm:col-span-1">
                  <Label>Gender</Label>
                  <select
                    name="gender"
                    value={values.gender}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {touched.gender && errors.gender && (
                    <div className="text-error-500 text-xs mt-1">{errors.gender}</div>
                  )}
                </div>
              </div>
              <div>
                <Label>Profile picture</Label>
                <Input
                  type="file"
                  name="profile"
                  onChange={event => {
                    if (event.currentTarget.files && event.currentTarget.files[0]) {
                      setFieldValue("profile", event.currentTarget.files[0]);
                    } else {
                      setFieldValue("profile", null);
                    }
                  }}
                />
                {touched.profile && errors.profile && (
                  <div className="text-error-500 text-xs mt-1">{errors.profile as string}</div>
                )}
              </div>
              <div>
                <Label>Password</Label>
                <div className="relative">
                  <Input
                    placeholder="Enter your password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange}
                  />
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
                {touched.password && errors.password && (
                  <div className="text-error-500 text-xs mt-1">{errors.password}</div>
                )}
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400 flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
                >
                  {isSubmitting ? "Adding..." : "Add User"}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    )
}

export default AddUser