"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ChangeStatus(payment) {
  const [modal, setModal] = useState(false);
  const [status_payment, setStatusPayment] = useState("");

  console.log(status_payment);
  const router = useRouter();

  function handleChange() {
    setModal(!modal);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await fetch(`http://localhost:8000/api/payments/${payment.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status_payment: status_payment,
      }),
    });

    setStatusPayment("");
    router.refresh();
    setModal(false);
  }
  return (
    <div>
      <button
        className="btn bg-secondary btn-sm text-white"
        onClick={handleChange}
      >
        Change Status
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-5">Change Status Payment</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label htmlFor="user_customer" className="label font-bold">
                Status Payment
              </label>
              <select
                className="select select-bordered w-full"
                defaultValue={"DEFAULT"}
                onChange={(e) => setStatusPayment(e.target.value)}
              >
                <option value="DEFAULT" disabled>
                  {payment.status_payment}
                </option>
                <option value="Pending">Pending</option>
                <option value="Success">Success</option>
                <option value="Failed">Failed</option>
              </select>
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Close
              </button>
              <button
                type="Submit"
                className="btn btn-primary hover:btn-primary text-white"
              >
                Add Cart
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
