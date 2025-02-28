// 포인트 내역 페이지
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getMyInfo} from "../api/user";
import {getPointHistories} from "../api/point";
import {STOCK_IMAGES} from "../utils/stockImages";
import goldImage from "../assets/gold.png";

export default function PointHistory() {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [pointHistories, setPointHistories] = useState({});

    function pointHistoryAmountTextColor(amount) {
        if (amount > 0) {
            return "text-blue-500";
        } else {
            return "text-red-500";
        }
    }

    function selectPointHistoryImage(content) {
        const match = content.match(/랜덤 주식 뽑기 (.+)/);
        const stockName = match ? match[1] : "";
        if (stockName !== "") {
            return STOCK_IMAGES[stockName];
        } else {
            return goldImage;
        }
    }

    useEffect(() => {
        async function fetchData() {
            let {message: myInfoMessage, data: myInfoData} = await getMyInfo();
            if (myInfoMessage !== "success") {
                alert("something wrong");
                return;
            }
            setUser(myInfoData);

            let {message: pointHistoryMessage, data: pointHistoryData} = await getPointHistories();
            if (pointHistoryMessage !== "success") {
                alert("something wrong");
                return;
            }
            pointHistoryData.sort((a, b) => {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            });
            console.log("server data", pointHistoryData);

            let newPointHistories = {};
            for (let pointHistory of pointHistoryData) {
                let date = new Date(pointHistory.createdAt);
                let dateKey = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
                if (!newPointHistories[dateKey]) {
                    newPointHistories[dateKey] = [];
                }
                newPointHistories[dateKey].push(pointHistory);

            }
            setPointHistories(newPointHistories);
        }

        fetchData();
    }, [])


    return (
        <div className="flex flex-col justify-start items-start self-stretch flex-grow gap-2.5 p-2.5 bg-transparent">
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
                    <span className="flex-grow-0 flex-shrink-0 text-xl text-center text-black">님의 포인트</span>
                </p>
            </div>
            <div
                className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 overflow-hidden gap-2.5 p-2.5 bg-white">
                <div
                    className="flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0 h-[60px] overflow-hidden gap-2.5 p-2.5 bg-white">
                    <div
                        className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 h-10 w-10 relative overflow-hidden gap-2.5 p-[5px] rounded-[100px] bg-[#fad265]">
                        <svg
                            width={30}
                            height={30}
                            viewBox="0 0 30 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="self-stretch flex-grow relative"
                            preserveAspectRatio="none"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M6 6C5.20435 6 4.44129 6.31607 3.87868 6.87868C3.31607 7.44129 3 8.20435 3 9V15C3 15.7956 3.31607 16.5587 3.87868 17.1213C4.44129 17.6839 5.20435 18 6 18V9H21C21 8.20435 20.6839 7.44129 20.1213 6.87868C19.5587 6.31607 18.7956 6 18 6H6ZM9 15C9 14.2044 9.31607 13.4413 9.87868 12.8787C10.4413 12.3161 11.2044 12 12 12H24C24.7956 12 25.5587 12.3161 26.1213 12.8787C26.6839 13.4413 27 14.2044 27 15V21C27 21.7956 26.6839 22.5587 26.1213 23.1213C25.5587 23.6839 24.7956 24 24 24H12C11.2044 24 10.4413 23.6839 9.87868 23.1213C9.31607 22.5587 9 21.7956 9 21V15ZM18 21C18.7956 21 19.5587 20.6839 20.1213 20.1213C20.6839 19.5587 21 18.7956 21 18C21 17.2044 20.6839 16.4413 20.1213 15.8787C19.5587 15.3161 18.7956 15 18 15C17.2044 15 16.4413 15.3161 15.8787 15.8787C15.3161 16.4413 15 17.2044 15 18C15 18.7956 15.3161 19.5587 15.8787 20.1213C16.4413 20.6839 17.2044 21 18 21Z"
                                fill="white"
                            />
                        </svg>
                    </div>
                    <div
                        className="flex justify-start items-start flex-grow-0 flex-shrink-0 relative overflow-hidden gap-2.5 p-2.5 bg-white">
                        <p className="flex-grow-0 flex-shrink-0 text-base text-left text-black">포인트</p>
                        <p className="flex-grow-0 flex-shrink-0 text-base font-semibold text-left text-black">
                            {user.point?.toLocaleString() ?? 0} P
                        </p>
                    </div>
                </div>
            </div>
            {/*point history*/}
            <div
                className="flex justify-start items-start flex-grow-0 flex-shrink-0 relative overflow-hidden gap-2.5 p-2.5 bg-transparent">
                <p className="flex-grow-0 flex-shrink-0 text-xl font-semibold text-center text-black">
                    전체 내역
                </p>
            </div>
            <div
                className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative overflow-hidden gap-2.5 p-2.5 rounded-[10px] bg-white">
                {
                    Object.keys(pointHistories).map((date) => {
                        return (
                            <div key={`date-${date}`} className={"w-full"}>
                                <p className="flex-grow-0 flex-shrink-0 text-xs text-left text-zinc-400">{date}</p>
                                {
                                    pointHistories[date].map((pointHistory) => {
                                        return (
                                            <div key={`point-history-${pointHistory.id}`}
                                                 className="flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 relative overflow-hidden gap-2.5 py-[5px] rounded-[10px] bg-white">
                                                <img
                                                    alt={"포인트"}
                                                    src={selectPointHistoryImage(pointHistory.content)}
                                                    className="flex-grow-0 flex-shrink-0 w-[50px] h-[50px] relative overflow-hidden rounded-[100px] bg-cover bg-no-repeat bg-center"/>
                                                <div
                                                    className="flex flex-col justify-start items-start flex-grow overflow-hidden gap-2.5 bg-transparent">
                                                    <div
                                                        className="flex justify-between items-start self-stretch flex-grow-0 flex-shrink-0 relative overflow-hidden bg-transparent">
                                                        <p className="flex-grow-0 flex-shrink-0 text-base font-semibold text-left text-black">
                                                            {pointHistory.content}
                                                        </p>
                                                        <p className={`flex-grow-0 flex-shrink-0 text-base font-semibold text-left ${pointHistoryAmountTextColor(pointHistory.amount)}`}>
                                                            {pointHistory.amount}P
                                                        </p>
                                                    </div>
                                                    <div
                                                        className="flex justify-between items-start self-stretch flex-grow-0 flex-shrink-0 relative overflow-hidden bg-transparent">
                                                        <p className="flex-grow-0 flex-shrink-0 text-xs font-semibold text-left text-zinc-500">
                                                            {new Date(pointHistory.createdAt).toLocaleDateString('en-US', {
                                                                hour: '2-digit',
                                                                minute: '2-digit',
                                                                hour12: true
                                                            }).slice(-8)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>)
                                    })
                                }
                            </div>
                        )
                    })

                }
            </div>
        </div>
    )
}