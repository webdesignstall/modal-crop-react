import "animate.css";
import TextArea from "antd/es/input/TextArea";

const DescriptionInfo = ({ goTo }) => (
  <div
    className={`animate__animated  ${
      goTo === "next" ? "animate__fadeInRight" : "animate__fadeInLeft"
    } `}
  >
    <div className="text-left text-2xl font-semibold mb-4">
      Description Info:
    </div>
    <div className="mb-6">
      <label className="block mb-2 font-medium">Description</label>
      <TextArea className="w-full p-2 border rounded" required />
    </div>
  </div>
);

export default DescriptionInfo;
