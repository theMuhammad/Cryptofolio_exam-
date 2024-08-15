import { CryptoContext } from "@/app/context/CryptoContext";
import React, { useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Carusel() {
  const { caruselData, current, convertCurrency, getPriceTrunk, getCryptoById } = useContext(CryptoContext);
  console.log(caruselData);

  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 2300,
  };

  return (
    <div>
      <div
        className="text-white mt-16 h-[400px] bg-no-repeat bg-cover"
        style={{ backgroundImage: `url("/bghero.png")` }}
      >
        <div className="w-[1230px] mx-auto">
          <div className="text-center">
            <h1 className="pt-16 text-6xl font-bold leading-[72px] tracking-[-0.5px] text-center text-sky-400">
              CRYPTOFOLIO WATCH LIST
            </h1>
            <p className="pt-2 text-sm font-medium leading-[22px] tracking-wide text-center text-gray-400">
              Get all the Info regarding your favorite Crypto Currency
            </p>
          </div>
        </div>
        <div className="slider-container w-[1230px] mx-auto">
          <Slider {...settings}>
            {caruselData.map((crypto) => (
              <div key={crypto.id} onClick={() => getCryptoById(crypto.id)}>
                <div className="carousel-item flex flex-col items-center mt-9 cursor-pointer">
                  <img
                    src={crypto.image}
                    alt={crypto.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="mt-2 text-lg font-bold text-center">
                      {crypto.symbol.toUpperCase()}{" "}
                      <span
                        className={
                          crypto.price_change_percentage_24h > 0
                            ? "text-green-600 text-sm"
                            : "text-red-800 text-sm"
                        }
                      >
                        {crypto.price_change_percentage_24h > 0
                          ? getPriceTrunk(
                            `+` + crypto.price_change_percentage_24h
                          )
                          : getPriceTrunk(crypto.price_change_percentage_24h)}
                        %
                      </span>
                    </h3>
                    <p className="text-2xl text-center text-white">
                      {current === "₹"
                        ? `${current} ${convertCurrency(
                          crypto.current_price,
                          1
                        )} `
                        : current === "$"
                          ? `${current} ${convertCurrency(
                            crypto.current_price,
                            0.012
                          )} `
                          : ` ${current} ${convertCurrency(
                            crypto.current_price,
                            0.0111
                          )}`}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default Carusel;
