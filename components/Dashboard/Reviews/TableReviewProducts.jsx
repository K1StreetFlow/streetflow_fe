"use client";
import ButtonDelete from "@/components/Dashboard/ButtonDelete";
import ButtonDetail from "@/components/Dashboard/ButtonDetail";
import ButtonEdit from "@/components/Dashboard/ButtonEdit";

import Image from "next/image";

const TableReviewProducts = ({ reviews }) => {
    const handleDeleteReviews = async () => {
        try {
            confirm ("Are you sure want to delete this payment?");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="rounded-sm"></div>
    )
}