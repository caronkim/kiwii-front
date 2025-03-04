import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import {signup} from "../api/user";

// 회원가입 페이지
export default function SignUp() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function requestSignUp() {
        const {message} = await signup(username, password);
        if (message === "error") {
            alert("회원 가입에 실패했습니다.");
            return;
        }

        navigate("/login");
    }

    return (
        <div
            className="flex w-full min-h-dvh flex-col justify-start items-start self-stretch flex-grow gap-[30px] p-2.5 bg-transparent">
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
                <p className="flex-grow-0 flex-shrink-0 text-xl font-semibold text-center text-black">
                    회원가입
                </p>
            </div>
            <div
                className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 overflow-hidden gap-2.5 p-2.5 bg-white">
                <div
                    className="flex justify-start items-center flex-grow-0 flex-shrink-0 w-[350px] relative overflow-hidden gap-2.5 bg-transparent">
                    <p className="flex-grow-0 flex-shrink-0 text-2xl font-semibold text-center text-black">
                        다음 정보를 입력해주세요
                    </p>
                </div>
            </div>
            <div
                className="flex flex-col justify-start items-start self-stretch flex-grow overflow-hidden gap-[30px] p-2.5 bg-white">
                <div
                    className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 overflow-hidden gap-2.5 p-2.5 bg-white">
                    <div
                        className="flex flex-col justify-center items-start self-stretch flex-grow-0 flex-shrink-0 gap-2.5">
                        <div
                            className="flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative overflow-hidden gap-2.5 py-2.5 bg-white border-t-0 border-r-0 border-b-2 border-l-0 border-zinc-300">
                            <div className="flex-grow-0 flex-shrink-0 w-full h-[19px] relative">
                                <input
                                    className="w-full absolute left-0 top-[-2px] text-base text-left text-zinc-500"
                                    placeholder={"아이디"}
                                    type={"text"}
                                    maxLength={20}
                                    value={username}
                                    onChange={(e) => {
                                        setUsername(e.target.value)
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 overflow-hidden gap-2.5 p-2.5 bg-white">
                    <div
                        className="flex flex-col justify-center items-start self-stretch flex-grow-0 flex-shrink-0 gap-2.5">
                        <div
                            className="flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative overflow-hidden gap-2.5 py-2.5 bg-white border-t-0 border-r-0 border-b-2 border-l-0 border-zinc-300">
                            <div className="flex-grow-0 flex-shrink-0 w-full h-[19px] relative">
                                <input
                                    className="w-full absolute left-0 top-[-2px] text-base text-left text-zinc-500"
                                    placeholder={"비밀번호"}
                                    type={"password"}
                                    maxLength={20}
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="flex flex-col justify-center items-center self-stretch flex-grow-0 flex-shrink-0 h-[50px] relative overflow-hidden gap-2.5 p-2.5 rounded-[10px] bg-blue-500"
                onClick={() => requestSignUp()}
            >
                <p className="flex-grow-0 flex-shrink-0 text-xl font-medium text-center text-white">회원가입</p>
            </div>
        </div>
    )
}