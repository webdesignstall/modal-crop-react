import { Input } from "antd";
import "animate.css";

const ProductInfo = ({ goTo }) => {
  return (
    <div
      className={`animate__animated  ${
        goTo === "next" ? "animate__fadeInRight" : "animate__fadeInLeft"
      } `}
    >
      <div className="text-left text-2xl font-semibold mb-4">Product Info:</div>
      <div className="mb-6">
        <label className="block mb-2 font-medium">Product Name</label>
        <Input type="text" className="w-full p-2 border rounded" required />
      </div>
      <div className="mb-6">
        <label className="block mb-2 font-medium">Category</label>
        <Input type="text" className="w-full p-2 border rounded" required />
      </div>
    </div>
  );
};

export default ProductInfo;
