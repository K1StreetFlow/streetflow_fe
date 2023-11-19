import React from "react";

export default function tableCartCustomer() {
  return (
    <table className="w-full text-sm lg:text-base" cellSpacing={0}>
      <thead>
        <tr className="h-12 uppercase">
          <th className="hidden md:table-cell" />
          <th className="text-left">Product</th>
          <th className="lg:text-right text-left pl-5 lg:pl-0">
            <span className="lg:hidden" title="Quantity">
              Qtd
            </span>
            <span className="hidden lg:inline">Quantity</span>
          </th>
          <th className="hidden text-right md:table-cell">Unit price</th>
          <th className="text-right">Total price</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="hidden pb-4 md:table-cell">
            <a href="#">
              <img
                src="https://limg.app/i/Calm-Cormorant-Catholic-Pinball-Blaster-yM4oub.jpeg"
                className="w-20 rounded"
                alt="Thumbnail"
              />
            </a>
          </td>
          <td>
            <a href="#">
              <p className="mb-2 md:ml-4">Earphone</p>
              <form action="" method="POST">
                <button type="submit" className="text-gray-700 md:ml-4">
                  <small>(Remove item)</small>
                </button>
              </form>
            </a>
          </td>
          <td className="justify-center md:justify-end md:flex mt-6">
            <div className="w-20 h-10">
              <div className="relative flex flex-row w-full h-8">
                <input
                  type="number"
                  defaultValue={2}
                  className="w-full font-semibold text-center text-gray-700 bg-gray-200 outline-none focus:outline-none hover:text-black focus:text-black"
                />
              </div>
            </div>
          </td>
          <td className="hidden text-right md:table-cell">
            <span className="text-sm lg:text-base font-medium">10.00€</span>
          </td>
          <td className="text-right">
            <span className="text-sm lg:text-base font-medium">20.00€</span>
          </td>
        </tr>
        <tr>
          <td className="hidden pb-4 md:table-cell">
            <a href="#">
              <img
                src="https://limg.app/i/Cute-Constrictor-Super-Sexy-Military-Enforcer-W7mvBp.png"
                className="w-20 rounded"
                alt="Thumbnail"
              />
            </a>
          </td>
          <td>
            <p className="mb-2 md:ml-4">Tesla Model 3</p>
            <form action="" method="POST">
              <button type="submit" className="text-gray-700 md:ml-4">
                <small>(Remove item)</small>
              </button>
            </form>
          </td>
          <td className="justify-center md:justify-end md:flex md:mt-4">
            <div className="w-20 h-10">
              <div className="relative flex flex-row w-full h-8">
                <input
                  type="number"
                  defaultValue={3}
                  className="w-full font-semibold text-center text-gray-700 bg-gray-200 outline-none focus:outline-none hover:text-black focus:text-black"
                />
              </div>
            </div>
          </td>
          <td className="hidden text-right md:table-cell">
            <span className="text-sm lg:text-base font-medium">49,600.01€</span>
          </td>
          <td className="text-right">
            <span className="text-sm lg:text-base font-medium">
              148,800.03€
            </span>
          </td>
        </tr>
        <tr>
          <td className="hidden pb-4 md:table-cell">
            <a href="#">
              <img
                src="https://limg.app/i/Successful-Spider-Biblical-Mutant---Total-War-lKoE7D.jpeg"
                className="w-20 rounded"
                alt="Thumbnail"
              />
            </a>
          </td>
          <td>
            <p className="mb-2 md:ml-4">Bic 4 colour pen</p>
            <form action="" method="POST">
              <button type="submit" className="text-gray-700 md:ml-4">
                <small>(Remove item)</small>
              </button>
            </form>
          </td>
          <td className="justify-center md:justify-end md:flex md:mt-8">
            <div className="w-20 h-10">
              <div className="relative flex flex-row w-full h-8">
                <input
                  type="number"
                  defaultValue={5}
                  className="w-full font-semibold text-center text-gray-700 bg-gray-200 outline-none focus:outline-none hover:text-black focus:text-black"
                />
              </div>
            </div>
          </td>
          <td className="hidden text-right md:table-cell">
            <span className="text-sm lg:text-base font-medium">1.50€</span>
          </td>
          <td className="text-right">
            <span className="text-sm lg:text-base font-medium">7.50€</span>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
