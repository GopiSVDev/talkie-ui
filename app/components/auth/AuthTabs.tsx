import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { useEffect } from "react";
import { motion } from "motion/react";
import { Outlet, useLocation, useNavigate } from "react-router";

function AuthTabs() {
  useEffect(() => {
    localStorage.setItem("vite-ui-theme", "dark");
    document.documentElement.classList.add("dark");
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

  const currentTab = location.pathname.includes("register")
    ? "register"
    : "login";

  const handleTabChange = (value: string) => {
    navigate(`/auth/${value}`);
  };

  return (
    <Tabs
      defaultValue={currentTab}
      onValueChange={handleTabChange}
      className="w-full max-w-[400px] mb-5"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger className="cursor-pointer" value="login">
          Login
        </TabsTrigger>
        <TabsTrigger className="cursor-pointer" value="register">
          Register
        </TabsTrigger>
      </TabsList>

      <motion.div
        key={currentTab}
        initial={{ opacity: 0, x: currentTab === "login" ? -30 : 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: currentTab === "login" ? 30 : -30 }}
        transition={{ duration: 0.3 }}
      >
        <Outlet />
      </motion.div>
    </Tabs>
  );
}

export default AuthTabs;
