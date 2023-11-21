import React, { useState, useEffect } from "react";
import { getAllCategory } from "../../services/fetch/category_product";
import AddCategory from "./AddCategory";
// import { DeleteCategory } from "./DeleteCategory";   


const TableCategory = () => {
    const [categorys, setCategory] = useState([]);
	useEffect(() => {
		const fetchCategory = async () => {
			const category = await getAllCategory();
			setCategory(category);
            console.log(category)
            console.log(categorys)
		};
		fetchCategory();
	}, []);
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="py-2">
        <AddCategory/>
      </div>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
        <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium  uppercase xsm:text-base">
              #
            </h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm  font-medium uppercase xsm:text-base">
            Nama category products
            </h5>
          </div>
          <div className="p-2.5 text-center  xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Action
            </h5>
          </div>
        </div>


        {categorys.map((category, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === category.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={category.id}
          >
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{category.id}</p>
            </div>
            <div className="flex items-center  gap-3 p-2.5 xl:p-5 ">
              <p className="hidden text-black dark:text-white sm:block">
                {category.name_category_products}
              </p>
            </div>

            <div className="flex items-center justify-center  p-2.5 xl:p-5">
              <button className="text-white hover:bg-meta-8 bg-warning p-2 rounded-md me-2">Edit</button>
              {/* <DeleteCategory {...category}/>  */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableCategory;
