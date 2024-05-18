import DescriptionInfo from "@/components/steps/DescriptionInfo";
import ImageInfo from "@/components/steps/ImageInfo";
import PricingInfo from "@/components/steps/PricingInfo";
import ProductInfo from "@/components/steps/ProductInfo";
import StockInfo from "@/components/steps/StockInfo";

export const steps = [
  { title: "Product", content: <ProductInfo /> },
  { title: "Pricing", content: <PricingInfo /> },
  { title: "Stock", content: <StockInfo /> },
  { title: "Description", content: <DescriptionInfo /> },
  { title: "Image", content: <ImageInfo /> },
];
