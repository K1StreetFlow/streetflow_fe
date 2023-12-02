import Link from "next/link";
import Image from "next/image";
import SidebarCustomer from "@/components/Sidebar/SidebarCustomer";
import { formatDate } from "../../utils/formatDate";
import { cookies } from "next/headers";

export const metadata = {
  title: "Waiting Payment | Streetflow",
};

async function updateAllPaymentPending() {
  await fetch(`http://localhost:8000/api/payments/update-status/user`, {
    next: {
      revalidate: 0,
    },
  });
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

const page = async () => {
  await updateAllPaymentPending();
  const { data } = await getUserOrder();

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
            data.map(
              (order, key) =>
                order.payment.status_payment === "Pending" && (
                  <div className="box-3 mb-4" key={key}>
                    <div className="flex justify-between mb-4 items-center ">
                      <div className="inline-flex items-center ">
                        <p className="mr-2">
                          {formatDate(order.payment.date_payment)}
                        </p>
                        <p
                          className={`inline-flex rounded-sm bg-opacity-10 py-1 px-3 text-sm font-medium mr-2 ${
                            order.payment.status_payment === "Success"
                              ? "text-success bg-success"
                              : order.payment.status_payment === "Failed"
                              ? "text-danger bg-danger"
                              : "text-warning bg-warning"
                          }`}
                        >
                          {order.payment.status_payment}
                        </p>
                        <p className="mr-2 text-form-strokedark">
                          {order.payment.code_payment}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row justify-between">
                      <div>
                        <p className="text-form-strokedark mb-3">
                          Method Payment
                        </p>
                        <p className="font-bold">
                          {/* <span className="ms-3">{order.payment.va_type}</span> | */}
                          {order.payment.va_type === "bri" ? (
                            <Image
                              src="/images/logo/bri.webp"
                              width={60}
                              height={60}
                            />
                          ) : order.payment.va_type === "cimb" ? (
                            <Image
                              src={"/images/logo/cimb.svg"}
                              width={120}
                              height={120}
                            />
                          ) : order.payment.va_type === "bni" ? (
                            <Image
                              src={"/images/logo/bni.png"}
                              width={70}
                              height={70}
                            />
                          ) : (
                            <Image
                              src={"/images/logo/bca.png"}
                              width={70}
                              height={70}
                            />
                          )}
                        </p>
                      </div>
                      <div className="border-line ml-20 pl-5 justify-start">
                        <p>Code Payment</p>
                        <p className="font-bold">{order.payment.va_number}</p>
                      </div>
                      <div className="border-line px-10 justify-start">
                        <p>Total Payment</p>
                        <p className="font-bold">
                          Rp{" "}
                          {order.payment.total_payment.toLocaleString("id-ID")}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-end items-center mt-7 gap-4">
                      <Link href={`/waiting-payment/${order.payment.id}`}>
                        <button
                          className="font-semibold"
                          // onClick={() => toggleModal(order.id)}
                        >
                          Transaction Details
                        </button>
                      </Link>
                      {order.payment.pdf_url !== null ? (
                        <Link href={order.payment.pdf_url} targer="_blank">
                          <button className="button-ulasan">How to pays</button>
                        </Link>
                      ) : (
                        <button
                          className="py-2 px-4 cursor-no-drop bg-gray rounded-sm "
                          disabled
                        >
                          How to Pay
                        </button>
                      )}
                    </div>
                  </div>
                )
            )
          ) : (
            <p>
              You don't have any order. <Link href="/product">Go shopping</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
export default page;
