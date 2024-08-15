"use client";

import React, { useContext, useMemo } from "react";
import { CryptoContext } from "@/app/context/CryptoContext";
import { CgDanger } from "react-icons/cg";
import Link from "next/link";

function Header() {
  const {
    current,
    handleCurrencyChange,
    handleOpenWatchList,
    openWatchList,
    convertCurrency,
    watchList,
    removeFromWatchList,
  } = useContext(CryptoContext);

  const watchListWithPrices = useMemo(() => {
    return watchList?.map((crypto) => ({
      ...crypto,
      convertedPrice:
        current === "$"
          ? convertCurrency(crypto.current_price, 1)
          : current === "₹"
            ? convertCurrency(crypto.current_price, 0.012)
            : convertCurrency(crypto.current_price, 0.0111),
    }));
  }, [watchList, current, convertCurrency]);

  return (
    <div>
      <div className="fixed top-0 w-full bg-[#18191b] shadow-md z-10">
        <div className="w-[1230px] h-[64px] flex mx-auto justify-between items-center">
          <div>
            <Link href={"/"}>
              <h2 className="text-2xl font-bold text-sky-400 tracking-wider">
                CRYPTOFOLIO
              </h2>
            </Link>
          </div>
          <div className="flex items-center">
            <div className="font-bold">
              <select
                className="bg-[#18191b] text-white mr-3 font-bold border-none outline-none"
                value={current}
                onChange={handleCurrencyChange}
              >
                <option value="$">$  USD</option>
                <option value="€">€  EUR</option>
                <option value="₹">₹  INR</option>
                <option value="﷼">﷼  SAR</option>
              </select>
            </div>
            <div>
              <button
                className="bg-blue-300 py-2 px-5 rounded-md text-black font-bold"
                onClick={handleOpenWatchList}
              >
                Watchlist
              </button>
            </div>
          </div>
        </div>
      </div>
      {openWatchList && (
        <div className="fixed right-0 w-[450px] h-[650px] bg-[#515151] rounded-xl z-20 flex flex-col">
          <h2 className="text-3xl font-bold text-center my-5 font-sans">
            Watch List
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-5 overflow-y-scroll scrollbar-hidden">
            {watchListWithPrices && watchListWithPrices.length > 0 ? (
              watchListWithPrices.map((crypto) => (
                <div key={crypto.id}>
                  <div className="w-[200px] h-[250px] flex flex-col mb-7 items-center bg-gray-950 rounded-2xl">
                    <img
                      className="w-[118px] h-[118px] mt-4"
                      src={crypto.image}
                      alt={crypto.name}
                      loading="lazy" 
                    />
                    <p className="text-xl mt-9 text-white">
                      {`${current} ${crypto.convertedPrice}`} 
                    </p>
                    <button
                      onClick={() => removeFromWatchList(crypto.id)}
                      className="bg-red-600 px-5 py-1 rounded-lg text-white"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center gap-3 text-red-600 font-bold">
                <CgDanger /> Empty watchlist
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default React.memo(Header); 