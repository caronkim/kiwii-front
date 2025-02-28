// Kimantle 페이지
import {useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import { getKimantleTrials, postKimantleTrial } from "../api/kimantle";
import {useCookies} from "react-cookie";

export default function Kimantle() {
    const [keyword, setKeyword] = useState();
    const [lastKeywords, setLastKeywords] = useState();
    const [lastKeyword, setLastKeyword] = useState();
    const [cookies] = useCookies(["uuid"]);
    const userId = parseInt(cookies.uuid);

    const navigate = useNavigate();

    const fetchKimantle = async () => {
        let result = await getKimantleTrials(userId);
        if (result.status == "success") {
            setLastKeywords(result.history)
            if (lastKeywords) {
                for (let k in lastKeywords) {
                    if (k.word === keyword) {
                        setLastKeyword(k);
                        break;
                    }
                }
            }
        }
    }

    useEffect(() => {
        fetchKimantle();
    },[])

    const handleClick = async () => {
        const fetchTrial = async () => {
            let result = await postKimantleTrial(userId, keyword);
            if (result.status == "success") {
                console.log(result);
                await fetchKimantle();
            } else {
                alert(result.message);
                console.log(result)
            }
        }
        fetchTrial();
    }

    const handleInputChange = (e) => {
        setKeyword(e.target.value);
        console.log(e.target.value);
    }

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
                <p className="text-xl font-semibold text-center text-black">Kimantle</p>
            </div>
            {/* content */}
            <div className="flex flex-col p-[0.625rem] gap-[1.875rem]">
                <p className="text-2xl text-center">
                    단어를 입력하세요!
                </p>
                {/* 문제 */}
                <div className="flex flex-col gap-[0.625rem] w-full p-[0.625rem]">
                    <input type="text" className="w-full p-[0.625rem] border border-gray-300 rounded-xl"
                        onChange={handleInputChange}/>
                    <div className="bg-blue-500 w-full rounded-xl p-[0.625rem] text-white text-center font-semibold"
                        onClick={handleClick}>
                        추측하기
                    </div>
                </div>
                {/* 유사도 */}
                <div className="flex flex-col w-full gap-[0.625rem]">
                    
                    {lastKeyword && <>
                        <div className="p-[0.625rem] text-xl font-bold">
                            <p className="">이전 단어의 유사도</p>
                        </div>
                        <div className={"flex flex-row px-[0.625rem] py-[1.25rem] rounded-xl gap-[1.25rem]" 
                                        + (lastKeyword.cos_sim < 0 ? "bg-red-50" : lastKeyword.cos_sim == 0 ? "bg-gray-50" : "bg-blue-50")}>
                            <div className="my-auto">
                                <p className={"font-semibold text-xl" + + (lastKeyword.cos_sim < 0 ? "text-red-500" : lastKeyword.cos_sim == 0 ? "text-gray-500" : "text-blue-500")}>{lastKeyword.rank}</p>
                            </div>
                            <div className="w-full my-auto">
                                <p className="font-semibold text-xl">{lastKeyword.word}</p>
                            </div>
                            <div>
                                <div className="rounded-xl bg-blue-100 px-[0.625rem] p-1">
                                    <p className="font-semibold text-blue-500 rounded-xl">+17.79</p>
                                </div>
                            </div>
                        </div>
                    
                    
                        <div className="flex flex-col gap-[0.625rem] p-[0.625rem]">
                            <div className="text-xl font-bold">
                                <p className="">이전 기록</p>
                            </div>
                            {
                                lastKeywords.map((log) => {
                                    return (
                                        <div className="flex flex-row py-[0.625rem] rounded-xl gap-[1.25rem]">
                                            <div className="my-auto">
                                                <p className="text-blue-500 font-semibold text-xl">{log.rank}</p>
                                            </div>
                                            <div className="w-full my-auto">
                                                <p className="font-semibold text-xl">{log.word}</p>
                                            </div>
                                            <div>
                                                {log.cos_sim < 0 ? (
                                                        <div className="rounded-xl bg-red-100 px-[0.625rem] p-1">
                                                            <p className="font-semibold text-red-500 rounded-xl">{log.cos_sim}</p>
                                                        </div>
                                                    ) : log.cos_sim == 0 ? (
                                                        <div className="rounded-xl bg-gray-100 px-[0.625rem] p-1">
                                                            <p className="font-semibold text-gray-500 rounded-xl">+0.0</p>
                                                        </div>
                                                    ) : (
                                                        <div className="rounded-xl bg-blue-100 px-[0.625rem] p-1">
                                                            <p className="font-semibold text-blue-500 rounded-xl">+{log.cos_sim}</p>
                                                        </div>
                                                    )
                                                }
                                                <div className="rounded-xl bg-blue-100 px-[0.625rem] p-1">
                                                    <p className="font-semibold text-blue-500 rounded-xl">+17.79</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            {/* <div className="flex flex-row py-[0.625rem] rounded-xl gap-[1.25rem]">
                                <div className="my-auto">
                                    <p className="text-blue-500 font-semibold text-xl">1</p>
                                </div>
                                <div className="w-full my-auto">
                                    <p className="font-semibold text-xl">미래에셋증권</p>
                                </div>
                                <div>
                                    <div className="rounded-xl bg-blue-100 px-[0.625rem] p-1">
                                        <p className="font-semibold text-blue-500 rounded-xl">+17.79</p>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </>}
                </div>
            </div>
        </div>
    )
}