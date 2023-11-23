"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function deletePayment(payment) {
  const [modal, setModal] = useState(false);
  const router = useRouter();

  console.log(payment);

  const handleChange = () => {
    setModal(!modal);
  };

  async function handleDelete(paymentId) {
    await fetch(`http://localhost:8000/api/payments/${paymentId}`, {
      method: "DELETE",
    });

    router.refresh();
    setModal(false);
  }
  return (
    <div>
      <button
        className="btn bg-error btn-sm text-white"
        disabled={
          payment.status_payment == "Success" ||
          payment.status_payment == "Pending"
        }
        onClick={handleChange}
      >
        <Image
          src="/images/icon/trash.svg"
          width={15}
          height={15}
          alt="delete"
        />
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you sure to delete?</h3>

          <div className="modal-action">
            <button type="button" className="btn" onClick={handleChange}>
              Close
            </button>
            <button
              type="button"
              className="btn btn-error hover:bg-[red] text-white"
              onClick={() => handleDelete(payment.id)}
            >
              <Image
                src="/images/icon/trash.svg"
                width={15}
                height={15}
                alt="delete"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
