import "animate.css";
import { Input } from "antd";

const ImageInfo = ({ goTo }) => (
  <div
    className={`animate__animated  ${
      goTo === "next" ? "animate__fadeInRight" : "animate__fadeInLeft"
    } `}
  >
    <div className="text-left text-2xl font-semibold mb-4">Image Info:</div>
    <div className="mb-6">
      <label className="block mb-2 font-medium">Product Image</label>
      <Input type="file" className="w-full p-2 border rounded" required />
    </div>
  </div>
);

export default ImageInfo;
