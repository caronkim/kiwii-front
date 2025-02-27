// 로그인 페이지
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import LogoImage from '../assets/logo.png';
import {login} from "../api/user";
import {useCookies} from "react-cookie";

export default function Login() {
    const [_, setCookie] = useCookies(["uuid"]);
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function requestLogin() {
        let {message, data} = await login(username, password);
        if (message === "login fail") {
            alert("로그인에 실패했습니다.");
            return;
        }

        setCookie("uuid", data.uuid, {maxAge: 1800});
        setCookie("username", data.username, {maxAge: 1800});
        navigate("/");
    }

    function signup() {
        navigate("/signup");
    }

    return (<div
            className="flex h-full flex-col justify-center items-center self-stretch flex-grow relative gap-[30px] p-2.5 bg-white">
            <div
                className="flex-grow-0 flex-shrink-0 w-[150px] h-[60px]">
                <img src={LogoImage} alt="로고" className="w-auto h-auto"/>
            </div>
            <div
                className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-[370px] overflow-hidden gap-[30px] p-2.5 bg-white">
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
                className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-[363px] overflow-hidden gap-2.5 p-2.5 bg-white">
                <div
                    className="flex flex-col justify-center items-center self-stretch flex-grow-0 flex-shrink-0 h-[50px] relative overflow-hidden gap-2.5 p-2.5 rounded-[10px] bg-blue-500"
                    onClick={() => requestLogin()}>
                    <p className="flex-grow-0 flex-shrink-0 text-xl font-medium text-center text-white">로그인</p>
                </div>
                <div
                    className="flex flex-col justify-center items-center self-stretch flex-grow-0 flex-shrink-0 h-[50px] relative overflow-hidden gap-2.5 p-2.5 rounded-[10px] bg-zinc-500"
                    onClick={() => signup()}
                >
                    <p className="flex-grow-0 flex-shrink-0 text-xl font-medium text-center text-white">
                        회원가입
                    </p>
                </div>
            </div>
        </div>)
}