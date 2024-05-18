import "animate.css";

const StockInfo = () => (
  <div className="animate__animated animate__fadeInRight">
    <div className="text-left text-2xl font-semibold mb-4 ">Stock Info:</div>
    <div className="mb-6">
      <label className="block mb-2 font-medium">Stock Quantity</label>
      <input type="number" className="w-full p-2 border rounded" required />
    </div>
    <div className="mb-6">
      <label className="block mb-2 font-medium">SKU</label>
      <input type="text" className="w-full p-2 border rounded" required />
    </div>
  </div>
);

export default StockInfo;
