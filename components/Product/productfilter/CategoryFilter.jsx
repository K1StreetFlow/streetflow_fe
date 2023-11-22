import React, { useState } from 'react';

const CategoryFilter = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((item) => item !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleColorChange = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((item) => item !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const handleSizeChange = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((item) => item !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  return (
    <div className="mt-6 shadow-lg w-full h-auto p-10">
      <h2 className="text-4xl text-black-2 font-semibold mb-4">Category</h2>

      {/* Categories */}
      <div className="mb-4 text-black-2" >
        <h3 className="text-lg font-semibold mb-2">Clothing Items</h3>
        <label className="block text-base">
          <input
            type="checkbox"
            checked={selectedCategories.includes('baju')}
            onChange={() => handleCategoryChange('baju')}
            className="mr-2 h-6 w-6"
          />
          Baju
        </label>
        <label className="block text-base">
          <input
            type="checkbox"
            checked={selectedCategories.includes('celana')}
            onChange={() => handleCategoryChange('celana')}
            className="mr-2 h-6 w-6"
          />
          Celana
        </label>
        <label className="block text-base">
          <input
            type="checkbox"
            checked={selectedCategories.includes('jaket')}
            onChange={() => handleCategoryChange('jaket')}
            className="mr-2 h-6 w-6"
          />
          Jaket
        </label>
      </div>

      {/* Colors */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Colors</h3>
        <label className="block text-base">
          <input
            type="checkbox"
            checked={selectedColors.includes('Blue')}
            onChange={() => handleColorChange('Blue')}
            className="mr-2 h-6 w-6"
          />
          Blue
        </label>
        <label className="block text-base">
          <input
            type="checkbox"
            checked={selectedColors.includes('Black')}
            onChange={() => handleColorChange('Black')}
            className="mr-2 h-6 w-6"
          />
          Black
        </label>
        <label className="block text-base">
          <input
            type="checkbox"
            checked={selectedColors.includes('Gray')}
            onChange={() => handleColorChange('Gray')}
            className="mr-2 h-6 w-6"
          />
          Gray
        </label>
      </div>

      {/* Sizes */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Sizes</h3>
        <label className="block text-base">
          <input
            type="checkbox"
            checked={selectedSizes.includes('L')}
            onChange={() => handleSizeChange('L')}
            className="mr-2 h-6 w-6"
          />
          L
        </label>
        <label className="block text-base">
          <input
            type="checkbox"
            checked={selectedSizes.includes('S')}
            onChange={() => handleSizeChange('S')}
            className="mr-2 h-6 w-6"
          />
          S
        </label>
        <label className="block text-base">
          <input
            type="checkbox"
            checked={selectedSizes.includes('M')}
            onChange={() => handleSizeChange('M')}
            className="mr-2 h-6 w-6"
          />
          M
        </label>
        <label className="block text-base">
          <input
            type="checkbox"
            checked={selectedSizes.includes('XL')}
            onChange={() => handleSizeChange('XL')}
            className="mr-2 h-6 w-6"
          />
          XL
        </label>
      </div>
    </div>
  );
};

export default CategoryFilter;
