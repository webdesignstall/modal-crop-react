import React, { useState } from "react";
import { Steps } from "antd";
import ProductInfo from "../steps/ProductInfo";
import PricingInfo from "../steps/PricingInfo";
import StockInfo from "../steps/StockInfo";
import DescriptionInfo from "../steps/DescriptionInfo";
import ImageInfo from "../steps/ImageInfo";

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [goTo, setGoTo] = useState("next");

  const steps = [
    { title: "Product", content: <ProductInfo goTo={goTo} /> },
    { title: "Pricing", content: <PricingInfo goTo={goTo} /> },
    { title: "Stock", content: <StockInfo goTo={goTo} /> },
    { title: "Description", content: <DescriptionInfo goTo={goTo} /> },
    { title: "Image", content: <ImageInfo goTo={goTo} /> },
  ];

  const nextStep = (e) => {
    e.preventDefault();
    setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    setGoTo("next");
  };

  const prevStep = (e) => {
    e.preventDefault();
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
    setGoTo("prev");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Product Successfully Added");
    setCurrentStep(0);
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <div className="w-full mx-auto bg-white p-5 rounded overflow-hidden">
      <Steps current={currentStep} items={items} />
      <form className="my-5">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`${currentStep === index ? "block" : "hidden"}`}
          >
            {step.content}
            <div className="flex justify-between mt-6">
              {index > 0 && (
                <button
                  className="bg-gray-500 text-white py-2 px-6 rounded"
                  onClick={prevStep}
                >
                  Previous
                </button>
              )}
              {index < steps.length - 1 && (
                <button
                  className="bg-blue-500 text-white py-2 px-10 rounded"
                  onClick={nextStep}
                >
                  Next
                </button>
              )}
              {index === steps.length - 1 && (
                <button
                  className="bg-green-500 text-white py-2 px-4 rounded"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        ))}
      </form>
    </div>
  );
};

export default MultiStepForm;
