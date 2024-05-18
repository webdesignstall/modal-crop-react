import RootLayout from "@/components/layout";
import MultiStepForm from "@/components/multiStepForm";
import React from "react";

const Form = () => {
  return <MultiStepForm />;
};

export default Form;

Form.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
