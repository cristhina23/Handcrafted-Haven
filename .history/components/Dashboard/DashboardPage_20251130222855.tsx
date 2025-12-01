"use client";

import { useUser } from "@clerk/nextjs";
import Header from "./Header";

interface DashboardPageProps {
  collapsed?: boolean;
  setCollapsed?: (value: boolean) => void;
}

export default function DashboardPage({
  collapsed = false,
  setCollapsed = () => {},
}: DashboardPageProps) {
  const { isSignedIn, user } = useUser();

  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(1200);

  if (!isSignedIn) return <div>Please log in</div>;

  return (
    <div>
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        screenSize={screenSize}
        currentColor="#4f46e5"
      />
      <Header collapsed={collapsed} setCollapsed={setCollapsed} />
      Welcome, {user.firstName}! 👋
    </div>
  );
}
