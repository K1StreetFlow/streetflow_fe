// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function AddReviewProducts({ users, products, order_list, reviews }) {
//     const [modal, setModal] = useState(false);
//     const [review, setReview] = useState(0);
//     const [messageReview, setMessageReview] = useState("");
//     const [numberReview, setNumberReview] = useState(0);
//     const [photoReview, setPhotoReview] = useState("");

//     const router = useRouter();

//     function handleChange() {
//         setModal(!modal);
//     }

//     async function handleSubmit(e) {
//         e.preventDefault();

//         await fetch("http://localhost:8000/api/review-products", "http://localhost:8000/api/review-products-photo", {
//             method: "POST",
//             header: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 id_users_customer: review,
//                 id_products: review,
//                 id_order_list: review,
//                 message_review: messageReview,
//                 number_review: numberReview,
//                 photo_review: photoReview,
//             }),
//         });

//         setUser("");
//         setMessageReview("");
//         setNumberReview("");
//         setPhotoReview("");
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
//                 <div className="modal-box">
//                     <h3 className="font-bold text-lg">Add New Review</h3>
//                     <form onSubmit={handleSubmit}>
//                         <div className="form-control">
//                             <label htmlFor="fullname" className="label font-bold">
//                                 Customer Name
//                             </label>
//                             {reviews?.map((review, key) => {
//                                 <input key={key} 
//                                     type="text"
//                                     className="input w-full input-bordered"
//                                     placeholder="Customer Name"
//                                     value={review.id_users_customer: {review.users_customer.fullname}}     
//                                 />
//                             })}
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     )


// }