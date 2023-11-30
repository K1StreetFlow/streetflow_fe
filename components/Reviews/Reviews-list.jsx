"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { formatDate } from "@/app/utils/formatDate";
import SidebarCustomer from "../Sidebar/SidebarCustomer";
import Modal from "react-modal";

function getImageUrl(filename) {
  return `http://localhost:8000/api/photo_products/view/${filename}`;
}

const ReviewPages = ({ orderdata, review, token }) => {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [reviewMessage, setReviewMessage] = useState("");
  const [reviewNumber, setReviewNumber] = useState(0);
  const [reviewPhoto, setReviewPhoto] = useState(null);
  const [productId, setProductId] = useState(null);
  const [orderListId, setOrderListId] = useState(null);
  const [orderStatus, setOrderStatus] = useState(null);
  const [customerId, setCustomerId] = useState(null);

  function reviewProductId(productId, orderId) {
    let isReview = false;
    review.forEach((item) => {
      if (item.id_products == productId && item.id_order_list == orderId) {
        isReview = true;
      }
    });
    return isReview;
  }

  const openModal = (order, detail) => {
    setProductId(detail.product.id);
    setOrderListId(order.id);
    setOrderStatus(order.status_order); // Save the order status
    setCustomerId(order.id_users_customer); // Save the customer id
    setSelectedProduct(detail.product);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const submitReview = async (event) => {
    event.preventDefault();

    const review = {
      id_users_customer: customerId,
      id_products: productId,
      id_order_list: orderListId,
      status_order: orderStatus,
      message_review: reviewMessage,
      number_review: reviewNumber,
    };

    try {
      const reviewResponse = await fetch(
        "http://localhost:8000/api/review-products/user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Cookie: `tokenCustomer=${token}`,
          },
          credentials: "include",
          body: JSON.stringify(review),
        }
      );

      if (!reviewResponse.ok) {
        throw new Error(
          `Failed to submit review. HTTP error! status: ${reviewResponse.status}`
        );
      }

      const reviewData = await reviewResponse.json();
      const reviewId = reviewData.data.id;
      console.log("Review submitted:", reviewData);

      if (reviewResponse.ok) {
        const formData = new FormData();
        formData.append("photo_review", reviewPhoto);

        try {
          console.log(reviewId);
          const photoResponse = await fetch(
            `http://localhost:8000/api/review-products-photo/${reviewId}`,
            {
              method: "PUT",
              headers: {
                Cookie: `tokenCustomer=${token}`,
              },
              body: formData,
              credentials: "include",
            }
          );

          if (!photoResponse.ok) {
            throw new Error(
              `Failed to submit review photo. HTTP error! status: ${photoResponse.status}`
            );
          }

          const photoData = await photoResponse.json();
          console.log("Review photo submitted:", photoData);

          closeModal();
        } catch (photoError) {
          console.error("Failed to submit review photo:", photoError);
          // Provide specific feedback to the user about photo submission failure
        }
      }
    } catch (reviewError) {
      console.error("Failed to submit review:", reviewError);
      // Provide specific feedback to the user about review submission failure
    }
  };

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }

    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/order/user/orderList",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              accept: "application/json",
              cookie: `tokenCustomer=${token}`,
            },
            credentials: "include",
          }
        );
        const result = await response.json();
        console.log("API Response:", result);

        if (result && result.data) {
          setOrders(result.data);
        } else {
          console.error("Invalid response format:", result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, [token]);

  const completedOrders = orders.filter(
    (order) => order.status_order === "Completed"
  );

  return (
    <>
      <div className="flex items-start mt-10 text-[#212121]">
        <div className="w-1/5 border-none rounded-lg pb-8 box ">
          <SidebarCustomer />
        </div>
        <div className="w-4/5 mb-5 ">
          <h3 className="font-bold ml-6 mb-5 text-xl">Review List</h3>
          <div className="box-2">
            {completedOrders.map((order, key) => (
              <div className="box-3 mb-4" key={key}>
                <div className="flex justify-between mb-4 items-center">
                  <div className="inline-flex items-center text-sm">
                    <p className="mr-2">
                      {formatDate(order.payment.createdAt)}
                    </p>
                    <p className="inline-flex rounded-sm bg-opacity-10 py-1 px-3 text-sm font-medium mr-2 text-success bg-success">
                      {order.status_order}
                    </p>
                    <p className="mr-2 text-form-strokedark">
                      {order.code_order}
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="item-content">
                    {order.cart.checkout_product
                      .filter((detail) => detail.id_order === order.id)
                      .map((detail) => (
                        <div
                          className="flex justify-between mb-2"
                          key={detail.id}
                        >
                          <div className="flex items-center">
                            <Image
                              src={getImageUrl(
                                detail.product.photo.photo_product
                              )}
                              width={100}
                              height={100}
                              alt="product"
                              className="rounded-lg mr-4"
                            ></Image>
                            <p className="font-bold">
                              {detail.product.name_product}
                            </p>
                          </div>
                          <div className="border-line pl-5 flex items-center justify-center w-46">
                            {reviewProductId(detail.product.id, order.id) ? (
                              <button className="btn btn-disabled ">
                                Review
                              </button>
                            ) : (
                              <button
                                className="button-ulasan"
                                onClick={() => openModal(order, detail)}
                              >
                                Review
                              </button>
                            )}
                          </div>
                        </div>
                      ))}

                    <Modal
                      isOpen={modalIsOpen}
                      onRequestClose={closeModal}
                      contentLabel="Review Modal"
                      className="flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-black bg-opacity-10"
                    >
                      <div className="bg-white rounded-lg max-w-md mx-auto md:mt-24">
                        <div className="flex flex-col items-start p-4">
                          <div className="flex items-center w-full">
                            <h3 className="text-black font-medium text-lg">
                              Review for{" "}
                              <span className="font-bold">
                                &quot;{selectedProduct?.name_product}&quot;
                              </span>
                            </h3>
                            <button
                              onClick={closeModal}
                              className="ml-auto bg-transparent hover:bg-gray-200 rounded-full p-1"
                            >
                              <svg
                                className="w-6 h-6 text-black hover:text-gray-800"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                          <form
                            onSubmit={submitReview}
                            className="w-full space-y-2 mt-3"
                          >
                            <div>
                              <label className="mt-3 text-black">
                                Message Review:
                              </label>
                              <input
                                type="text"
                                name="review"
                                value={reviewMessage}
                                onChange={(e) =>
                                  setReviewMessage(e.target.value)
                                }
                                required
                                className="mt-1 p-2 w-full border rounded-md bg-white"
                              />
                            </div>
                            <div>
                              <label className="mt-3 text-black">
                                Number Review:
                              </label>
                              <br />
                              <div className="rating rating-md mt-1 p-2 border rounded-md">
                                <input
                                  type="radio"
                                  name="rating-4"
                                  className="mask mask-star-2 bg-orange-400"
                                  value="1"
                                  onChange={() => setReviewNumber(1)}
                                  checked={reviewNumber === 1}
                                />
                                <input
                                  type="radio"
                                  name="rating-4"
                                  className="mask mask-star-2 bg-orange-400"
                                  value="2"
                                  onChange={() => setReviewNumber(2)}
                                  checked={reviewNumber === 2}
                                />
                                <input
                                  type="radio"
                                  name="rating-4"
                                  className="mask mask-star-2 bg-orange-400"
                                  value="3"
                                  onChange={() => setReviewNumber(3)}
                                  checked={reviewNumber === 3}
                                />
                                <input
                                  type="radio"
                                  name="rating-4"
                                  className="mask mask-star-2 bg-orange-400"
                                  value="4"
                                  onChange={() => setReviewNumber(4)}
                                  checked={reviewNumber === 4}
                                />
                                <input
                                  type="radio"
                                  name="rating-4"
                                  className="mask mask-star-2 bg-orange-400"
                                  value="5"
                                  onChange={() => setReviewNumber(5)}
                                  checked={reviewNumber === 5}
                                />
                              </div>
                            </div>

                            <div>
                              <label
                                for="reviewPhoto"
                                className="mt-3 text-black"
                              >
                                Review Photo:
                              </label>
                              <input
                                type="file"
                                id="reviewPhoto"
                                name="reviewPhoto"
                                accept="image/*"
                                required
                                className="mt-1 p-2 w-full border rounded-md"
                                onChange={(e) =>
                                  setReviewPhoto(e.target.files[0])
                                }
                              />
                            </div>
                            <div>
                              <button
                                type="submit"
                                className="mt-3 w-full py-2 px-4 bg-primary text-white text-base font-bold rounded-md hover:bg-white hover:text-black hover:border-primary border-2 border-primary"
                              >
                                Submit
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </Modal>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewPages;
