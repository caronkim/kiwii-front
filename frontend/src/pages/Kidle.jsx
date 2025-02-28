// Kidle 페이지
import {useEffect, useRef, useState} from "react";
import {getWordleQuiz, getWordleTrials, postWordleTrial} from "../api/kidle";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";

export default function Kidle() {
    const [cookies] = useCookies(["uuid"]);
    const userId = parseInt(cookies.uuid);

    const navigate = useNavigate();
    const isProcessing = useRef(false);
    const [quizId, setQuizId] = useState(null);
    const [characterLength, setCharacterLength] = useState(0);
    const [wordleTrials, setWordleTrials] = useState([]);
    const [isAnswer, setIsAnswer] = useState(false);
    const [newTrial, setNewTrial] = useState([]);
    const [isValid, setIsValid] = useState(true);
    const [strikes, setStrikes] = useState(new Set());
    const [balls, setBalls] = useState(new Set());
    const [nones, setNones] = useState(new Set());

    // UI 관련
    function selectPrevTrialColor(strike, ball, none) {
        if (strike) {
            return "bg-green-500 border-green-500";
        } else if (ball) {
            return "bg-yellow-500 border-2 border-yellow-500";
        } else if (none) {
            return "bg-slate-400 border-2 border-slate-400";
        }
    }

    function selectNewTrialColor(character) {
        if (character) {
            return "bg-white border-2 border-black";
        } else {
            return "bg-white border-2 border-[#d9d9d9]";
        }
    }

    function selectNewTrialTextColor(isValid) {
        if (isValid) {
            return "text-black";
        } else {
            return "text-red-400";
        }
    }

    function selectKeyboardColor(character) {
        if (strikes.has(character)) {
            return "bg-green-500 border-green-500";
        } else if (balls.has(character)) {
            return "bg-yellow-500 border-2 border-yellow-500";
        } else if (nones.has(character)) {
            return "bg-slate-400 border-2 border-slate-400";
        } else {
            return "bg-zinc-200 border-2 border-zinc-200";
        }
    }

    function selectKeyboardTextColor(character) {
        if (strikes.has(character)) {
            return "text-white";
        } else if (balls.has(character)) {
            return "text-white";
        } else if (nones.has(character)) {
            return "text-white";
        } else {
            return "text-black";
        }
    }

    // 동작 관련
    function clickKeyboard(character) {
        // 이미 정답을 맞춘 경우
        if (isAnswer) {
            return;
        }
        // 시도 횟수를 넘은 경우
        if (wordleTrials.length >= 6) {
            return;
        }

        if (character == null) {
            setIsValid(true);
        }

        setNewTrial((prev) => {
            if (prev.length >= 0 && character == null) {
                return [...prev.slice(0, -1)];
            }

            if (prev.length < characterLength) {
                return [...prev, character]
            }

            return prev;
        })
    }

    async function clickSubmit() {
        if (isProcessing.current) {
            return;
        }
        isProcessing.current = true;
        try {
            // 이미 정답
            if (isAnswer) {
                return;
            }

            // 글자수 길이가 안맞는 경우
            if (newTrial.length !== characterLength) {
                return;
            }

            // 시도 횟수를 넘은 경우
            if (wordleTrials.length >= 6) {
                return;
            }

            let {message, data} = await postWordleTrial(userId, quizId, newTrial.toString());
            if (message === "fail") {
                setIsValid(false);
                return;
            }
            data.characters = data.characters.split(",");
            data.strikes = data.strikes.split(",").map(el => parseInt(el));
            data.balls = data.balls.split(",").map(el => parseInt(el));
            data.nones = data.nones.split(",").map(el => parseInt(el));

            let newWordleTrial = {
                characters: data.characters,
                strikes: data.strikes,
                balls: data.balls,
                nones: data.nones
            };
            let newStrikes = new Set();
            let newBalls = new Set();
            let newNones = new Set();
            let newIsAnswer = false;


            if (data.isAnswer) {
                newIsAnswer = true;
            }

            for (let i = 0; i < characterLength; i++) {
                let curCharacter = data.characters[i];
                if (data.strikes[i]) {
                    newStrikes.add(curCharacter);
                } else if (data.balls[i]) {
                    newBalls.add(curCharacter);
                } else if (data.nones[i]) {
                    newNones.add(curCharacter);
                }
            }
            setWordleTrials((prev) => {
                return [...prev, newWordleTrial];
            });
            setStrikes((prev) => {
                return newStrikes.union(prev);
            });
            setBalls((prev) => {
                return newBalls.union(prev);
            });
            setNones((prev) => {
                return newNones.union(prev);
            });
            setNewTrial([]);

            if (newIsAnswer) {
                // todo:: 서버와 데이터 맞추기
                navigate(`/game-result`, {
                    replace: true, state: {point: 200, headerTitle: "Kidle"}
                });
            }
        } finally {
            isProcessing.current = false;
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                let {data: wordleQuizData} = await getWordleQuiz();
                setQuizId(wordleQuizData.quizId);
                setCharacterLength(wordleQuizData.characterLength);

                let {data: wordleTrialsData} = await getWordleTrials(userId, wordleQuizData.quizId);

                let newWordleTrials = [];
                let newStrikes = new Set();
                let newBalls = new Set();
                let newNones = new Set();
                let newIsAnswer = false;
                for (let wordleTrial of wordleTrialsData) {
                    wordleTrial.characters = wordleTrial.characters.split(",");
                    wordleTrial.strikes = wordleTrial.strikes.split(",").map(el => parseInt(el));
                    wordleTrial.balls = wordleTrial.balls.split(",").map(el => parseInt(el));
                    wordleTrial.nones = wordleTrial.nones.split(",").map(el => parseInt(el));
                    if (wordleTrial.isAnswer) {
                        newIsAnswer = true;
                    }
                    newWordleTrials.push({
                        characters: wordleTrial.characters,
                        strikes: wordleTrial.strikes,
                        balls: wordleTrial.balls,
                        nones: wordleTrial.nones
                    });

                    for (let i = 0; i < wordleQuizData.characterLength; i++) {
                        let curCharacter = wordleTrial.characters[i];
                        console.log()
                        if (wordleTrial.strikes[i]) {
                            newStrikes.add(curCharacter);
                        } else if (wordleTrial.balls[i]) {
                            newBalls.add(curCharacter);
                        } else if (wordleTrial.nones[i]) {
                            newNones.add(curCharacter);
                        }
                    }
                }
                setWordleTrials(newWordleTrials);
                setStrikes(newStrikes);
                setBalls(newBalls);
                setNones(newNones);
                setIsAnswer(newIsAnswer);
            } catch (e) {
                console.error(e);
                alert("something wrong");
                navigate(-1);
            }
        }
        fetchData();
    }, []);

    return (<div
            className="flex h-full flex-col justify-start items-start self-stretch flex-grow gap-5 p-2.5 bg-transparent">
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
                <p className=" text-xl font-semibold text-center text-black">Kidle</p>
            </div>
            {/*content*/}
            <div
                className="flex flex-1 flex-col justify-start items-center self-stretch flex-shrink-0 scro gap-2.5 bg-white">
                <div
                    className="flex items-center justify-center self-stretch  relative overflow-hidden gap-2.5 px-2.5 bg-transparent">
                    <p className=" text-2xl text-center text-black">
                        오늘의 주식은 무엇일까요?
                    </p>
                </div>
                <div
                    className="flex w-full max-w-[700px] flex-col justify-start items-start  overflow-hidden gap-1.5 p-2.5 bg-white">
                    {[0, 1, 2, 3, 4, 5].map(index => {
                        if (index < wordleTrials.length) {
                            let curWordleTrial = wordleTrials[index];
                            return (<div
                                className={`flex w-full self-stretch justify-between items-start relative overflow-hidden gap-1.5 bg-white`}>
                                {curWordleTrial.characters.map((char, i) => {
                                    return (<div
                                        className={`flex items-center justify-center relative flex-1 min-h-[50px] aspect-square self-stretch overflow-hidden rounded-[10px] ${selectPrevTrialColor(curWordleTrial.strikes[i], curWordleTrial.balls[i], curWordleTrial.nones[i])}`}>
                                        <p className={`text-xl font-semibold text-center text-white`}>{char}</p>
                                    </div>)
                                })}
                            </div>);
                        } else if (index === wordleTrials.length) {
                            return (<div
                                className={`flex w-full self-stretch justify-between items-start relative overflow-hidden gap-1.5 bg-white`}>
                                {[...Array(characterLength)].map((_, i) => {
                                    let char = newTrial[i] ?? "";
                                    return (<div
                                        className={`flex items-center justify-center relative flex-1 min-h-[50px] aspect-square self-stretch overflow-hidden rounded-[10px] ${selectNewTrialColor(char)}`}>
                                        <p className={`text-xl font-semibold text-center ${selectNewTrialTextColor(isValid)}`}>{char}</p>
                                    </div>)
                                })}
                            </div>);
                        } else {
                            return (<div
                                className={`flex w-full self-stretch justify-between items-start relative overflow-hidden gap-1.5 bg-white`}>
                                {[...Array(characterLength)].map(() => {
                                    return (<div
                                        className="relative flex-1 min-h-[50px] aspect-square self-stretch overflow-hidden rounded-[10px] bg-white border-2 border-[#d9d9d9]"></div>)
                                })}
                            </div>);
                        }


                    })}
                </div>

                <div
                    className="flex flex-1 flex-col justify-center items-start self-stretch gap-2.5 bg-white">
                    <div
                        className="flex justify-center items-center self-stretch overflow-hidden gap-[5px] bg-white">
                        {
                            ['ㅂ', 'ㅈ', 'ㄷ', 'ㄱ', 'ㅅ', 'ㅛ', 'ㅕ', 'ㅑ'].map(char => {
                                return (
                                    <div
                                        className={`flex flex-col justify-center items-center relative overflow-hidden gap-2.5 p-2.5 rounded-[10px] ${selectKeyboardColor(char)}`}
                                        onClick={() => clickKeyboard(char)}
                                    >
                                        <p className={`text-xl font-semibold text-center ${selectKeyboardTextColor(char)}`}>{char}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div
                        className="flex justify-center items-center self-stretch  overflow-hidden gap-[5px] bg-white">
                        {
                            ['ㅁ', 'ㄴ', 'ㅇ', 'ㄹ', 'ㅎ', 'ㅗ', 'ㅓ', 'ㅏ', 'ㅣ'].map(char => {
                                return (
                                    <div
                                        className={`flex flex-col justify-center items-center relative overflow-hidden gap-2.5 p-2.5 rounded-[10px] ${selectKeyboardColor(char)}`}
                                        onClick={() => clickKeyboard(char)}
                                    >
                                        <p className={`text-xl font-semibold text-center ${selectKeyboardTextColor(char)}`}>{char}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div
                        className="flex justify-center items-center self-stretch  overflow-hidden gap-2.5 bg-white">
                        <div
                            className="flex justify-center items-center overflow-hidden gap-[5px] bg-white">
                            {
                                ['ㅋ', 'ㅌ', 'ㅊ', 'ㅍ', 'ㅠ', 'ㅜ', 'ㅡ'].map(char => {
                                    return (
                                        <div
                                            className={`flex flex-col justify-center items-center relative overflow-hidden gap-2.5 p-2.5 rounded-[10px] ${selectKeyboardColor(char)}`}
                                            onClick={() => clickKeyboard(char)}
                                        >
                                            <p className={`text-xl font-semibold text-center ${selectKeyboardTextColor(char)}`}>{char}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div
                            className="flex flex-col justify-center items-center h-[45px] w-[70px] relative overflow-hidden gap-2.5 p-2.5 rounded-[10px] bg-zinc-600"
                            onClick={() => clickKeyboard(null)}
                        >
                            <svg
                                width={25}
                                height={25}
                                viewBox="0 0 25 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className=" w-6 h-6 relative"
                                preserveAspectRatio="none"
                            >
                                <path
                                    d="M3.5 12.5H21.5M7.5 16.5L3.5 12.5L7.5 16.5ZM3.5 12.5L7.5 8.5L3.5 12.5Z"
                                    stroke="white"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            {/*footer*/}
            <div
                className="flex min-h-10 w-full flex-col justify-center items-center flex-grow-0 flex-shrink-0relative overflow-hidden gap-2.5 p-2.5 rounded-[10px] bg-blue-500"
                onClick={() => clickSubmit()}
            >
                <p className=" text-xl font-semibold text-center text-white">입력</p>
            </div>
        </div>

    )
}