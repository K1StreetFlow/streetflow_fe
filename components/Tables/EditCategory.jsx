"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditCategory({ category }) {
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState(category.name_category_products);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch(
      `http://localhost:8000/api/category_products/${category.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name_category_products: title,
        }),
      }
    );

    console.log(res);

    setTitle("");
    router.refresh();
    setModal(false);
  }

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button
        className="text-white hover:bg-meta-8 bg-warning p-2 rounded-md me-2"
        onClick={handleChange}
      >
        Edit
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal ">
        <div className="modal-box bg-white ">
          <h3 className="font-bold text-lg text-black">Add New Category</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label font-bold text-black">
                Name Category
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input w-full input-bordered bg-white"
                placeholder="Category Product"
              />
            </div>
            <div className="modal-action">
              <button
                type="button"
                className="btn btn-white text-white"
                onClick={handleChange}
              >
                Close
              </button>
              <button type="submit" className="btn btn-success text-white">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
