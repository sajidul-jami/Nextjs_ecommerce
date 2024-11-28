import Image from "next/image";
import Categoriesslideber from "./components/Categoriesslideber.js";
import Limitedtimeoffer from "./components/Limitedtimeoffer.js";
import Allproducts from "./components/Allproducts.js";
import Footer from "./components/Footer.js";

export default function Home() {
  return (
    <div>
      <Categoriesslideber />
      <Limitedtimeoffer />
      <Allproducts />
    </div>
  );
}
