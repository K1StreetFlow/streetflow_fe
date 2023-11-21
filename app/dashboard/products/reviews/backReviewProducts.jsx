import React from "react";
import Link from "next/link";

export default function DetailReviewProducts() {
    return (
        <Link href={`/dashboard/products/reviews`}>
            <button className="btn bg-meta-8 btn-sm text-white">Back</button>
        </Link>
    )
}