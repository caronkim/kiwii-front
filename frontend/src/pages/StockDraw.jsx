// 주식 뽑기 페이지
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import StockSlider from "../components/stockDraw/StockSlider";
import {STOCK_IMAGES} from "../utils/stockImages";
import kiwoomHerosImage from "../assets/kiwoomHeros.png";
import Loading from "../components/Loading";
import {postDrawStock} from "../api/stock";

export default function StockDraw() {
    const navigate = useNavigate();

    const [drewStock, setDrewStock] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [isDraw, setIsDraw] = useState(false);

    async function drawStock() {
        if (isLoading) {
            return;
        }
        setLoading(true);
        let success = false;

        try {
            let {message, data} = await postDrawStock();
            if (message === "success") {
                const match = data.content.match(/랜덤 주식 뽑기 (.+)/);
                const stockName = match ? match[1] : "";
                setDrewStock(stockName);
                success = true;
            } else if ("not enough point") {
                alert("포인트(500p)가 부족합니다.");
            } else {
                alert("something wrong");
            }
        } finally {
            if (success) {
                setTimeout(() => {
                    if (success) {
                        setIsDraw(true);
                    }
                    setLoading(false);
                }, 500)
            } else {
                setLoading(false);
            }
        }
    }


    return (
        <div
            className="flex w-full min-h-dvh flex-col justify-start items-start self-stretch flex-grow overflow-hidden gap-[30px] p-2.5 bg-transparent">
            {
                isLoading ?
                    <Loading/> : <></>
            }
            {/*header*/}
            <div
                className="flex justify-start items-center relative gap-2.5 p-2.5 bg-transparent">
                <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className=" w-6 h-6 relative"
                    preserveAspectRatio="none"
                    onClick={() => navigate(-1)}
                >
                    <path
                        d="M15 19L8 12L15 5"
                        stroke="#3F3F46"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <p className=" text-xl font-semibold text-center text-black">주식 뽑기</p>
            </div>
            {/*content*/}
            {
                isDraw ? <AfterStockDrawContent drewStock={drewStock}/> : <BeforeStockDrawContent/>
            }
            {/*footer*/}
            {
                isDraw ? <AfterStockDrawFooter/> : <BeforeStockDrawFooter drawStock={drawStock}/>
            }
        </div>
    )
}

function BeforeStockDrawContent() {
    return (
        <div
            className="w-full flex flex-col justify-center items-center flex-grow relative overflow-hidden gap-2.5 pb-[50px]">
            <div className="w-full h-14 text-2xl text-center text-black"/>
            <div
                className="flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 overflow-hidden gap-[15px] px-2.5 pb-[50px]">
                <StockSlider/>
            </div>
            <p className="self-stretch flex-grow-0 flex-shrink-0 h-12 text-[32px] font-semibold text-center text-black">
                두구두구
            </p>
            <p className="self-stretch flex-grow-0 flex-shrink-0 h-12 text-2xl font-medium text-center text-black">
                어떤 주식을 받게될까요?
            </p>
        </div>
    )
}

function BeforeStockDrawFooter({drawStock}) {
    return (
        <div
            className="flex min-h-10 w-full flex-col justify-center items-center flex-grow-0 flex-shrink-0relative overflow-hidden gap-2.5 p-2.5 rounded-[10px] bg-blue-500"
            onClick={() => {
                drawStock();
            }}
        >
            <p className=" text-xl font-semibold text-center text-white">포인트로 뽑기</p>
        </div>
    )
}

function AfterStockDrawContent({drewStock}) {
    return (
        <div
            className="w-full flex flex-col justify-center items-center flex-grow relative overflow-hidden gap-2.5 pb-[50px]">
            <p className="h-14 text-2xl text-center text-black">
                축하드려요!
            </p>
            <div
                className="flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 overflow-hidden gap-[15px] px-2.5 pb-[50px]">
                <img
                    src={STOCK_IMAGES[drewStock]}
                    className="flex-grow-0 flex-shrink-0 h-20 object-cover rounded-[100px]"
                />
            </div>
            <p className="self-stretch flex-grow-0 flex-shrink-0 h-12 text-[32px] font-semibold text-center text-black">
                {drewStock}
            </p>
            <p className="self-stretch flex-grow-0 flex-shrink-0 h-12 text-2xl font-medium text-center text-black">
                획득하셨네요!
            </p>
        </div>
    )
}

function AfterStockDrawFooter() {
    return (
        <div
            className="flex min-h-10 w-full justify-center items-center flex-grow-0 flex-shrink-0relative overflow-hidden gap-2.5 p-2.5 rounded-[10px] bg-blue-900"
            onClick={() => {
                alert("coming soon!");
            }}>
            <img
                src={kiwoomHerosImage}
                className="self-stretch flex-grow-0 flex-shrink-0 w-[56.63px] h-[30px] relative overflow-hidden"/>
            <p className="flex-grow-0 flex-shrink-0 text-xl font-medium text-center text-white">
                에서 확인하기
            </p>
        </div>
    )
}