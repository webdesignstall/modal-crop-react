const ProductInfo = () => {
  return (
    <div className="">
      <div className="text-left text-2xl font-semibold mb-4">Product Info:</div>
      <div className="mb-6">
        <label className="block mb-2 font-medium">Product Name</label>
        <input type="text" className="w-full p-2 border rounded" required />
      </div>
      <div className="mb-6">
        <label className="block mb-2 font-medium">Category</label>
        <input type="text" className="w-full p-2 border rounded" required />
      </div>
    </div>
  );
};

export default ProductInfo;
