import "animate.css";

const DescriptionInfo = () => (
  <div className="animate__animated animate__fadeInRight">
    <div className="text-left text-2xl font-semibold mb-4">
      Description Info:
    </div>
    <div className="mb-6">
      <label className="block mb-2 font-medium">Description</label>
      <textarea className="w-full p-2 border rounded" required></textarea>
    </div>
  </div>
);

export default DescriptionInfo;
