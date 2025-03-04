// 메인 페이지
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import pointIcon from "../assets/point.png";
import rankIcon from "../assets/rank.png";
import kidleLogo from "../assets/kidle.png";
import {getMyInfo} from "../api/user";

export default function Main() {
    const navigate = useNavigate();

    const [user, setUser] = useState({});

    useEffect(() => {
        async function fetchData() {
            let {message, data} = await getMyInfo();

            if (message === "error") {
                alert("something wrong");
                return;
            }

            setUser(data);
        }

        fetchData();
    }, [])

    return (
        <div
            className="bg-gray-100 w-full min-h-dvh flex flex-col px-[0.625rem] pt-[0.625rem] pb-[1.875rem] gap-[0.625rem]">
            <div className="flex flex-row p-[0.625rem] text-xl">
                <div className="font-semibold">{user.username ?? ""}</div>
                <div className="font-normal">님 환영합니다!</div>
            </div>
            <div className="flex flex-col bg-white w-full h-auto gap-[0.625rem] p-[0.625rem] rounded-[1.875rem]">
                <div onClick={() => navigate("/point")} className="flex flex-row items-center p-[0.625rem] gap-[0.625rem]">
                    {/* 포인트 로고 */}
                    <div className="h-full aspect-square rounded-[100%] bg-[#fad265] p-[0.3rem]">
                        <img src={pointIcon} alt="pointIcon" className="w-[30px] h-[30px]"/>
                    </div>
                    <div className="flex flex-row p-[0.625rem] gap-[0.625rem] flex-1">
                        <div className="font-normal">
                            포인트
                        </div>
                        <div className="font-semibold">
                            {user.point?.toLocaleString() ?? "0"} P
                        </div>
                    </div>

                    <div onClick={(e) => {
                        e.stopPropagation();
                        navigate("/draw");
                    }}
                          className="flex justify-center items-center flex-grow-0 flex-shrink-0 relative overflow-hidden gap-[5px] px-2.5 py-[5px] rounded-[20px] bg-red-500">
                        <svg
                            width={25}
                            height={26}
                            viewBox="0 0 25 26"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="flex-grow-0 flex-shrink-0 w-[25px] h-[25px] relative"
                            preserveAspectRatio="xMidYMid meet"
                        >
                            <path
                                d="M20.8334 7.79167L12.5001 3.625L4.16675 7.79167M20.8334 7.79167L12.5001 11.9583M20.8334 7.79167V18.2083L12.5001 22.375M4.16675 7.79167L12.5001 11.9583M4.16675 7.79167V18.2083L12.5001 22.375M12.5001 11.9583V22.375"
                                stroke="white"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <p className="flex-grow-0 flex-shrink-0 text-xs font-semibold text-left text-white">주식 뽑기</p>
                    </div>

                </div>
                <Link to="/rank" className="flex flex-row items-center p-[0.625rem] gap-[0.625rem]">
                    {/* 랭킹 로고 */}
                    <div className="h-full aspect-square rounded-[100%] bg-[#a0eeab] p-[0.3rem]">
                        <img src={rankIcon} alt="rankIcon" className="w-[30px] h-[30px]"/>
                    </div>
                    <div className="flex flex-row p-[0.625rem] gap-[0.625rem] flex-1">
                        <div className="font-normal">
                            랭킹
                        </div>
                        <div className="font-semibold">
                            {user.rank}위
                        </div>
                    </div>
                </Link>
            </div>
            <div className="p-[0.625rem] text-xl">
                <div className="font-semibold">게임</div>
            </div>
            <div className="flex flex-col bg-white w-full h-auto gap-[0.625rem] p-[0.625rem] rounded-[1.875rem]">
                <div className="flex flex-row gap-[0.625rem]">
                    <Link to="/kidle"
                          className="relative flex flex-col w-full aspect-square rounded-[1.875rem] bg-orange-100 p-[1.25rem]">
                        <p className="font-semibold">
                            Kidle
                        </p>
                        <p className="font-semibold text-xs text-gray-600">
                            오늘의 주식 종목은?
                        </p>
                        <img src={kidleLogo} alt="kiddleIcon"
                             className="absolute bottom-5 right-5 right-0 w-[4.5rem] h-[3.25rem]"/>
                    </Link>
                    <Link to="/kimantle"
                          className="relative flex flex-col w-full aspect-square rounded-[1.875rem] bg-yellow-100 p-[1.25rem]">
                        <p className="font-semibold">
                            Kimantle
                        </p>
                        <p className="font-semibold text-xs text-gray-600">
                            유사도 기반 종목 퀴즈
                        </p>
                        <img src={kidleLogo} alt="kiddleIcon"
                             className="absolute bottom-5 right-5 right-0 w-[4.5rem] h-[3.25rem]"/>
                    </Link>
                </div>
                <div className="flex flex-row gap-[0.625rem]">
                    <Link to="/updown"
                          className="relative flex flex-col w-full aspect-square rounded-[1.875rem] bg-green-100 p-[1.25rem]">
                        <p className="font-semibold">
                            상승/하락 예측
                        </p>
                        <p className="font-semibold text-xs text-gray-600">
                            내일의 주가를 예측해요
                        </p>
                        <img src={kidleLogo} alt="kiddleIcon"
                             className="absolute bottom-5 right-5 right-0 w-[4.5rem] h-[3.25rem]"/>
                    </Link>
                    <Link to="/quiz"
                          className="relative flex flex-col w-full aspect-square rounded-[1.875rem] bg-blue-100 p-[1.25rem]">
                        <p className="font-semibold">
                            금융 퀴즈
                        </p>
                        <p className="font-semibold text-xs text-gray-600">
                            투자를 위한 기본 상식
                        </p>
                        <img src={kidleLogo} alt="kiddleIcon"
                             className="absolute bottom-5 right-5 right-0 w-[4.5rem] h-[3.25rem]"/>
                    </Link>
                </div>
            </div>
        </div>
    )
}