import { Fragment, useState, ChangeEvent, FormEvent } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface AddProductModalProps {
    onClose: () => void;
    onAddProduct: (newProduct: any) => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ onClose, onAddProduct }) => {
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
            await onAddProduct(formData);
            onClose();
        } catch (error) {
            console.error('Error adding product:', error);
            // Handle error, show error message, etc.
        }
    };

    return (
        <Transition show={true} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-999 overflow-y-auto"
                onClose={onClose}
            >
                <div className="min-h-screen px-4 text-center">
                    {/* Content */}
                    <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

                    <div className="inline-block align-middle my-20 p-6 bg-white dark:bg-boxdark shadow-md rounded-lg text-left overflow-hidden transform transition-all">
                        <Dialog.Title className="text-lg font-semibold">
                            Add New Product
                        </Dialog.Title>

                        <div className="mt-4">
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
                                {/* ... (lanjutkan untuk input lainnya) ... */}
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
                                        <option value="Grey">Grey</option>
                                    </select>
                                </div>
                                <div className="mb-4 hover:border-blue-700">
                                    <label htmlFor="id_category_product" className="block text-sm font-medium text-gray-600">Product Category ID:</label>
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
                                {/* ... (lanjutkan jika ada input lainnya) ... */}

                                <div className="col-span-2 text-center">
                                    <button type="submit" className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Add Product
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default AddProductModal;
