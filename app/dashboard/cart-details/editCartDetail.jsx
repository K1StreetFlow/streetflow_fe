"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditCartDetail({ carts, products, cart_detail }) {
  const [modal, setModal] = useState(false);

  const [cart, setCart] = useState(cart_detail.id_cart);
  const [product, setProduct] = useState(cart_detail.id_product);
  const [quantity, setQuantity] = useState(cart_detail.quantity);

  const router = useRouter();

  function handleChange() {
    setModal(!modal);
  }

  async function handleUpdate(e) {
    e.preventDefault();

    await fetch(`http://localhost:8000/api/cart-details/${cart_detail.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_cart: cart,
        id_product: product,
        quantity: quantity,
      }),
    });

    setProduct("");
    setQuantity("");
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
          <h3 className="font-bold text-lg">Add New Cart</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control">
              <label htmlFor="user_customer" className="label font-bold">
                User Customer
              </label>
              <select
                defaultChecked={cart_detail.cart.user_customer.fullname}
                className="select select-bordered w-full"
                onChange={(e) => setCart(e.target.value)}
              >
                <option disabled value="DEFAULT">
                  -- Select User Customer --
                </option>
                {carts?.map((cart, key) => (
                  <option key={key} value={cart.cart_id}>
                    {cart.user_customer.fullname}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label htmlFor="user_customer" className="label font-bold">
                Product
              </label>
              <select
                defaultChecked={cart_detail.product.name_product}
                className="select select-bordered w-full"
                onChange={(e) => setProduct(e.target.value)}
              >
                <option disabled value="DEFAULT">
                  -- Select Product --
                </option>
                {products?.map((product, key) => (
                  <option key={key} value={product.id}>
                    {product.name_product}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label htmlFor="product" className="label font-bold">
                Quantity
              </label>
              <input
                type="number"
                className="input w-full input-bordered"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
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
