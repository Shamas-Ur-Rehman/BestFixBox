import React, { useState } from "react";

const BoxFittingChecker = () => {
  const [products, setProducts] = useState([{ name: "", dimensions: "" }]);
  const [boxes, setBoxes] = useState([{ name: "", dimensions: "" }]);
  const [results, setResults] = useState([]);

  // Parse the dimensions from the string (LxWxH) to an array of numbers
  const parseDimensions = (dim) => dim.split("x").map(Number).sort((a, b) => a - b);

  // Handle change in product inputs
  const handleProductChange = (index, field, value) => {
    const newProducts = [...products];
    newProducts[index][field] = value;
    setProducts(newProducts);
  };

  // Handle change in box inputs
  const handleBoxChange = (index, field, value) => {
    const newBoxes = [...boxes];
    newBoxes[index][field] = value;
    setBoxes(newBoxes);
  };

  // Add new product input row
  const addProduct = () => {
    setProducts([...products, { name: "", dimensions: "" }]);
  };

  // Add new box input row
  const addBox = () => {
    setBoxes([...boxes, { name: "", dimensions: "" }]);
  };

  // Check which products fit into which boxes and suggest new dimensions for the best box
  const checkFit = () => {
    const fittingResults = boxes.map((box) => {
      const boxDims = parseDimensions(box.dimensions);
      const fittingProducts = products.filter((product) => {
        const productDims = parseDimensions(product.dimensions);
        return (
          productDims[0] <= boxDims[0] &&
          productDims[1] <= boxDims[1] &&
          productDims[2] <= boxDims[2]
        );
      });

      // Calculate the new dimensions of the box based on the fitting products
      let suggestedDims = [0, 0, 0];
      fittingProducts.forEach((product) => {
        const productDims = parseDimensions(product.dimensions);
        suggestedDims = suggestedDims.map((dim, index) => Math.max(dim, productDims[index]));
      });

      const newBoxDimensions = suggestedDims.join("x");

      return {
        box: box.name,
        fittingProducts: fittingProducts.map((product) => product.name),
        newBoxDimensions: fittingProducts.length > 0 ? newBoxDimensions : "No products fit",
      };
    });

    setResults(fittingResults);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200 p-4">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Box Fitting Checker</h2>

        {/* Products Input Section */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Enter Products</h3>
          {products.map((product, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                placeholder="Product Name"
                value={product.name}
                onChange={(e) => handleProductChange(index, "name", e.target.value)}
                className="w-full p-3 mb-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                placeholder="Dimensions (LxWxH)"
                value={product.dimensions}
                onChange={(e) => handleProductChange(index, "dimensions", e.target.value)}
                className="w-full p-3 mb-2 border border-gray-300 rounded-lg"
              />
            </div>
          ))}
          <button
            onClick={addProduct}
            className="w-full py-3 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 mb-4"
          >
            Add Product
          </button>
        </div>

        {/* Boxes Input Section */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Enter Boxes</h3>
          {boxes.map((box, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                placeholder="Box Name"
                value={box.name}
                onChange={(e) => handleBoxChange(index, "name", e.target.value)}
                className="w-full p-3 mb-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                placeholder="Dimensions (LxWxH)"
                value={box.dimensions}
                onChange={(e) => handleBoxChange(index, "dimensions", e.target.value)}
                className="w-full p-3 mb-2 border border-gray-300 rounded-lg"
              />
            </div>
          ))}
          <button
            onClick={addBox}
            className="w-full py-3 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 mb-4"
          >
            Add Box
          </button>
        </div>

        {/* Check Fit Button */}
        <button
          onClick={checkFit}
          className="w-full py-3 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 mb-4"
        >
          Check Fit
        </button>

        {/* Display Results */}
        {results.length > 0 && (
          <div>
            {results.map((result, index) => (
              <div key={index} className="p-4 mb-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="text-xl font-semibold text-blue-700">{result.box}:</h4>
                <ul className="list-disc ml-5 text-blue-600">
                  {result.fittingProducts.length > 0 ? (
                    result.fittingProducts.map((product, idx) => (
                      <li key={idx}>{product}</li>
                    ))
                  ) : (
                    <li>No products fit in this box</li>
                  )}
                </ul>
                {result.fittingProducts.length > 0 && (
                  <p className="mt-2 text-green-600 font-semibold">
                    Suggested New Box Dimensions: {result.newBoxDimensions}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BoxFittingChecker;
