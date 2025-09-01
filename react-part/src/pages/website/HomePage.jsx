import { useState, useEffect } from "react";
import HeroSection from "../../component/Website/HeroSection";
import ProductSection from "../../component/Website/ProductSection";
import PromotionBanner from "../../component/Website/PromotionBanner";
import {
  getLatestsProducts,
  getLatestsSaleProducts,
  getTopRatedProducts,
} from "../../apis/ProductsApis";

export default function HomePage() {
  const [latestsSaleProducts, setLatestsSaleProducts] = useState([]);
  const [topRatedProducts, setTopRatedProducts] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);

  //get Latests Sale Products
  useEffect(() => {
    getLatestsSaleProducts().then((res) => {
      console.log("Latests Sale Products res", res);
      setLatestsSaleProducts(res.data);
    });
  }, []);

  // get top rated products
  useEffect(() => {
    getTopRatedProducts().then((res) => {
      console.log("top rated products res", res);
      setTopRatedProducts(res.data);
    });
  }, []);

  // get latest products
  useEffect(() => {
    getLatestsProducts().then((res) => {
      console.log("latest products res", res);
      setLatestProducts(res.data);
    });
  }, []);

  return (
    <>
      <HeroSection />
      <ProductSection
        title="Day of the deal"
        productData={latestsSaleProducts}
      />
      <PromotionBanner />
      <ProductSection
        title="Top Rated Products"
        productData={topRatedProducts}
      />
      <ProductSection title="Latest Products" productData={latestProducts} />
    </>
  );
}
