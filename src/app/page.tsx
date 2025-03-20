import ProductPage from "@/app/products/page";
import Sidebar from "@/constant/Sidebar";

export default function Home() {
  return (
    <div className="w-full  flex justify-between">
      <Sidebar />
      <ProductPage />
    </div>
  );
}
