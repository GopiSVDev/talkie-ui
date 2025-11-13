import AuthTabs from '~/components/auth/AuthTabs';

const AuthLayout = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center min-h-screen h-full bg-background gap-5">
      <div className="mt-3">
        <img src="/logo.svg" className="w-[100px] md:w-[120px]" />
      </div>
      <h1 className="text-foreground text-4xl font-bold">Talkie</h1>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-muted-foreground">
          Log in or register to continue
        </h3>
        <p className="text-sm text-muted-foreground/800 mt-2">
          Or try a 24-hour guest account — no registration needed.
        </p>
      </div>

      <AuthTabs />
    </div>
  );
};

export default AuthLayout;
