'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";


export default function editReviewProducts({ users, products, order_list, review }) {
    const [modal, setModal] = useState(false);
    const [user, setUser] = useState(review.users_customer.fullname);
    const [product, setProduct] = useState(review.products.name_product);
    const [orderlist, setOrderlist] = useState(review.order_list.code_order);
    const [messageReview, setMessageReview] = useState(review.message_review);
    const [numberReview, setNumberReview] = useState(review.number_review);
    const [photoReview, setPhotoReview] = useState(review.photo_review);
    const [previewImage, setPreviewImage] = useState(null);
    const router = useRouter();

    function handleChange() {
        setModal(!modal);
    }

    function getImageUrl(filename) {
        return `http://localhost:8000/api/review-products-photo/view/${filename}`;
    }

    async function handlePhotoChange(e) {
        const file = e.target.files[0];
        setPhotoReview(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        } else {
            setPreviewImage(null);
        }

        await editPhotoReview(file);
    }

    async function editPhotoReview(file) {
        const formData = new FormData();
        formData.append('photo_review', file);

        await fetch(`http://localhost:8000/api/review-products-photo/${review.id}`, {
            method: "PUT",
            body: formData
        });
    }

    async function handleUpdate(e) {
        e.preventDefault();

        await fetch(`http://localhost:8000/api/review-products/${review.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id_users_customer: user,
                id_products: product,
                id_order_list: orderlist,
                message_review: messageReview,
                number_review: numberReview,
            }),
        });

        setUser('');
        setProduct('');
        setOrderlist('');
        setMessageReview('');
        setNumberReview('');
        router.refresh();
        setModal(false);
    }
        return (
            <div>
                <button className="btn bg-info btn-sm text-white" onClick={handleChange}>
                    Edit
                </button>

                <input
                type="checkbox"
                checked={modal}
                onChange={handleChange}
                className="modal-toggle"
                />
                
                <div className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Edit Review Products</h3>
                        <form onSubmit={handleUpdate}>
                            <div className="form-control">
                                <label htmlFor="users_customer" className="label font-bold">
                                    Customer Name
                                </label>
                                <input 
                                    type="text"
                                    className="input w-full input-bordered"
                                    placeholder="Customer Name"
                                    value={review.users_customer.fullname}
                                    onChange={(e) => setUser(e.target.value)} 
                                />
                            </div>
                            <div className="form-control">
                                <label htmlFor="name_product" className="label font-bold">
                                    Product Name
                                </label>
                                <input 
                                    type="text"
                                    className="input w-full input-bordered"
                                    placeholder="Product Name"
                                    value={review.products.name_product}
                                    onChange={(e) => setProduct(e.target.value)} 
                                />
                            </div>
                            <div className="form-control">
                                <label htmlFor="code_order" className="label font-bold">
                                    Code Order
                                </label>
                                <input 
                                    type="text"
                                    className="input w-full input-bordered"
                                    placeholder="Code Order"
                                    value={review.order_list.code_order}
                                    onChange={(e) => setOrderlist(e.target.value)} 
                                />
                            </div>
                            <div className="form-control">
                                <label htmlFor="message_review" className="label font-bold">
                                    Message Review
                                </label>
                                <input 
                                    type="text"
                                    className="input w-full input-bordered"
                                    placeholder="Message Review"
                                    value={messageReview}
                                    onChange={(e) => setMessageReview(e.target.value)} 
                                />
                            </div>
                            <div className="form-control">
                                <label htmlFor="number_review" className="label font-bold">
                                    Number Review
                                </label>
                                <input 
                                    type="text"
                                    className="input w-full input-bordered"
                                    placeholder="Number Review"
                                    value={numberReview}
                                    onChange={(e) => setNumberReview(e.target.value)} 
                                />
                            </div>
                            <div className="form-control">
                                <label htmlFor="photo_review" className="label font-bold ">
                                    Photo Review
                                </label>
                                <Image
                                    src={getImageUrl(review.photo_review)}
                                    width={100}
                                    height={100}
                                    alt={review.photo_review} 
                                    className="rounded-md mr-4"
                                />
                                <input 
                                    type="file"
                                    id="photoReviewInput"
                                    name="photoReview"
                                    accept="image/*"
                                    className="input w-full input-bordered"
                                    placeholder="Photo Review"
                                    onChange={(e) => handlePhotoChange(e)} 
                                />
                                {previewImage && (
                                    <div className="image-preview">
                                        <img src={previewImage} alt="Preview" className="preview-image" />
                                    </div>
                                )}
                            </div>
                            <div className="modal-action">
                                <button type="button" className="btn" onClick={handleChange}>
                                    Close
                                </button>
                                <button 
                                    type="submit"
                                    className="btn btn-primary hover:btn-primary text-white"
                                >
                                    Update Review Products
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>  
        );
}