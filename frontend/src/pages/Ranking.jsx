// 랭킹 페이지
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import rankIcon from "../assets/rank.png";
import {getMyInfo} from "../api/user";

export default function Ranking() {
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
        <div className="w-screen h-screen flex flex-col px-[0.625rem] pt-[0.625rem] pb-[1.875rem] gap-[0.625rem]">
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
                <p className="text-xl font-semibold text-center text-black">랭킹</p>
            </div>
            {/* content */}
            <div className="flex flex-col p-[0.625rem] gap-[1.875rem]">
            <div className="flex flex-row p-[0.625rem] text-xl">
                <div className="font-semibold">{user.username ?? ""}</div>
                <div className="font-normal">님 환영합니다!</div>
            </div>
                <div className="flex flex-row p-[0.625rem] gap-[0.625rem]">
                    {/* 랭킹 로고 */}
                    <div className="h-full aspect-square rounded-[100%] bg-[#a0eeab] p-[0.3rem]">
                        <img src={rankIcon} alt="rankIcon" className="w-full h-full"/>
                    </div>
                    <div className="flex flex-row p-[0.625rem] gap-[0.625rem] w-full">
                        <div className="font-normal">
                            랭킹
                        </div>
                        <div className="font-semibold">
                            ?????? 위 (todo)
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}