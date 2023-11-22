import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { getProductById } from '@/app/dashboard/products/api/ProductApi';

interface EditProductModalProps {
  onClose: () => void;
  onEditProduct: (id: number, updatedProduct: any) => Promise<void>;
  productId: number;
}

const EditProductModal: React.FC<EditProductModalProps> = ({ onClose, onEditProduct, productId }) => {
  const [formData, setFormData] = useState({
    name_product: '',
    description_product: '',
    price_product: 0,
    stock_product: 0,
    size_product: 'S',
    colour_product: 'Black',
    id_category_product: 0,
    id_photo_product: 0,
    slug_product: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProductById(productId);
        const productData = response.data;

        if (response.status === 200) {
          setFormData(productData);
        } else {
          console.error('Error fetching product data:', productData.message);
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchData();
  }, [productId]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await onEditProduct(productId, formData);
      onClose();
    } catch (error) {
      console.error('Error editing product:', error);
    }
  };

  return (
    <div className="fixed top-10 z-999 left-0 w-full h-full flex items-center justify-center">
      <div className="max-w-md mx-auto text-center">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 className="text-3xl font-semibold">Edit Product</h3>
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={onClose}
            >
              <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
            </button>
          </div>
          <div className="p-6 flex-auto">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4 hover:border-blue-700">
                <label htmlFor="name_product" className="block text-sm font-medium text-gray-600">Product Name:</label>
                <input
                  type="text"
                  id="name_product"
                  name="name_product"
                  value={formData.name_product}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700 transition duration-300"
                />
              </div>
              <div className="mb-4 hover:border-blue-700">
                <label htmlFor="price_product" className="block text-sm font-medium text-gray-600">Product Price:</label>
                <input
                  type="number"
                  id="price_product"
                  name="price_product"
                  value={formData.price_product}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700 transition duration-300"
                />
              </div>
              <div className="mb-4 hover:border-blue-700">
                <label htmlFor="stock_product" className="block text-sm font-medium text-gray-600">Product Stock:</label>
                <input
                  type="number"
                  id="stock_product"
                  name="stock_product"
                  value={formData.stock_product}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700 transition duration-300"
                />
              </div>
              <div className="mb-4 hover:border-blue-700">
                <label htmlFor="size_product" className="block text-sm font-medium text-gray-600">Product Size:</label>
                <select
                  id="size_product"
                  name="size_product"
                  value={formData.size_product}
                  onChange={handleSelectChange}
                  required
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700 transition duration-300"
                >
                  <option value="" disabled>Select Size</option>
                  <option value="S">S</option>
                  <option value="L">L</option>
                  <option value="M">M</option>
                  <option value="XL">XL</option>
                </select>
              </div>
              <div className="mb-4 hover:border-blue-700">
                <label htmlFor="colour_product" className="block text-sm font-medium text-gray-600">Product Colour:</label>
                <select
                  id="colour_product"
                  name="colour_product"
                  value={formData.colour_product}
                  onChange={handleSelectChange}
                  required
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700 transition duration-300"
                >
                  <option value="" disabled>Select Color</option>
                  <option value="Black">Black</option> 
                  <option value="Blue">Blue</option>
                  <option value="Gray">Gray</option>
                </select>
              </div>
              <div className="mb-4 hover:border-b-primary">
                <label htmlFor="id_category_product" className="block text-sm font-medium text-gray-2">Product Category ID:</label>
                <input
                  type="number"
                  id="id_category_product"
                  name="id_category_product"
                  value={formData.id_category_product}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700 transition duration-300"
                />
              </div>
              <div className="mb-4 hover:border-blue-700">
                <label htmlFor="id_photo_product" className="block text-sm font-medium text-gray-600">Product Photo ID:</label>
                <input
                  type="number"
                  id="id_photo_product"
                  name="id_photo_product"
                  value={formData.id_photo_product}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700 transition duration-300"
                />
              </div>
              <div className="mb-4 hover:border-blue-700">
                <label htmlFor="slug_product" className="block text-sm font-medium text-gray-600">Product Slug:</label>
                <input
                  type="text"
                  id="slug_product"
                  name="slug_product"
                  value={formData.slug_product}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700 transition duration-300"
                />
              </div>
              <div className="col-span-2 text-center">
                <label htmlFor="description_product" className="text-sm font-medium text-gray-600">Product Description:</label>
                <textarea
                  id="description_product"
                  name="description_product"
                  value={formData.description_product}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                />
              </div>
              <div className="col-span-2 text-center">
                <button type="submit" className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
