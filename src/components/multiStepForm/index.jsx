import { steps } from "@/constants/steps";
import React, { useState } from "react";
import { Steps } from "antd";

const MultiStepForm = ({ setGoTo }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = (e) => {
    e.preventDefault();
    setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
  };

  const prevStep = (e) => {
    e.preventDefault();
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
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
    <div className="max-w-[80%] w-full mx-auto bg-white mt-5 p-8 rounded shadow-md">
      <header className="text-3xl font-bold mb-8">Add New Product</header>
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
