// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function AddReviewProducts({ users, products, order_list, reviews }) {
//     const [modal, setModal] = useState(false);
//     const [user, setUser] = useState(0);
//     const [product, setProduct] = useState(0);
//     const [orderlist, setOrderlist] = useState(0);
//     const [messageReview, setMessageReview] = useState("");
//     const [numberReview, setNumberReview] = useState("");
//     const [photoReview, setPhotoReview] = useState("");
//     const [previewImage, setPreviewImage] = useState(null);

//     const router = useRouter();

//     function handleChange() {
//         setModal(!modal);
//     }

//     async function handlePhotoChange(e) {
//         const file = e.target.files[0];
//         setPhotoReview(file);

//         const reader = new FileReader();
//         reader.onloadend = () => {
//             setPreviewImage(reader.result);
//         };
//         if (file) {
//             reader.readAsDataURL(file);
//         } else {
//             setPreviewImage(null);
//         }

//         await createPhotoReview(file);
//     }

//     async function createPhotoReview(file) {
//         const formData = new FormData();
//         formData.append('photo_review', file);

//         await fetch(`http://localhost:8000/api/review-products-photo/${review.id}`, {
//             method: "POST",
//             body: formData
//         });
//     }

//     async function handleSubmit(e) {
//         e.preventDefault();

//         await fetch("http://localhost:8000/api/review-products", {
//             method: "POST",
//             header: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 id_users_customer: user,
//                 id_products: product,
//                 id_order_list: orderlist,
//                 message_review: messageReview,
//                 number_review: numberReview,
//             }),
//         });

//         setUser('');
//         setProduct('');
//         setOrderlist('');
//         setMessageReview('');
//         setNumberReview('');
//         router.refresh();
//         setModal(false);
//     }
//     return (
//         <div>
//             <button className="btn bg-primary text-white" onClick={handleChange}>
//                 Add Review Product
//             </button>

//             <input 
//                 type="checkbox"
//                 checked={modal}
//                 onChange={handleChange}
//                 className="modal-toggle"
//             />

//             <div className="modal">
//                 <div className="modal-box w-full max-w-5xl">
//                     <h3 className="font-bold text-lg">Add New Review</h3>
//                     <form onSubmit={handleSubmit}>
//                         <div className="form-control">
//                                 <label htmlFor="photo_review" className="label font-bold ">
//                                     Photo Review
//                                 </label>
//                                 <input 
//                                     type="file"
//                                     id="photoReviewInput"
//                                     name="photoReview"
//                                     accept="image/*"
//                                     className="input w-full input-bordered"
//                                     placeholder="Photo Review"
//                                     onChange={(e) => handlePhotoChange(e)} 
//                                 />
//                                 {previewImage && (
//                                     <div className="image-preview">
//                                         <img src={previewImage} alt="Preview" className="preview-image" />
//                                     </div>
//                                 )}
//                         </div>
//                         <div className="form-control flex">
//                             <label htmlFor="users_customer" className="label font-bold">
//                                 Customer Name
//                             </label>
//                             <select
//                                 className="input w-full input-bordered"
//                                 value={user}
//                                 onChange={(e) => setUser(e.target.value)}
//                             >
//                                 <option value="">Select Customer</option>
//                                 {reviews?.map((review, key) => (
//                                     <option key={key} value={review.id}>
//                                         {review.users_customer.fullname}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div className="form-control">
//                             <label htmlFor="name_product" className="label font-bold">
//                                 Product Name
//                             </label>
//                             <select
//                                 className="input w-full input-bordered"
//                                 value={product}
//                                 onChange={(e) => setProduct(e.target.value)}
//                             >
//                                 <option value="">Select Product</option>
//                                 {products.map((prod, key) => (
//                                     <option key={key} value={prod.id}>
//                                         {prod.name_product}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div className="form-control">
//                             <label htmlFor="code_order" className="label font-bold">
//                                 Code Order
//                             </label>
//                             <select
//                                 className="input w-full input-bordered"
//                                 value={orderlist}
//                                 onChange={(e) => setOrderlist(e.target.value)}
//                             >
//                                 <option value="">Select Order</option>
//                                 {order_list.map((order, key) => (
//                                     <option key={key} value={order.id}>
//                                         {order.code_order}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div className="form-control">
//                         <label htmlFor="message_review" className="label font-bold">
//                             Message Review
//                         </label>
//                             <input 
//                                 type="text"
//                                 className="input w-full input-bordered"
//                                 placeholder="Message Review"
//                                 value={messageReview}
//                                 onChange={(e) => setMessageReview(e.target.value)} 
//                             />
//                         </div>
//                         <div className="form-control">
//                         <label htmlFor="number_review" className="label font-bold">
//                             Number Review
//                         </label>
//                         <input 
//                                 type="text"
//                                 className="input w-full input-bordered"
//                                 placeholder="Number Review"
//                                 value={numberReview}
//                                 onChange={(e) => setNumberReview(e.target.value)} 
//                         />
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     )


// }