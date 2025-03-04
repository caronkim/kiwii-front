// 랭킹 페이지

import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getMyInfo, getRanking} from "../api/user";
import {getPointHistories} from "../api/point";
import {medalImages} from "../utils/medalImages";
import rankIcon from "../assets/rank.png";

export default function Ranking() {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [ranks, setRanks] = useState([]);

    useEffect(() => {
        async function fetchData() {
            let {message: myInfoMessage, data: myInfoData} = await getMyInfo();
            if (myInfoMessage !== "success") {
                alert("something wrong");
                return;
            }

            setUser(myInfoData);

            let {message: rankMessage, data: rankData} = await getRanking();
            if (rankMessage !== "success") {
                alert("something wrong");
            }
            setRanks(rankData);
        }

        fetchData();
    }, [])

    return (
        <div className="flex w-full min-h-dvh flex-col justify-start items-start self-stretch flex-grow gap-2.5 p-2.5 bg-transparent">
            {/*header*/}
            <div
                className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative overflow-hidden gap-2.5 p-2.5 bg-transparent">
                <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-grow-0 flex-shrink-0 w-6 h-6 relative"
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
                <p className="flex-grow-0 flex-shrink-0 text-xl font-semibold text-center text-black">포인트</p>
            </div>
            {/*content*/}
            {/*title*/}
            <div
                className="flex justify-start items-start flex-grow-0 flex-shrink-0 relative overflow-hidden gap-2.5 p-2.5 bg-transparent">
                <p className="flex-grow-0 flex-shrink-0 text-xl text-center text-black">
                    <span className="flex-grow-0 flex-shrink-0 text-xl font-semibold text-center text-black">
                      {user.username ?? ""}
                    </span>
                    <span className="flex-grow-0 flex-shrink-0 text-xl text-center text-black">님의 현재 랭킹</span>
                </p>
            </div>
            <div
                className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 overflow-hidden gap-2.5 p-2.5 bg-white">
                <div
                    className="flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0 h-[60px] overflow-hidden gap-2.5 p-2.5 bg-white">
                    <div
                        className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 h-full relative overflow-hidden gap-2.5 rounded-[100px] bg-[#a0eeab]">
                        <div className="h-full aspect-square rounded-[100%] bg-[#a0eeab] p-[0.3rem]">
                            <img src={rankIcon} alt="rankIcon" className="w-full h-full"/>
                        </div>
                    </div>
                    <div
                        className="flex justify-start items-start flex-grow-0 flex-shrink-0 relative overflow-hidden gap-2.5 p-2.5 bg-white">
                        <p className="flex-grow-0 flex-shrink-0 text-base text-left text-black">랭킹</p>
                        <p className="flex-grow-0 flex-shrink-0 text-base font-semibold text-left text-black">
                            {user?.rank?.toLocaleString()} 위
                        </p>
                    </div>
                </div>
            </div>
            {/*ranking*/}
            <div
                className="flex justify-start items-start flex-grow-0 flex-shrink-0 relative overflow-hidden gap-2.5 p-2.5 bg-transparent">
                <p className="flex-grow-0 flex-shrink-0 text-xl font-semibold text-center text-black">
                    상위 랭킹 유저
                </p>
            </div>
            <div
                className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative overflow-hidden gap-2.5 p-2.5 rounded-[10px] bg-white">
                {
                    ranks.map((rank, i) => {
                        return (
                            <div key={`rank-row-${i}`}
                                 className="flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 relative overflow-hidden gap-2.5 py-[5px] rounded-[10px] bg-white">
                                <img alt="medal" src={medalImages(rank.rank)} className="w-[50px] h-[50px] border-0"/>
                                <div
                                    className="flex flex-col justify-start items-start flex-grow overflow-hidden gap-2.5 bg-transparent">
                                    <div
                                        className="flex justify-between items-start self-stretch flex-grow-0 flex-shrink-0 relative overflow-hidden bg-transparent">
                                        <p className="flex-grow-0 flex-shrink-0 text-base font-semibold text-left text-black">
                                            {rank.username}
                                        </p>
                                        <p className="flex-grow-0 flex-shrink-0 text-base font-semibold text-left text-blue-500">
                                            {rank.totalEarnedPoints.toLocaleString()}P
                                        </p>
                                    </div>
                                </div>
                            </div>)
                    })
                }
            </div>
        </div>
    )
}