// 금융 퀴즈 페이지
export default function OXQuiz({quiz, selectedAnswer, setSelectedAnswer}) {

    function optionOpacity(option) {
        if (option === selectedAnswer) {
            return "opacity-100";
        } else {
            return "opacity-50";
        }
    }

    return (
        <div
            className="flex flex-col justify-start items-start self-stretch flex-grow overflow-hidden gap-[30px] bg-transparent">
            <div
                className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-2.5 p-2.5 bg-transparent">
                <p className="break-keep text-2xl text-center text-black">
                    {quiz?.question ?? ""}
                </p>
            </div>
            <div
                className="flex flex-col justify-start items-start self-stretch flex-grow overflow-hidden gap-5 p-2.5 bg-white">
                <div
                    className="flex justify-start items-start self-stretch overflow-hidden gap-2.5 p-2.5">
                    <div
                        className={`flex flex-col flex-1 aspect-square justify-center items-center flex-grow relative rounded-[10px] bg-[#0051ff] ${optionOpacity(1)}`}
                        onClick={() => {
                            setSelectedAnswer(1)
                        }}>
                        <p className="flex-grow-0 flex-shrink-0 text-8xl text-center text-white">O</p>
                    </div>
                    <div
                        className={`flex flex-col flex-1 aspect-square justify-center items-center flex-grow relative rounded-[10px] bg-[#ff002b] ${optionOpacity(2)}`}
                        onClick={() => {
                            setSelectedAnswer(2)
                        }}>
                        <p className="flex-grow-0 flex-shrink-0 text-8xl text-center text-white">X</p>
                    </div>
                </div>
            </div>
        </div>
    )
}