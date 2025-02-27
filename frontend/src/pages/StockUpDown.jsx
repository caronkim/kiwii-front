// 주식 상승/하락 예측 페이지
import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";

import arrowUp from "../assets/arrow-up.png";
import arrowDown from "../assets/arrow-down.png";

// 예시 기업 로고
import kiwoom from "../assets/kiwoom.png"


export default function StockUpDown() {
    // todo:: userId
    const userId = 1;

    const navigate = useNavigate();
    
    return (
        <div className="w-screen h-screen flex flex-col px-[0.625rem] pt-[0.625rem] pb-[1.875rem] gap-[1.875rem]">
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
                            <img src={kiwoom} className="h-[1.875rem]" />
                        </div>
                        {/* 기업명 */}
                        <div className="">
                            <p className="font-semibold text-2xl">키움증권</p>
                        </div>
                    </div>
                    <p className="m-auto text-center text-2xl">
                        내일 주가가 어떻게 될까요?
                    </p>
                </div>
                
                {/* 선택 폼 */}
                <div className="flex flex-row gap-[0.625rem] p-[0.675rem]">
                    {/* 오름 */}
                    <div className="flex flex-col justify-center gap-[1.875rem] bg-[#0051ff] opacity-[50%] rounded-xl w-full aspect-square">
                        <div>
                            <img src={arrowUp} className="w-15 m-auto"/>
                        </div>
                        <p className="text-center text-white text-2xl">
                            오른다
                        </p>
                    </div>
                    {/* 내림 */}
                    <div className="flex flex-col justify-center gap-[1.875rem] bg-[#ff002b] opacity-[50%] rounded-xl w-full aspect-square">
                        <div>
                            <img src={arrowDown} className="w-15 m-auto"/>
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