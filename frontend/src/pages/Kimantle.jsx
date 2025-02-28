// Kimantle 페이지
import {useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import { getKimantleTrials, postKimantleTrial } from "../api/kimantle";
import {useCookies} from "react-cookie";

export default function Kimantle() {
    const [keyword, setKeyword] = useState();
    const [lastKeywords, setLastKeywords] = useState();
    const [lastKeyword, setLastKeyword] = useState();
    const [isEnd, setIsEnd] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [cookies] = useCookies(["uuid"]);
    const userId = parseInt(cookies.uuid);

    const navigate = useNavigate();

    const fetchKimantle = async () => {
        let result = await getKimantleTrials(userId);
        console.log("result", result.status)
        if (result.status === "success") {
            if (result.history) {
                if (result.history.length == 10) {
                    setIsEnd(true)
                }
                for (let k of result.history) {
                    if(k.rank == 0) {
                        setIsEnd(true);
                        setIsCorrect(true);
                    }
                }
                setLastKeyword(result.history.shift());
            }
            // 랭크 기준으로 정렬
            setLastKeywords(result.history.sort((a, b) => b.cosineSimilarity - a.cosineSimilarity))
        } else {
            alert("통신 불가")
        }
    }

    useEffect(() => {
        fetchKimantle();
    },[])

    const handleClick = async () => {
        const fetchTrial = async () => {
            let result = await postKimantleTrial(userId, keyword);
            if (result.status == "success") {
                await fetchKimantle();
            } else {
                alert(result.message);
                
            }
        }
        for (let k of lastKeywords) {
            if (k.word == keyword) {
                alert("이미 시도하셨습니다.");
                setKeyword("");
                return;
            }
        }
        fetchTrial();
        setKeyword("");
    }

    const handleInputChange = (e) => {
        setKeyword(e.target.value);
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
                <p className={"text-2xl text-center " + (isEnd ? "font-semibold" : "")}>
                    { !isEnd ? "단어를 입력하세요!" : isCorrect ? "🎉축하드려요🎉" : "😓아쉬워요😓"}
                </p>
                {
                    isEnd ? (isCorrect ? 
                        (<p className="text-xl text-center">오늘의 단어를 맞추셨어요!</p>) : 
                        (<p className="text-xl text-center">내일 다시 도전해봐요! </p>)) : ""
                }
                {/* 문제 */}
                <div className="flex flex-col gap-[0.625rem] w-full p-[0.625rem]">
                    { !isEnd && <>
                        <input type="text" className="w-full p-[0.625rem] border border-gray-300 rounded-xl"
                            value={keyword}
                            onChange={handleInputChange}/>
                        <div className="bg-blue-500 w-full rounded-xl p-[0.625rem] text-white text-center font-semibold"
                            onClick={handleClick}>
                            추측하기
                        </div>
                    </>
                    }
                </div>
                {/* 유사도 */}
                <div className="flex flex-col w-full gap-[0.625rem]">
                    
                    {lastKeyword && <>
                        <div className="p-[0.625rem] text-xl font-bold">
                            <p className="">이전 단어의 유사도</p>
                        </div>
                        <div className={"flex flex-row px-[0.625rem] py-[1.25rem] rounded-xl gap-[1.25rem] " 
                                        + (Math.floor(lastKeyword.cosineSimilarity * 10) / 10 < 0 ? "bg-red-50" : Math.floor(lastKeyword.cosineSimilarity * 10) / 10 == 0.0 ? "bg-gray-50" : "bg-blue-50")}>
                            <div className="my-auto">
                                <p className="font-semibold text-xl text-blue-500 min-w-[3.5rem] text-center">{lastKeyword.rank > 1000 ? ">1000" : lastKeyword.rank}</p>
                            </div>
                            <div className="w-full my-auto">
                                <p className="font-semibold text-xl">{lastKeyword.word}</p>
                            </div>
                            <div>
                                <div className={"rounded-xl px-[0.625rem] p-1 " + (Math.floor(lastKeyword.cosineSimilarity * 10) / 10 < 0 ? "bg-red-100" : Math.floor(lastKeyword.cosineSimilarity * 10) / 10 == 0 ? "bg-gray-100" : "bg-blue-100")}>
                                    <p className={"font-semibold rounded-xl " + (Math.floor(lastKeyword.cosineSimilarity * 10) / 10 < 0 ? "text-red-500" : Math.floor(lastKeyword.cosineSimilarity * 10) / 10 == 0 ? "text-gray-500" : "text-blue-500")}>
                                        {Math.floor(lastKeyword.cosineSimilarity * 10) / 10 >= 0 ? "+" : ""}
                                        {Math.floor(lastKeyword.cosineSimilarity * 10) / 10 == 0.0 ? "0.0" : Math.floor(lastKeyword.cosineSimilarity * 10) / 10}
                                    </p>
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
                                                <p className="text-blue-500 font-semibold text-xl min-w-[3.5rem] w-auto text-center">{log.rank > 1000 ? ">1000" : log.rank}</p>
                                            </div>
                                            <div className="w-full my-auto">
                                                <p className="font-semibold text-xl">{log.word}</p>
                                            </div>
                                            <div>
                                                {Math.floor(log.cosineSimilarity * 10) / 10 < 0 ? (
                                                        <div className="rounded-xl bg-red-100 px-[0.625rem] p-1">
                                                            <p className="font-semibold text-red-500 rounded-xl">{Math.floor(log.cosineSimilarity * 10) / 10}</p>
                                                        </div>
                                                    ) : Math.floor(log.cosineSimilarity * 10) / 10 == 0.0 ? (
                                                        <div className="rounded-xl bg-gray-100 px-[0.625rem] p-1">
                                                            <p className="font-semibold text-gray-500 rounded-xl">+0.0</p>
                                                        </div>
                                                    ) : (
                                                        <div className="rounded-xl bg-blue-100 px-[0.625rem] p-1">
                                                            <p className="font-semibold text-blue-500 rounded-xl">+{Math.floor(log.cosineSimilarity * 10) / 10}</p>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </>}
                </div>
            </div>
        </div>
    )
}