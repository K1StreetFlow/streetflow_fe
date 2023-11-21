"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";



export default function AddCategory( { users, products, carts }) {
    const [modal, setModal] = useState(false);
    const [cart, setCart] = useState(0);
    const [product, setProduct] = useState(0);
    const [quantity, setQuantity] = useState(0);

    const router = useRouter();


    function handleChange() {
        setModal(!modal);
    }

    async function handleSubmit(e) {
        e.preventDefault();
    
        await fetch("http://localhost:8000/api/cart-details", {
          method: "POST",
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
              onChange={(e) => setCart(e.target.value)}
            >
              <option value="DEFAULT" disabled>
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
              defaultValue={"DEFAULT"}
              className="select select-bordered w-full"
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value="DEFAULT" disabled>
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
              Add Cart
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
      
  )
}
