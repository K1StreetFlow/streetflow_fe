import Image from "next/image";
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { deletePhotoProduct, editPhotoProduct, getAllPhotoProducts, getPhotoProductById, uploadPhoto } from '@/app/dashboard/products/api/PhotoApi';
import { getAllProducts, deleteProduct, addProduct, editProduct } from '@/app/dashboard/products/api/ProductApi';
import AddProductModal from '@/components/Product/FormCrudProduct/TambahProductForm';
import EditProductModal from '@/components/Product/FormCrudProduct/EditProductForm';
import DeleteConfirmationModal from '@/components/Product/FormCrudProduct/DeleteConfirmationModal';

const TableTwo: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getAllProducts();
        setProducts(response.data);
      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteProduct = (id: number) => {
    setDeleteProductId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      setLoading(true);
      if (deleteProductId) {
        await deleteProduct(deleteProductId);
        // Memperbarui daftar produk setelah penghapusan tanpa mengambil data dari server
        setProducts((prevProducts) => prevProducts.filter(product => product.id !== deleteProductId));
      }
    } catch (error) {
      setError('Error deleting product');
      console.error('Error deleting product:', error);
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
    }
  };
  const handleAddProduct = async (newProduct: any, photo: File) => {
    try {
      setLoading(true);
      // Upload foto dan dapatkan ID foto produk
      const photoResponse = await uploadPhoto(photo);
      const photoId = photoResponse.data.id; // Gantilah 'id' dengan properti yang sesuai

      // Tambahkan ID foto produk ke data produk baru
      const productData = { ...newProduct, id_photo_product: photoId };

      // Tambahkan produk baru ke API
      await addProduct(productData);

      // Ambil produk terbaru setelah penambahan
      const updatedProducts = await getAllProducts();
      setProducts(updatedProducts.data);

      // Sembunyikan modal setelah menambah produk
      setShowAddModal(false);
    } catch (error) {
      setError('Error adding product');
      console.error('Error adding product:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleUpdateProduct = async (updatedProduct: any, photo: File | undefined) => {
    try {
      let photoUrl = updatedProduct.photo; // Menggunakan URL foto yang sudah ada sebagai default
  
      // Jika ada file foto baru, unggah foto dan dapatkan URL baru
      if (photo) {
        const photoId = updatedProduct.id_photo_product || 0; // ID foto yang sudah ada atau default 0 jika tidak ada
        await editPhotoProduct(photoId, {}, photo);
  
        // Sesuaikan ini berdasarkan struktur respons API Anda
        photoUrl = `http://localhost:8000/api/photo_products/${photoId}`;
      }
  
      // Membuat data yang akan dikirim ke API, termasuk URL foto baru
      const editedProductData = { ...updatedProduct, photo: photoUrl };
  
      // Pastikan Anda memiliki ID produk yang akan diubah
      const productId = updatedProduct.id;
  
      // Memanggil fungsi editProduct dengan data yang telah diperbarui
      await editProduct(productId, editedProductData);
  
      // Memperbarui daftar produk setelah mengedit produk
      const updatedProducts = await getAllProducts();
      setProducts(updatedProducts.data);
      setEditingProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
      // Menangani error jika diperlukan
    }
  };
  
  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
  };
  

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4 md:p-6 xl:p-7.5">
      <div className="flex items-center mb-4">
        <a
          href="#"
          className="text-lg bg-primary shadow-md font-semibold p-2 text-white"
          onClick={() => setShowAddModal(true)}
        >
          Add New Products
        </a>
        <button
          className="flex ms-3 shadow-md bg-white p-2 items-center gap-1 text-blue-500 dark:text-blue-300 cursor-pointer"
          onClick={() => setShowAddModal(true)}
        >
          <FaPlus />
        </button>
      </div>

      {showAddModal && (
        <AddProductModal
          onClose={() => setShowAddModal(false)}
          onAddProduct={handleAddProduct}
        />
      )}

      {editingProduct && (
        <EditProductModal
          productId={editingProduct.id}
          onClose={() => setEditingProduct(null)}
          onEditProduct={handleUpdateProduct}
          photoUrl={editingProduct.photoUrl}  // Pastikan Anda menyediakan URL foto untuk produk yang diedit
        />
      )}

      <div className="grid grid-cols-8 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-4 sm:col-span-2 flex items-center">
          <p className="font-medium">Product Name</p>
        </div>

        <div className="col-span-2 sm:col-span-1 items-center flex">
          <p className="font-medium">Category</p>
        </div>

        <div className="col-span-1 hidden lg:flex items-center">
          <p className="font-medium">Price</p>
        </div>

        <div className="col-span-1 hidden lg:flex items-center">
          <p className="font-medium">Stock</p>
        </div>

        <div className="col-span-1 hidden lg:flex items-center">
          <p className="font-medium">Colour</p>
        </div>

        <div className="col-span-1 hidden lg:flex items-center">
          <p className="font-medium">Size</p>
        </div>

        <div className="col-span-1 flex items-center space-x-2">
          <p className="font-medium">Actions</p>
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {products.map((product, key) => (
        <div
          className="grid grid-cols-8 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-4 sm:col-span-2 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md">
                <Image
                  src={`http://localhost:8000/api/photo_products/view/${product.photo.photo_product}`}
                  width={40}
                  height={50}
                  alt={product.name_product}
                />
              </div>
              <p className="text-sm hidden sm:flex text-black dark:text-white">
                {product.name_product}
              </p>
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 items-center flex">
            <p className="text-sm text-black dark:text-white">
              {product.category?.name_category_products}
            </p>
          </div>

          <div className="col-span-1 hidden lg:flex items-center">
            <p className="text-sm text-black dark:text-white">
              RP.{product.price_product.toLocaleString("id-ID")}
            </p>
          </div>

          <div className="col-span-1 hidden lg:flex items-center">
            <p className="text-sm text-black dark:text-white">
              {product.stock_product}
            </p>
          </div>

          <div className="col-span-1 hidden lg:flex items-center">
            <p className="text-sm text-black dark:text-white">
              {product.colour_product}
            </p>
          </div>

          <div className="col-span-1 hidden lg:flex items-center">
            <p className="text-sm text-black dark:text-white">
              {product.size_product}
            </p>
          </div>

          <div className="col-span-1 flex items-center space-x-2">
            <button
              className="text-sm text-blue-500 dark:text-blue-300 cursor-pointer"
              onClick={() => handleEditProduct(product)}
            >
              <FaEdit />
              Edit
            </button>
            <button
              className="text-sm text-red-500 dark:text-red-300 cursor-pointer"
              onClick={() => handleDeleteProduct(product.id)}
            >
              <FaTrash />
              Delete
            </button>
            {/* Modal konfirmasi penghapusan */}
            {showDeleteModal && product.id === deleteProductId && (
              <DeleteConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirmDelete={confirmDelete}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableTwo;
