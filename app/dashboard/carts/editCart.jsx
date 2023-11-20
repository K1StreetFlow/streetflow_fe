"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditCartDetail({ users, cart }) {
  const [modal, setModal] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState(cart.id_user_customer);

  function handleChange() {
    setModal(!modal);
  }

  async function handleUpdate(e) {
    e.preventDefault();

    const res = await fetch(`http://localhost:8000/api/carts/${cart.cart_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_users_customer: user,
      }),
    });

    console.log(res);

    setUser("");
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
          <h3 className="font-bold text-lg">Update Cart</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control">
              <label htmlFor="user_customer" className="label font-bold">
                User Customer
              </label>
              <select
                defaultChecked={cart.user_customer.fullname}
                className="select select-bordered w-full"
                onChange={(e) => setUser(e.target.value)}
              >
                <option disabled value="DEFAULT">
                  -- Select User Customer --
                </option>
                {users?.map((user, key) => (
                  <option key={key} value={user.id}>
                    {user.fullname}
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
                Update Cart Detail
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
