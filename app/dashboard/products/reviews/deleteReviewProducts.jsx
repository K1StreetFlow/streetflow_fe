"use client";

import { useState } from "react"
import { useRouter } from "next/navigation";

export default function deleteReviewProducts(review) {
    const [modal, setModal] = useState(false);
    const router = useRouter();

    const handleChange = () => {
        setModal(!modal);
    };

    async function handleDelete(reviewId) {
        await fetch(`http://localhost:8000/api/review-products/${reviewId}`, {
            method: "DELETE",
        });

        router.refresh();
        setModal(false);
    }

    return (
        <div>
            <button className="btn bg-error btn-sm text-white" onClick={handleChange}>
                Delete
            </button>

            <input 
                type="checkbox"
                checked={modal}
                onChange={handleChange}
                className="modal-toggle"
            />

            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Are you sure to delete this ?</h3>

                    <div className="modal-action">
                        <button type="button" className="btn" onClick={handleChange}>
                            Cancel
                        </button>
                        <button 
                            type="button"
                            className="btn btn-primary hover:btn-primary text-white"
                            onClick={() => handleDelete(review.id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}