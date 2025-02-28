export default function MultipleChoiceQuiz({quiz, selectedAnswer, setSelectedAnswer}) {
    function selectCheckBoxBackgroundColor(option) {
        if (option === selectedAnswer) {
            return "#3B82F6";
        } else {
            return "#D4D4D8";
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
                    className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-5 bg-white"
                    onClick={() => {
                        setSelectedAnswer(1);
                    }}
                >
                    <svg
                        width={30}
                        height={30}
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="self-stretch flex-grow-0 flex-shrink-0 w-[30px] relative"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15 27C18.1826 27 21.2348 25.7357 23.4853 23.4853C25.7357 21.2348 27 18.1826 27 15C27 11.8174 25.7357 8.76516 23.4853 6.51472C21.2348 4.26428 18.1826 3 15 3C11.8174 3 8.76516 4.26428 6.51472 6.51472C4.26428 8.76516 3 11.8174 3 15C3 18.1826 4.26428 21.2348 6.51472 23.4853C8.76516 25.7357 11.8174 27 15 27ZM20.5605 13.0605C20.8337 12.7776 20.9849 12.3987 20.9815 12.0054C20.9781 11.6121 20.8203 11.2359 20.5422 10.9578C20.2641 10.6797 19.8879 10.5219 19.4946 10.5185C19.1013 10.5151 18.7224 10.6663 18.4395 10.9395L13.5 15.879L11.5605 13.9395C11.2776 13.6663 10.8987 13.5151 10.5054 13.5185C10.1121 13.5219 9.73588 13.6797 9.45777 13.9578C9.17966 14.2359 9.02191 14.6121 9.01849 15.0054C9.01507 15.3987 9.16626 15.7776 9.4395 16.0605L12.4395 19.0605C12.7208 19.3417 13.1023 19.4997 13.5 19.4997C13.8977 19.4997 14.2792 19.3417 14.5605 19.0605L20.5605 13.0605Z"
                            fill={`${selectCheckBoxBackgroundColor(1)}`}
                        />
                    </svg>
                    <p className="break-keep text-xl text-black">
                        {quiz?.option1 ?? ""}
                    </p>
                </div>
                <div
                    className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-5 bg-white"
                    onClick={() => {
                        setSelectedAnswer(2);
                    }}
                >
                    <svg
                        width={30}
                        height={30}
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="self-stretch flex-grow-0 flex-shrink-0 w-[30px] relative"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15 27C18.1826 27 21.2348 25.7357 23.4853 23.4853C25.7357 21.2348 27 18.1826 27 15C27 11.8174 25.7357 8.76516 23.4853 6.51472C21.2348 4.26428 18.1826 3 15 3C11.8174 3 8.76516 4.26428 6.51472 6.51472C4.26428 8.76516 3 11.8174 3 15C3 18.1826 4.26428 21.2348 6.51472 23.4853C8.76516 25.7357 11.8174 27 15 27ZM20.5605 13.0605C20.8337 12.7776 20.9849 12.3987 20.9815 12.0054C20.9781 11.6121 20.8203 11.2359 20.5422 10.9578C20.2641 10.6797 19.8879 10.5219 19.4946 10.5185C19.1013 10.5151 18.7224 10.6663 18.4395 10.9395L13.5 15.879L11.5605 13.9395C11.2776 13.6663 10.8987 13.5151 10.5054 13.5185C10.1121 13.5219 9.73588 13.6797 9.45777 13.9578C9.17966 14.2359 9.02191 14.6121 9.01849 15.0054C9.01507 15.3987 9.16626 15.7776 9.4395 16.0605L12.4395 19.0605C12.7208 19.3417 13.1023 19.4997 13.5 19.4997C13.8977 19.4997 14.2792 19.3417 14.5605 19.0605L20.5605 13.0605Z"
                            fill={`${selectCheckBoxBackgroundColor(2)}`}
                        />
                    </svg>
                    <p className="break-keep text-xl text-black">
                        {quiz?.option2 ?? ""}
                    </p>
                </div>
                <div
                    className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-5 bg-white"
                    onClick={() => {
                        setSelectedAnswer(3);
                    }}
                >
                    <svg
                        width={30}
                        height={30}
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="self-stretch flex-grow-0 flex-shrink-0 w-[30px] relative"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15 27C18.1826 27 21.2348 25.7357 23.4853 23.4853C25.7357 21.2348 27 18.1826 27 15C27 11.8174 25.7357 8.76516 23.4853 6.51472C21.2348 4.26428 18.1826 3 15 3C11.8174 3 8.76516 4.26428 6.51472 6.51472C4.26428 8.76516 3 11.8174 3 15C3 18.1826 4.26428 21.2348 6.51472 23.4853C8.76516 25.7357 11.8174 27 15 27ZM20.5605 13.0605C20.8337 12.7776 20.9849 12.3987 20.9815 12.0054C20.9781 11.6121 20.8203 11.2359 20.5422 10.9578C20.2641 10.6797 19.8879 10.5219 19.4946 10.5185C19.1013 10.5151 18.7224 10.6663 18.4395 10.9395L13.5 15.879L11.5605 13.9395C11.2776 13.6663 10.8987 13.5151 10.5054 13.5185C10.1121 13.5219 9.73588 13.6797 9.45777 13.9578C9.17966 14.2359 9.02191 14.6121 9.01849 15.0054C9.01507 15.3987 9.16626 15.7776 9.4395 16.0605L12.4395 19.0605C12.7208 19.3417 13.1023 19.4997 13.5 19.4997C13.8977 19.4997 14.2792 19.3417 14.5605 19.0605L20.5605 13.0605Z"
                            fill={`${selectCheckBoxBackgroundColor(3)}`}
                        />
                    </svg>
                    <p className="break-keep text-xl text-black">
                        {quiz?.option3 ?? ""}
                    </p>
                </div>
                <div
                    className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-5 bg-white"
                    onClick={() => {
                        setSelectedAnswer(4);
                    }}
                >
                    <svg
                        width={30}
                        height={30}
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="self-stretch flex-grow-0 flex-shrink-0 w-[30px] relative"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15 27C18.1826 27 21.2348 25.7357 23.4853 23.4853C25.7357 21.2348 27 18.1826 27 15C27 11.8174 25.7357 8.76516 23.4853 6.51472C21.2348 4.26428 18.1826 3 15 3C11.8174 3 8.76516 4.26428 6.51472 6.51472C4.26428 8.76516 3 11.8174 3 15C3 18.1826 4.26428 21.2348 6.51472 23.4853C8.76516 25.7357 11.8174 27 15 27ZM20.5605 13.0605C20.8337 12.7776 20.9849 12.3987 20.9815 12.0054C20.9781 11.6121 20.8203 11.2359 20.5422 10.9578C20.2641 10.6797 19.8879 10.5219 19.4946 10.5185C19.1013 10.5151 18.7224 10.6663 18.4395 10.9395L13.5 15.879L11.5605 13.9395C11.2776 13.6663 10.8987 13.5151 10.5054 13.5185C10.1121 13.5219 9.73588 13.6797 9.45777 13.9578C9.17966 14.2359 9.02191 14.6121 9.01849 15.0054C9.01507 15.3987 9.16626 15.7776 9.4395 16.0605L12.4395 19.0605C12.7208 19.3417 13.1023 19.4997 13.5 19.4997C13.8977 19.4997 14.2792 19.3417 14.5605 19.0605L20.5605 13.0605Z"
                            fill={`${selectCheckBoxBackgroundColor(4)}`}
                        />
                    </svg>
                    <p className="break-keep text-xl text-black">
                        {quiz?.option4 ?? ""}
                    </p>
                </div>
            </div>
        </div>
    )
}