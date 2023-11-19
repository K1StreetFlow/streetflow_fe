"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddPayment({ users, payments, carts }) {
  const [modal, setModal] = useState(false);
  const [status_payment, setStatusPayment] = useState("");
  const [code_payment, setCodePayment] = useState("");
  const [total_payment, setTotalPayment] = useState(0);
  const [method_payment, setMethodPayment] = useState("");
  const [cart, setCart] = useState(0);

  const router = useRouter();

  function handleChange() {
    setModal(!modal);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await fetch("http://localhost:8000/api/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code_payment: code_payment,
        status_payment: status_payment,
        total_payment: total_payment,
        method_payment: method_payment,
        id_cart: cart,
      }),
    });

    setCodePayment("");
    setStatusPayment("");
    setMethodPayment("");
    setCart("");
    router.refresh();
    setModal(false);
  }
  return (
    <div>
      <button className="btn bg-primary text-white" onClick={handleChange}>
        Add Payment
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Payment</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label htmlFor="product" className="label font-bold">
                Code Payment
              </label>
              <input
                type="text"
                className="input w-full input-bordered"
                placeholder="Code Payment"
                value={code_payment}
                onChange={(e) => setCodePayment(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label htmlFor="product" className="label font-bold">
                Total Payment
              </label>
              <input
                type="number"
                className="input w-full input-bordered"
                placeholder="Code Payment"
                value={total_payment}
                onChange={(e) => setTotalPayment(e.target.value)}
              />
            </div>
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
                  -- Select Status Payment --
                </option>
                <option value="Pending">Pending</option>
                <option value="Success">Success</option>
                <option value="Failed">Failed</option>
              </select>
            </div>
            <div className="form-control">
              <label htmlFor="user_customer" className="label font-bold">
                Cart Customer
              </label>
              <select
                className="select select-bordered w-full"
                defaultValue={"DEFAULT"}
                onChange={(e) => setMethodPayment(e.target.value)}
              >
                <option value="DEFAULT" disabled>
                  -- Select Method Payment --
                </option>
                <option value="E-Wallet">E-Wallet</option>
                <option value="Transfer Bank">Transfer Bank</option>
                <option value="M-Banking">M-Banking</option>
              </select>
            </div>
            <div className="form-control">
              <label htmlFor="user_customer" className="label font-bold">
                Cart Customer
              </label>
              <select
                className="select select-bordered w-full"
                defaultValue={"DEFAULT"}
                onChange={(e) => setCart(e.target.value)}
              >
                <option value="DEFAULT" disabled>
                  -- Select Cart Customer--
                </option>
                {carts?.map((cart, key) => (
                  <option key={key} value={cart.cart_id}>
                    {cart.user_customer.fullname}
                  </option>
                ))}
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
