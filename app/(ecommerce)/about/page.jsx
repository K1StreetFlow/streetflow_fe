import React from "react";
import logo from "../../../assets/img/Logo-Streetflow.png";
import Image from "next/image";

export const metadata = {
  title: "About Us | Streetflow",
};

const About = () => {
  return (
    <div className="flex flex-col md:flex-row items-center md:space-x-6 p-6 md:p-8">
      <div className="w-full md:w-1/2 justify-end">
        <Image src={logo} alt="Logo Streetflow" width={400} height={400} />
      </div>
      <div className="w-full md:w-1/2 text-black">
        <h2 className="text-2xl font-bold mb-4">About Us</h2>
        <p className=" mb-4">
          StreetFlow was founded by a group of street style fashion enthusiasts
          who were inspired by the diversity and creativity in the styles of
          young people in urban areas. We want to be a place for them to express
          themselves and find clothing choices that meet their desires
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="border rounded-md p-2">
            <h3 className="font-bold">Fast Delivery</h3>
            <p>We deliver your orders quickly.</p>
          </div>
          <div className="border rounded-md p-2">
            <h3 className="font-bold">Unisex</h3>
            <p>Our products fit all genders.</p>
          </div>
          <div className="border rounded-md p-2">
            <h3 className="font-bold">Best Quality</h3>
            <p>We guarantee the best quality.</p>
          </div>
          <div className="border rounded-md p-2">
            <h3 className="font-bold">24/7 Support</h3>
            <p>We provide support 24/7.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
