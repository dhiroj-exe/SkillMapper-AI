import { PageAnimationWrapper } from "@/components/page-animation-wrapper";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <PageAnimationWrapper>
      <div className="container flex h-[calc(100vh-8rem)] items-center justify-center py-12">
        <div className="mx-auto w-full max-w-sm">
          <div className="text-center mb-8">
            <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
              Welcome Back
            </h1>
            <p className="mt-2 text-muted-foreground">
              Sign in to access your personalized career dashboard.
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </PageAnimationWrapper>
  );
}
