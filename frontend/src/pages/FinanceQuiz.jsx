// 금융 퀴즈 페이지
import {useEffect, useRef, useState} from "react";
import {getTodayQuiz, postTodayQuiz} from "../api/dailyQuiz";
import OXQuiz from "../components/financeQuiz/OXQuiz";
import MultipleChoiceQuiz from "../components/financeQuiz/MultipleChoiceQuiz";
import {useNavigate} from "react-router-dom";

export default function FinanceQuiz() {
    const navigate = useNavigate();

    const isProcessing = useRef(false);
    const [quizzes, setQuizzes] = useState([]);
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
    const [answers, setAnswers] = useState([null, null, null, null]);

    // style
    function selectQuizIndexColor(index) {
        if (index <= currentQuizIndex) {
            return "bg-blue-500";
        } else {
            return "bg-zinc-300";
        }
    }

    function setSelectedAnswer(option) {
        setAnswers(prev => {
            let newAnswer = [...prev];

            if (newAnswer[currentQuizIndex] === option) {
                newAnswer[currentQuizIndex] = null;
            } else {
                newAnswer[currentQuizIndex] = option;
            }
            return newAnswer;
        })
    }

    // state
    function clickNext() {
        if (answers[currentQuizIndex] == null) {
            return;
        }

        setCurrentQuizIndex(prev => prev + 1);
    }

    function clickPrevious() {
        if (currentQuizIndex === 0) {
            navigate(-1);
        } else if (currentQuizIndex > 0) {
            setCurrentQuizIndex(prev => prev - 1);
        }
    }

    async function clickSubmit() {
        if (isProcessing.current) {
            return;
        }

        try {
            if (answers.includes(null)) {
                return;
            }

            let answerCount = 0;
            for (let i = 0; i < quizzes.length; i++) {
                if (quizzes[i].answer === answers[i]) {
                    answerCount++;
                }
            }

            let {message, data: point} = await postTodayQuiz(answerCount);
            if (message !== "success" && message !== "no point") {
                alert("something wrong");
                return;
            }

            if (message === "no point") {
                point = 0;
            }

            // todo:: modal 변경
            alert(`${point} 포인트를 획득했습니다!`);
            navigate(-1);
        } finally {
            isProcessing.current = false;
        }

    }

    useEffect(() => {
        async function fetchData() {
            let {message, data: todayQuizData} = await getTodayQuiz();

            if (message === "error") {
                alert("something wrong");
                return;
            }

            todayQuizData.sort(function (a, b) {
                return a.questionType - b.questionType
            });

            let newQuizzes = [];
            for (let quiz of todayQuizData) {
                if (quiz.hasOwnProperty("option3") && quiz.hasOwnProperty("option4")) {
                    quiz.category = 2; // 객관식
                } else {
                    quiz.category = 1; // O X
                }
                console.log(quiz);
                newQuizzes.push(quiz);
            }
            setQuizzes(newQuizzes);
        }

        fetchData();
    }, [])

    return (
        <div
            className="flex w-screen h-screen flex-col justify-start items-start self-stretch flex-grow gap-[30px] p-2.5 bg-transparent">
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
                    onClick={() => {
                        clickPrevious()
                    }}
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
                    금융 퀴즈
                </p>
            </div>
            {/*content*/}
            <div
                className="flex flex-col justify-center items-center self-stretch flex-grow-0 flex-shrink-0 relative overflow-hidden gap-2.5 p-2.5 bg-transparent">
                <div
                    className="flex justify-center items-center flex-grow-0 flex-shrink-0 overflow-hidden gap-2.5 py-2.5 bg-transparent">
                    <div
                        className={`flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 w-5 h-5 overflow-hidden gap-2.5 rounded-[100px] ${selectQuizIndexColor(0)}`}/>
                    <div
                        className={`flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 w-5 h-5 overflow-hidden gap-2.5 p-2.5 rounded-[100px] ${selectQuizIndexColor(1)}`}/>
                    <div
                        className={`flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 w-5 h-5 overflow-hidden gap-2.5 p-2.5 rounded-[100px] ${selectQuizIndexColor(2)}`}/>
                    <div
                        className={`flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 w-5 h-5 overflow-hidden gap-2.5 p-2.5 rounded-[100px] ${selectQuizIndexColor(3)}`}/>
                </div>

            </div>
            {
                quizzes.map((quiz, i) => {
                    if (i === currentQuizIndex) {
                        if (quiz.category === 1) {
                            return (<OXQuiz quiz={quiz} selectedAnswer={answers[currentQuizIndex]}
                                            setSelectedAnswer={setSelectedAnswer}/>);
                        } else if (quiz.category === 2) {
                            return (<MultipleChoiceQuiz quiz={quiz} selectedAnswer={answers[currentQuizIndex]}
                                                        setSelectedAnswer={setSelectedAnswer}/>);
                        } else {
                            return (<></>);
                        }

                    } else {
                        return (<></>);
                    }
                })
            }
            {/*footer*/}
            {/*다음 버튼*/}
            {
                quizzes.length > 0 && currentQuizIndex < quizzes.length - 1 ?
                    <div
                        className="flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 h-[50px] w-full relative overflow-hidden gap-2.5 p-2.5 rounded-[10px] bg-blue-500"
                        onClick={() => {
                            clickNext()
                        }}
                    >
                        <p className="flex-grow-0 flex-shrink-0 text-xl font-medium text-center text-white">다음</p>
                    </div> : <></>
            }
            {/*제출 버튼*/}
            {
                quizzes.length > 0 && currentQuizIndex === quizzes.length - 1 ?
                    <div
                        className="flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 h-[50px] w-full relative overflow-hidden gap-2.5 p-2.5 rounded-[10px] bg-blue-500"
                        onClick={() => {
                            clickSubmit()
                        }}
                    >
                        <p className="flex-grow-0 flex-shrink-0 text-xl font-medium text-center text-white">제출</p>
                    </div> : <></>
            }
        </div>
    )
}