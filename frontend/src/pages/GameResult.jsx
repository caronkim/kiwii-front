import {useLocation, useNavigate} from "react-router-dom";
import goldImage from "../assets/gold.png"

export default function GameResult() {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location?.state ?? {}; // {point: 100, headerTitle: "Kidle"}

    return (
        <div
            className="h-screen w-screen flex flex-col justify-start items-start self-stretch flex-grow overflow-hidden gap-[30px] p-2.5 bg-transparent">
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
                <p className=" text-xl font-semibold text-center text-black">{state?.headerTitle ?? '게임 결과'}</p>
            </div>
            {/*content*/}
            <div
                className="w-full flex flex-col justify-center items-center flex-grow relative overflow-hidden gap-2.5 pb-[50px]">
                <p className="h-14 text-2xl text-center text-black">
                    축하드려요!
                </p>
                <div
                    className="flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 overflow-hidden gap-[15px] px-2.5 pb-[50px]">
                    <img
                        src={goldImage}
                        className="flex-grow-0 flex-shrink-0 h-20 object-cover rounded-[100px]"
                    />
                </div>
                <p className="self-stretch flex-grow-0 flex-shrink-0 h-12 text-[32px] font-semibold text-center text-black">
                    {state?.point ?? "???"}P
                </p>
                <p className="self-stretch flex-grow-0 flex-shrink-0 h-12 text-2xl font-medium text-center text-black">
                    획득하셨어요!
                </p>
            </div>
            {/*footer*/}
            <div
                className="flex min-h-10 w-full flex-col justify-center items-center flex-grow-0 flex-shrink-0relative overflow-hidden gap-2.5 p-2.5 rounded-[10px] bg-blue-500"
                onClick={() => navigate("/point", {replace: true})}
            >
                <p className=" text-xl font-semibold text-center text-white">포인트 확인하기</p>
            </div>
        </div>
    )
}