import AuthLayout from "./AuthPageLayout";
import SignUpForm from "../../components/auth/SignUpForm";
import PageMeta from "../../components/common/PageMeta";

export default function SignUp() {
  return (
    <>
      <PageMeta
        title="Panga"
        description="Sign up"
      />
      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
    </>
  );
}
