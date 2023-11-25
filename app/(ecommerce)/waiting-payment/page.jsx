import Link from "next/link";
import Image from "next/image";
import SidebarCustomer from "@/components/Sidebar/SidebarCustomer";
import formatDate from "../../utils/formatDate";
import axios from "axios";
import { cookies } from "next/headers";
import { updateAllStatusPending } from "../../../../backend/src/controllers/payment.controller";

async function updateAllStatusPending() {
  const res = await fetch(`http://localhost:8000/api/payments/update-status`, {
    next: {
      revalidate: 0,
    },
  });
  return res.json();
}

async function getUserOrder() {
  const cookieStore = cookies();
  const token = cookieStore.get("tokenCustomer");

  const res = await fetch("http://localhost:8000/api/order/user/orderList", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      cookie: `tokenCustomer=${token.value}`,
    },
    credentials: "include",
  });

  return res.json();
}

async function getPaymentById(id) {
  const res = await fetch(`http://localhost:8000/api/payments/${id}`, {
    next: {
      revalidate: 0,
    },
  });
  return res.json();
}

async function getAllPendingUnpaidPayments() {
  const res = await fetch(`http://localhost:8000/api/payments`, {
    next: {
      revalidate: 0,
    },
  });
  const data = await res.json();
  // Filter payments with status Pending or Unpaid
  const filteredPayments = data.data.filter(
    (payment) =>
      payment.status_payment === "Pending" ||
      payment.status_payment === "Unpaid"
  );
  return { data: filteredPayments };
}

const page = async ({ params }) => {
  const { order } = await getUserOrder();
  console.log("ORDERRR", order);

  const { data } = await getAllPendingUnpaidPayments();
  console.log(data);

  return (
    <div className="flex items-start mt-10">
      <div className="w-1/5 ml-7 border-none rounded-lg pb-8 box text-[#212121]">
        <SidebarCustomer />
      </div>
      <div className="w-4/5 mb-5 text-[#212121]">
        <div className="box-2 ">
          <div className="flex mb-4 items-center">
            <div className="mr-4">
              <p className="font-semibold">Waiting Payment</p>
            </div>
          </div>
          {data.length ? (
            data.map((payment, key) => (
              <div className="box-3 mb-4" key={key}>
                <div className="flex justify-between mb-4 items-center ">
                  <div className="inline-flex items-center ">
                    <p className="mr-2">{formatDate(payment.createdAt)}</p>
                    <p
                      className={`inline-flex rounded-sm bg-opacity-10 py-1 px-3 text-sm font-medium mr-2 ${
                        payment.status_payment === "Failed"
                          ? "text-danger bg-danger"
                          : "text-secondary bg-secondary"
                      }`}
                    >
                      {payment.status_payment}
                    </p>
                    <p className="mr-2 text-form-strokedark">
                      {payment.code_payment}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row justify-between">
                  <div>
                    <p className="text-form-strokedark">Method Payment</p>
                    <p className="font-bold mb-2">{payment.method_payment}</p>
                  </div>
                  <div className="border-line ml-20 pl-5 justify-start">
                    <p>Code Payment</p>
                    <p className="font-bold">{payment.va_number}</p>
                  </div>
                  <div className="border-line px-10 justify-start">
                    <p>Total Payment</p>
                    <p className="font-bold">Rp {payment.total_payment}</p>
                  </div>
                </div>
                <div className="flex justify-end items-center mt-7 gap-4">
                  <button
                    className="font-semibold"
                    // onClick={() => toggleModal(order.id)}
                  >
                    Transaction Details
                  </button>
                  <Link href={payment.pdf_url} targer="_blank">
                    <button className="button-bayar">Cara Bayar</button>
                  </Link>
                  {/* {order.order_list.status_order === "Unpaid" && ( */}
                  <button className="button-ulasan">Payment</button>
                </div>
              </div>
            ))
          ) : (
            <p>Belum ada data</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default page;
