// components/Sidebar/Sidebar.tsx
import { getCategories } from "@/lib/getCategories";
import SidebarClient from "./SidebarClient";

export default async function Sidebar() {
  const categories = await getCategories();

  // Pasamos los datos al Client Component
  return <SidebarClient categories={categories} />;
}
