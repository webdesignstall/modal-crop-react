import "animate.css";

const PricingInfo = () => (
  <div className="animate__animated animate__fadeInRight">
    <div className="text-left text-2xl font-semibold mb-4">Pricing Info:</div>
    <div className="mb-6">
      <label className="block mb-2 font-medium">Price</label>
      <input type="number" className="w-full p-2 border rounded" required />
    </div>
    <div className="mb-6">
      <label className="block mb-2 font-medium">Discount</label>
      <input type="number" className="w-full p-2 border rounded" />
    </div>
  </div>
);

export default PricingInfo;
