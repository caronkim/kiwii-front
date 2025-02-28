import {STOCK_IMAGES} from "../../utils/stockImages";

export default function StockSlider() {
    return (
        <div className="overflow-hidden relative w-full">
            <div className="flex w-max animate-slide">
                {
                    [...Object.keys(STOCK_IMAGES), ...Object.keys(STOCK_IMAGES)].map((stockName, i) => {
                        return (
                            (
                                <img
                                    key={`stock-slider-${i}`}
                                    src={STOCK_IMAGES[stockName]}
                                    className="flex-grow-0 flex-shrink-0 h-20 object-cover rounded-[100px] mr-7"
                                />
                            )
                        )
                    })
                }
            </div>
            <style jsx={"true"}>{`
                @keyframes slide {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }

                .animate-slide {
                    display: flex;
                    animation: slide 8s linear infinite;
                }
            `}</style>
        </div>
    );
}
