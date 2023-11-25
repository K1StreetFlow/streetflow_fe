"use client";
import React, { useState, useEffect, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FaUpload, FaTrash, FaEdit, FaEye } from "react-icons/fa";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { getAllPhotoProducts, uploadPhoto, deletePhotoProduct, editPhotoProduct } from "../api/PhotoApi";

const PhotoProduct = () => {
  const [photoProducts, setPhotoProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState(null);
  const fileInputRef = useRef(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllPhotoProducts();
        setPhotoProducts(response.data);
      } catch (error) {
        console.error("Error fetching photo products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const handleAction = async (productId, action) => {
    if (action === "view") {
      setSelectedProduct(photoProducts.find((product) => product.id === productId));
      setShowDetailModal(true);
    } else if (action === "edit") {
      const productToEdit = photoProducts.find((product) => product.id === productId);
      setEditedProduct(productToEdit);
      setShowUploadModal(true);
    } else if (action === "delete") {
      // Set the product to be deleted and show the confirmation modal
      setDeletingProduct(productId);
      setShowDeleteConfirmation(true);
    }
  };

  const handleDeleteConfirmation = async () => {
    if (deletingProduct) {
      try {
        // Delete the product
        await deletePhotoProduct(deletingProduct);
        console.log(`Product with ID ${deletingProduct} deleted successfully`);

        // Refresh the product list
        const response = await getAllPhotoProducts();
        setPhotoProducts(response.data);
      } catch (error) {
        console.error(`Error deleting product with ID ${deletingProduct}:`, error);
        alert("Error deleting product. Please try again.");
      } finally {
        // Close the confirmation modal
        setShowDeleteConfirmation(false);
        setDeletingProduct(null);
      }
    }
  };

  const handleModalToggle = (modalType) => {
    if (modalType === "upload") {
      setShowUploadModal(!showUploadModal);
      setEditedProduct(null); // Reset edited product when closing the modal
    } else if (modalType === "detail") {
      setShowDetailModal(!showDetailModal);
    } else if (modalType === "delete") {
      // Close the delete confirmation modal
      setShowDeleteConfirmation(false);
      setDeletingProduct(null);
    }
  };

  const handleUploadPhoto = async (photo) => {
    try {
      setUploading(true);

      if (editedProduct) {
        // If there's an edited product, perform the edit
        await handleUpdateProduct(editedProduct, photo);
      } else {
        // Otherwise, upload a new photo
        await uploadPhoto(photo);
        console.log("Photo uploaded successfully");
      }

      // Refresh the product list
      const response = await getAllPhotoProducts();
      setPhotoProducts(response.data);

      // Close the modal
      handleModalToggle("upload");
    } catch (error) {
      console.error("Error uploading/editing product:", error);
      alert("Error uploading/editing product. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleUpdateProduct = async (updatedProduct, photo) => {
    try {
      if (updatedProduct) {
        // If there's an edited product, perform the edit
        await editPhotoProduct(updatedProduct.id, updatedProduct, photo);
        console.log("Product edited successfully");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <>
      <Breadcrumb pageName="PhotoProduct" />

      <div className="rounded-sm bg-white p-4 shadow-default dark:bg-boxdark md:p-6 xl:p-9">
        <Transition show={showDeleteConfirmation} as={Dialog} onClose={() => handleModalToggle("delete")}>
          <Dialog.Overlay className="fixed w-full h-full  inset-0 bg-black bg-opacity-50" />
          <div className="flex items-center justify-center fixed inset-0">
            <div className="bg-white p-8 rounded-md">
              <h1> Konfirmasi Hapus</h1>
              <p>Apakah Anda yakin ingin menghapus foto ini?</p>
              <div className="flex justify-end mt-4">
                <button onClick={handleDeleteConfirmation} className="bg-meta-7 hover:bg-meta-1 text-white font-bold py-2 px-4 rounded">
                  Delete
                </button>
                <button onClick={() => handleModalToggle("delete")} className="ml-2">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Transition>
        <div className="flex flex-col gap-7.5">
          <label htmlFor="photoUpload" className="bg-primary hover:bg-meta-5 w-60 p-8 text-white font-bold py-1 px-2 rounded cursor-pointer flex items-center" onClick={() => handleModalToggle("upload")}>
            {editedProduct ? (
              <>
                <FaUpload size={18} className="mr-2" />
                Edit Photo
              </>
            ) : (
              <>
                <FaUpload size={18} className="mr-2" />
                Add Upload Photo
              </>
            )}
          </label>
          <input type="file" id="photoUpload" accept="image/*" className="hidden" onChange={(e) => handleUploadPhoto(e.target.files[0])} ref={fileInputRef} />

          <Transition show={showUploadModal} as={Dialog} onClose={() => handleModalToggle("upload")}>
            <Dialog.Overlay className="fixed w-full h-full inset-0 bg-black bg-opacity-50" />
            <div className="flex items-center  justify-center fixed inset-0 ">
              <div className="bg-white p-8 rounded-md">
                <h1>Upload Photo</h1>
                <input type="file" accept="image/*" onChange={(e) => handleUploadPhoto(e.target.files[0])} ref={fileInputRef} />
                <button onClick={() => fileInputRef.current.click()} className="bg-primary hover:bg-meta-5 text-white font-bold py-1 px-2 rounded cursor-pointer mt-2">
                  <FaUpload size={18} className="mr-2" />
                  Select Photo
                </button>
                {uploading && <p>Uploading...</p>}
                <button onClick={() => handleModalToggle("upload")} className="mt-2 ms-2">
                  Close
                </button>
              </div>
            </div>
          </Transition>

          <Transition show={showDetailModal} as={Dialog} onClose={() => handleModalToggle("detail")}>
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
            <div className="flex items-center justify-center fixed inset-0">
              <div className="bg-white text-sm mt-12 p-8 rounded-md">
                <h1 className="font-bold text-lg">Product Detail</h1>
                {selectedProduct && (
                  <>
                    <img src={`http://localhost:8000/api/photo_products/view/${selectedProduct.photo_product}`} alt={`Product ${selectedProduct.photo_product}`} className="w-full h-100  object-contain rounded" />
                    <p>ID: {selectedProduct.id}</p>
                    <p>NameFile: {selectedProduct.photo_product}</p>
                    <p>Createat: {selectedProduct.createdAt}</p>
                    <p>update: {selectedProduct.updatedAt}</p>
                  </>
                )}
                <button onClick={() => handleModalToggle("detail")} className=" bg-primary text-white p-2 rounded-sm mt-2">
                  Close
                </button>
              </div>
            </div>
          </Transition>

          {loading ? <p>Loading...</p> : <PhotoProductTable photoProducts={photoProducts} handleAction={handleAction} />}
        </div>
      </div>
    </>
  );
};

const PhotoProductTable = ({ photoProducts, handleAction }) => {
  if (!photoProducts || !Array.isArray(photoProducts)) {
    return null;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-graydark">
        <thead>
          <tr className="grid grid-cols-6 ">
            <th className="py-2 px-4 col-span-1">ID</th>
            <th className="py-2 px-4 col-span-2">Foto</th>
            <th className="py-2 px-4 col-span-3">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {photoProducts.map((product) => (
            <tr key={product.id} className="group hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 ease-in-out grid grid-cols-6 items-center">
              <td className="py-2 px-4 col-span-1 text-center">{product.id}</td>
              <td className="py-2 px-4 flex justify-center col-span-2">
                <img src={`http://localhost:8000/api/photo_products/view/${product.photo_product}`} alt={`Produk ${product.photo_product}`} className="w-12 h-12 object-cover rounded" />
              </td>
              <td className="py-2 px-4 flex justify-center space-x-2 items-center col-span-3">
                <button onClick={() => handleAction(product.id, "view")} className="bg-primary hover:bg-meta-5 text-white font-bold sm:py-1 sm:px-1 p-0 rounded transition-all duration-300 flex items-center text-xs sm:text-sm">
                  <FaEye size={18} className="mr-1 " />
                  Lihat Detail
                </button>

                <button onClick={() => handleAction(product.id, "edit")} className="bg-warning hover:bg-meta-6 text-white font-bold sm:py-1 sm:px-2 rounded transition-all duration-300 flex items-center text-sm">
                  <FaEdit size={18} className="mr-1" />
                  Edit
                </button>

                <button onClick={() => handleAction(product.id, "delete")} className="bg-meta-7 hover:bg-meta-1 text-white font-bold sm:py-1 sm:px-2 sm:text-xs rounded transition-all duration-300 flex items-center text-sm">
                  <FaTrash size={18} className="mr-1" />
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PhotoProduct;
