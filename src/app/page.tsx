import Sidebar from "@/constant/Sidebar";
import ProductPage from "./products/page";

export default function Home() {
  return (
    <div className="w-full">
      <Sidebar />
      <ProductPage />
    </div>
  );
}
