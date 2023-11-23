"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddCart({ users }) {
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState(0);

  const router = useRouter();

  function handleChange() {
    setModal(!modal);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await fetch("http://localhost:8000/api/carts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_users_customer: user,
      }),
    });

    setUser("");
    router.refresh();
    setModal(false);
  }
  return (
    <div>
      <button className="btn bg-primary text-white" onClick={handleChange}>
        Add Cart
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Cart</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label htmlFor="user_customer" className="label font-bold">
                User Customer
              </label>
              <select
                className="select select-bordered w-full"
                defaultValue={"DEFAULT"}
                onChange={(e) => setUser(e.target.value)}
              >
                <option value="DEFAULT" disabled>
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
                Add Cart
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
