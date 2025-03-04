// 주식 상승/하락 예측 페이지
import {useState, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import arrowUp from "../assets/arrow-up.png";
import arrowDown from "../assets/arrow-down.png";
import {getStockUpDown, postPredictStockUpDown} from "../api/stockUpDown";
import {STOCK_IMAGES} from "../utils/stockImages";


export default function StockUpDown() {
    const navigate = useNavigate();

    const isProcessing = useRef(true);
    const [stock, setStock] = useState("다우기술");
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    function optionOpacity(option) {
        if (option === selectedAnswer) {
            return "opacity-100";
        } else {
            return "opacity-50";
        }
    }

    async function selectAnswer(option) {
        if (isProcessing.current) {
            return;
        }
        isProcessing.current = true;
        try {
            setSelectedAnswer(option);
            let {message} = await postPredictStockUpDown(option);
            if (message === "success") {
                alert("예측 참여에 성공했습니다.");
                navigate(-1);
            }
        } finally {
            isProcessing.current = false;
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const {message, data} = await getStockUpDown();
                console.log(message, data);
                setStock(data?.companyName ?? "");

                if (message === "no trial today") {

                } else {
                    alert("오늘 이미 참여했습니다.");
                    navigate(-1);
                }
            } finally {
                isProcessing.current = false;
            }
        }

        fetchData();
    }, [])

    return (
        <div className="flex w-full min-h-dvh flex-col px-[0.625rem] pt-[0.625rem] pb-[1.875rem] gap-[1.875rem]">
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
                <p className=" text-xl font-semibold text-center text-black">상승/하락 예측</p>
            </div>
            {/* content */}
            <div className="flex flex-col p-[0.625rem] gap-[1.875rem]">
                {/* 문제 */}
                <div className="flex flex-col gap-[0.625rem]">
                    {/* 기업정보 */}
                    <div className="flex flex-row justify-center gap-[0.625rem]">
                        {/* 기업 로고 */}
                        <div>
                            <img alt={"logo"} src={STOCK_IMAGES[stock]} className="h-[1.875rem] rounded-full"/>
                        </div>
                        {/* 기업명 */}
                        <div className="">
                            <p className="font-semibold text-2xl">{stock}</p>
                        </div>
                    </div>
                    <p className="m-auto text-center text-2xl">
                        내일 주가가 어떻게 될까요?
                    </p>
                </div>

                {/* 선택 폼 */}
                <div className="flex flex-row gap-[0.625rem] p-[0.675rem]">
                    {/* 오름 */}
                    <div
                        className={`flex flex-col justify-center gap-[1.875rem] bg-[#0051ff] rounded-xl w-full aspect-square ${optionOpacity("O")}`}
                        onClick={() => {
                            selectAnswer("O")
                        }}
                    >
                        <div>
                            <img alt={"arrowUp"} src={arrowUp} className="w-15 m-auto"/>
                        </div>
                        <p className="text-center text-white text-2xl">
                            오른다
                        </p>
                    </div>
                    {/* 내림 */}
                    <div
                        className={`flex flex-col justify-center gap-[1.875rem] bg-[#ff002b] rounded-xl w-full aspect-square ${optionOpacity("X")}`}
                        onClick={() => {
                            selectAnswer("X")
                        }}
                    >
                        <div>
                            <img alt={"arrowDown"} src={arrowDown} className="w-15 m-auto"/>
                        </div>
                        <p className="text-center text-white text-2xl">
                            내린다
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}