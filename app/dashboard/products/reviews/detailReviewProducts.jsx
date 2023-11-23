import React from "react";
import Link from "next/link";

export default function DetailReviewProducts({ id }) {
    return (
        <Link href={`reviews/${id}`}>
            <button className="btn bg-success btn-sm text-white">Detail</button>
        </Link>
    )
}