import React from "react";
import Pricing from "@/components/pricing";
import pricingData from "@/components/pricing/pricingData.json";
import ".././minimal.css";
import PricingTopContent from "@/components/pricing/PricingTopContent";
import { getPaymentProducts } from "@/utils/api/payment";
const Page = async () => {
  const products = await getPaymentProducts();
  return (
    <section className=" min-h-screen mx-auto  lg:py-[180px] pt-[90px] pb-[50px] px-[12px] ">
      <PricingTopContent />
      {products.data && <Pricing products={products.data} />}
    </section>
  );
};

export default Page;
