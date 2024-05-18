import RootLayout from "@/components/layout";
import MultiStepForm from "@/components/multiStepForm";

export default function Home() {
  return <MultiStepForm />;
}

Home.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
