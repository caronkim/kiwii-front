// 메인 페이지

import {Link} from "react-router-dom";
import {useCookies} from "react-cookie";
import pointIcon from "../assets/point.png"
import rankIcon from "../assets/rank.png"
import kidleLogo from "../assets/kidle.png"
// import kimantleLogo from "../assets/kimantle.png"
// import updownLogo from "../assets/updown.png"
// import quizLogo from "../assets/quiz.png"

export default function Main() {
    const [cookies] = useCookies(["uuid"]); // userId 쿠키 가져오기
    console.log(cookies);
    return (
        <div className="bg-gray-100 w-screen h-screen flex flex-col px-[0.625rem] pt-[0.625rem] pb-[1.875rem] gap-[0.625rem]">
            <div className="flex flex-row p-[0.625rem] text-xl">
                <div className="font-semibold">kiwii</div>
                <div className="font-normal">님 환영합니다!</div>
            </div>
            <div className="flex flex-col bg-white w-full h-auto gap-[0.625rem] p-[0.625rem] rounded-[1.875rem]">
                <Link to="/point" className="flex flex-row p-[0.625rem] gap-[0.625rem]">
                    {/* 포인트 로고 */}
                    <div className="h-full aspect-square rounded-[100%] bg-[#fad265] p-[0.3rem]">
                        <img src={pointIcon} alt="pointIcon" className="w-full h-full"/>
                    </div>
                    <div className="flex flex-row p-[0.625rem] gap-[0.625rem] w-full">
                        <div className="font-normal">
                            포인트
                        </div>
                        <div className="font-semibold">
                            19400 P
                        </div>
                    </div>
                </Link>
                <Link to="/rank" className="flex flex-row p-[0.625rem] gap-[0.625rem]">
                    {/* 랭킹 로고 */}
                    <div className="h-full aspect-square rounded-[100%] bg-[#a0eeab] p-[0.3rem]">
                        <img src={rankIcon} alt="rankIcon" className="w-full h-full"/>
                    </div>
                    <div className="flex flex-row p-[0.625rem] gap-[0.625rem] w-full">
                        <div className="font-normal">
                            랭킹
                        </div>
                        <div className="font-semibold">
                            192,000 위
                        </div>
                    </div>
                </Link>
            </div>
            <div className="p-[0.625rem] text-xl">
                <div className="font-semibold">게임</div>
            </div>
            <div className="flex flex-col bg-white w-full h-auto gap-[0.625rem] p-[0.625rem] rounded-[1.875rem]">
                <div className="flex flex-row gap-[0.625rem]">
                    <Link to="/kidle" className="relative flex flex-col w-full aspect-square rounded-[1.875rem] bg-orange-100 p-[1.25rem]">
                        <p className="font-semibold">
                            Kidle
                        </p>
                        <p className="font-semibold text-xs text-gray-600">
                            오늘의 주식 종목은?
                        </p>
                        <img src={kidleLogo} alt="kiddleIcon" className="absolute bottom-5 right-5 right-0 w-[4.5rem] h-[3.25rem]"/>
                    </Link>
                    <Link to="/kimantle" className="relative flex flex-col w-full aspect-square rounded-[1.875rem] bg-yellow-100 p-[1.25rem]">
                        <p className="font-semibold">
                            Kimantle
                        </p>
                        <p className="font-semibold text-xs text-gray-600">
                            유사도 기반 종목 퀴즈
                        </p>
                        <img src={kidleLogo} alt="kiddleIcon" className="absolute bottom-5 right-5 right-0 w-[4.5rem] h-[3.25rem]"/>
                    </Link>
                </div>
                <div className="flex flex-row gap-[0.625rem]">
                    <Link to="/updown" className="relative flex flex-col w-full aspect-square rounded-[1.875rem] bg-green-100 p-[1.25rem]">
                        <p className="font-semibold">
                            상승/하락 예측
                        </p>
                        <p className="font-semibold text-xs text-gray-600">
                            내일의 주가를 예측해요
                        </p>
                        <img src={kidleLogo} alt="kiddleIcon" className="absolute bottom-5 right-5 right-0 w-[4.5rem] h-[3.25rem]"/>
                    </Link>
                    <Link to="/quiz" className="relative flex flex-col w-full aspect-square rounded-[1.875rem] bg-blue-100 p-[1.25rem]">
                        <p className="font-semibold">
                            금융 퀴즈
                        </p>
                        <p className="font-semibold text-xs text-gray-600">
                            투자를 위한 기본 상식
                        </p>
                        <img src={kidleLogo} alt="kiddleIcon" className="absolute bottom-5 right-5 right-0 w-[4.5rem] h-[3.25rem]"/>
                    </Link>
                </div>
            </div>
        </div>
    )
}