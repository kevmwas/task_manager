import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";
import PageMeta from "../../components/common/PageMeta";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="Panga"
        description="Sign in"
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
