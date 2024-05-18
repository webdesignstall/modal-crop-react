import "animate.css";
import { Input } from "antd";

const StockInfo = ({ goTo }) => (
  <div
    className={`animate__animated  ${
      goTo === "next" ? "animate__fadeInRight" : "animate__fadeInLeft"
    } `}
  >
    <div className="text-left text-2xl font-semibold mb-4 ">Stock Info:</div>
    <div className="mb-6">
      <label className="block mb-2 font-medium">Stock Quantity</label>
      <Input type="number" className="w-full p-2 border rounded" required />
    </div>
    <div className="mb-6">
      <label className="block mb-2 font-medium">SKU</label>
      <Input type="text" className="w-full p-2 border rounded" required />
    </div>
  </div>
);

export default StockInfo;
