"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function FormPayment() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const midtransUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransUrl;

    const midtransClientKey = "SB-Mid-client-biw0_z5pnI4tFfTA";
    scriptTag.setAttribute("data-client-key", midtransClientKey);

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      fullname: name,
      code_payment: order,
      email,
      total,
    };
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      "http://localhost:8000/api/payments/process-payment",
      data,
      config
    );

    setToken(response.data.token);
  }

  useEffect(() => {
    if (token) {
      try {
        window.snap.pay(token, {
          onSuccess: async (result) => {
            const config = {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            };
            const data = {
              code_payment: result.order_id,
              status_payment: "Success",
              total_payment: parseInt(result.gross_amount),
              date_payment: result.transaction_time,
              method_payment: result.payment_type,
              va_number: result.va_numbers[0].va_number,
              va_type: result.va_numbers[0].bank,
              pdf_url: result.pdf_url,
              id_cart: 1,
            };

            const response = await axios.post(
              "http://localhost:8000/api/payments",
              data,
              config
            );

            console.log(response.data);

            if (response.data) {
              setToken("");
              window.location.href = "/order_list";
            } else {
              console.log("error");
            }
          },
          onPending: async (result) => {
            const config = {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            };
            const data = {
              code_payment: result.order_id,
              status_payment: "Pending",
              total_payment: parseInt(result.gross_amount),
              date_payment: result.transaction_time,
              method_payment: result.payment_type,
              va_number: result.va_numbers[0].va_number,
              va_type: result.va_numbers[0].bank,
              pdf_url: result.pdf_url,
              id_cart: 1,
            };

            const response = await axios.post(
              "http://localhost:8000/api/payments",
              data,
              config
            );

            if (response.data) {
              setToken("");
              window.location.href = "/waiting-payment";
            } else {
              console.log("error");
            }
          },
          onError: (error) => {
            localStorage.setItem("Pembayaran-error", JSON.stringify(error));
            setToken("");
            window.location.reload();
          },
          onClose: () => {
            alert("Anda belum menyelesaikan pembayaran");
            setToken("");
            window.location.reload();
          },
        });
      } catch (err) {
        alert("Error");
        console.log(err);
      }

      setName("");
      setOrder("");
      setTotal(0);
    }
  }, [token]);
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control">
        <label htmlFor="product" className="label font-bold">
          Name
        </label>
        <input
          type="text"
          className="input w-full input-bordered"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label htmlFor="product" className="label font-bold">
          Email
        </label>
        <input
          type="email"
          className="input w-full input-bordered"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label htmlFor="product" className="label font-bold">
          Total
        </label>
        <input
          type="number"
          className="input w-full input-bordered"
          placeholder="Email"
          value={total}
          onChange={(e) => setTotal(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label htmlFor="product" className="label font-bold">
          Code Payment
        </label>
        <input
          type="text"
          className="input w-full input-bordered"
          placeholder="Email"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
        />
      </div>

      <div className="modal-action">
        <button
          type="Submit"
          className="btn btn-primary hover:btn-primary text-white"
        >
          Bayar Sekarang
        </button>
      </div>
    </form>
  );
}
