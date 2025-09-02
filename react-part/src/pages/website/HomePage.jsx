import { useState, useEffect } from "react";
import HeroSection from "../../component/Website/HeroSection";
import ProductSection from "../../component/Website/ProductSection";
import PromotionBanner from "../../component/Website/PromotionBanner";
import {
  getLatestsProducts,
  getLatestsSaleProducts,
  getTopRatedProducts,
} from "../../apis/ProductsApis";
import WebsiteLoading from "../../component/Website/WebsiteLoading";

export default function HomePage() {
  const [latestsSaleProducts, setLatestsSaleProducts] = useState([]);
  const [topRatedProducts, setTopRatedProducts] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  //get Latests Sale Products
  useEffect(() => {
    setLoading(true);
    getLatestsSaleProducts()
      .then((res) => {
        console.log("Latests Sale Products res", res);
        setLatestsSaleProducts(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  // get top rated products
  useEffect(() => {
    setLoading(true);

    getTopRatedProducts()
      .then((res) => {
        console.log("top rated products res", res);
        setTopRatedProducts(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  // get latest products
  useEffect(() => {
    setLoading(true);
    getLatestsProducts()
      .then((res) => {
        console.log("latest products res", res);
        setLatestProducts(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {loading ? (
        <WebsiteLoading />
      ) : (
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
          <ProductSection
            title="Latest Products"
            productData={latestProducts}
          />
        </>
      )}
    </>
  );
}
