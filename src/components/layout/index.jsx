import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";

const RootLayout = ({ children }) => {
  return (
    <div className="max-w-[1920px] w-full mx-auto">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default RootLayout;
