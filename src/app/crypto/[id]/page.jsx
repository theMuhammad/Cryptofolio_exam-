"use client";

import { CryptoContext } from "@/app/context/CryptoContext";
import { useContext } from "react";
import ApexChart from "@/components/apexChart";

const SingleCryptoPage = () => {
  const {
    singleCrypto,
    trunkDescription,
    convertCurrency,
    current,
    NumberToMillions,
    convertMarketCup,
    cryptoData,
  } = useContext(CryptoContext);

  console.log(singleCrypto);

  return (
    <div className="mt-16 flex">
      <div className="bg-[#18191b] w-[550px] h-[665px] flex flex-col items-center px-5">
        <img
          className="w-50 h-50 mt-6"
          src={singleCrypto.image?.large}
          alt={singleCrypto.name}
        />
        <div>
          <h3 className="text-white text-center text-4xl font-bold leading-[56px] mt-5">
            {singleCrypto.name}
          </h3>
          <p className="py-5 text-lg font-normal">
            {trunkDescription(singleCrypto.description.en, 250)}
          </p>
          <p className="text-lg">
            <span className="text-xl">Rank: </span>
            <span className="text-xl">
              {singleCrypto.market_cap_rank}
            </span>
          </p>
          <div className="text-lg text-white">
            <span className="text-xl">Current Price:</span>
            {current === "₹"
              ? ` ${current} ${convertCurrency(
                  singleCrypto.market_data.current_price.usd,
                  1
                )} `
              : current === "$"
              ? ` ${current} ${convertCurrency(
                  singleCrypto.market_data.current_price.usd,
                  0.012
                )} `
              : ` ${current} ${convertCurrency(
                  singleCrypto.market_data.current_price.usd,
                  0.0111
                )}`}
          </div>
          <div className="text-lg">
            <span className="text-xl">Market Cap:</span>
            {current === "₹"
              ? `${current} ${NumberToMillions(
                  singleCrypto.market_data.market_cap.usd,
                  1
                )} `
              : current === "$"
              ? `${current} ${NumberToMillions(
                  convertMarketCup(
                    singleCrypto.market_data.market_cap.usd,
                    0.012
                  )
                )} `
              : ` ${current} ${NumberToMillions(
                  convertMarketCup(
                    singleCrypto.market_data.market_cap.usd,
                    0.0111
                  )
                )}`}
          </div>
        </div>
      </div>
      <div className="flex items-center mt-8 w-[3px] h-[600px] bg-gray-600"></div>
      <div className="w-full">
        <ApexChart data={cryptoData} />
      </div>
    </div>
  );
};

export default SingleCryptoPage;
