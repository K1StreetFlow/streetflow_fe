"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

function AddCategory({}) {
  const [title, setTitle] = useState("");
  const [modal, setModal] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    // console.log(title)
    e.preventDefault();

    const res = await fetch("http://localhost:8000/api/category_products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name_category_products: title,
      }),
    });

    setTitle("");
    router.refresh();
    setModal(false);
  }

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button className="btn btn-primary text-white" onClick={handleChange}>
        Add New
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

export default AddCategory;
