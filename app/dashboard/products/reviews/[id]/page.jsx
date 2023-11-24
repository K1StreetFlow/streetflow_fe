import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import BackReview from "@/app/dashboard/products/reviews/backReviewProducts";
import Image from "next/image";
async function getReviewProductById(id) {
  const res = await fetch(`http://localhost:8000/api/review-products/${id}`, {
    next: {
      revalidate: 0,
    },
  });
  return res.json();
}

function getImageUrl(filename) {
	return `http://localhost:8000/api/review-products-photo/view/${filename}`;
}

const RatingDisplay = ({ numberReview }) => {
  const filledStars = Array.from({ length: numberReview }, (_, index) => (
    <input
      key={index}
      type="radio"
      name="rating-9"
      className="mask mask-star-2"
      checked={index === numberReview - 1} // Menandai bintang terisi sesuai dengan nilai database
    />
  ));

  const emptyStars = Array.from({ length: 5 - numberReview }, (_, index) => (
    <input
      key={index + numberReview}
      type="radio"
      name="rating-9"
      className="mask mask-star-2"
    />
  ));

  return (
    <div className="rating rating-lg">
      <input type="radio" name="rating-9" className="rating-hidden" />
      {filledStars}
      {emptyStars}
    </div>
  );
};

const ReviewProducts = async ({ params }) => {
  const { data } = await getReviewProductById(params.id);

  console.log(data);

  return (
    <>
      <Breadcrumb pageName="Reviews" />

      <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-9 ">
        <h2 className="mb-5 font-bold text-xl">Review Products Detail</h2>
        <div className="flex flex-col gap-7.5">
          <div className="flex flex-row gap-5.5 ">
            <div className="flex flex-col gap-5.5 sm:flex-row">
              <div className="w-full sm:w-110">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="photoReview"
                >
                  Photo Review
                </label>
                <div className="relative">
                  <Image
                    src={getImageUrl(data.photo_review)}
                    width={100}
                    height={100}
                    alt={data.photo_review} 
                    className="rounded-md mr-4"/>
                </div>
              </div>
            </div>
            <div className="w-[150%] sm:w-110 h-[20%]">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="fullName"
              >
                Customer Name
              </label>
              <div className="relative">
                <h3>{data.users_customer.fullname}</h3>
              </div>
              <div className="h-5"></div>
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="messageReview"
              >
                Message Review
              </label>
              <div>
                <h3>{data.message_review}</h3>
              </div>
            </div>

            <div className="w-full h-[20%]">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="productName"
              >
                Product Name
              </label>

              <h3>{data.products.name_product}</h3>
              <div className="h-5"></div>
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="numberReview"
              >
                Number Review
              </label>
              <div className="relative">
                <RatingDisplay numberReview={data.number_review} />
              </div>
            </div>
            <div className="w-full h-[20%]">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="codeOrder"
              >
                Code Order
              </label>

              <h3>{data.order_list.code_order}</h3>
            </div>
          </div>
          <div className="flex items-center space-x-3.5">
          <BackReview />    
          </div>
        </div> 
        <div>
        </div>
      </div>
    </>
  );
};

export default ReviewProducts;