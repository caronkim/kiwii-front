import React, {useEffect, useState} from "react";
import { submitWord } from "../api/kimantle";
import KimantleRecord from "../components/Kimantle/KimantleRecord";

const Kimantle = () => {
    const [inputWord, setInputWord] = useState("");
    const [history, setHistory] = useState([]); // 입력 기록 저장
    const [latestResult, setLatestResult] = useState(null);

    useEffect(() => {
        const loadHistory = async () => {
            const data = await fetchHistory();
            if (data.status === "success") {
                setHistory(data.history);
            }
        };
        loadHistory();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputWord.trim()) return;

        const uuid = "user-123"; // 실제 구현에서는 로그인 사용자 ID 사용
        const result = await submitWord(inputWord, uuid);

        if (result.status === "fail") {
            alert(result.message); // "단어가 사전에 없습니다. 다시 입력해주세요."
        } else if (result.status === "success") {
            setLatestResult({ word: inputWord, similarity: result.similarity, rank: result.rank });

            // 새로운 입력을 기록
            setHistory((prev) => [
                { word: inputWord, similarity: result.similarity, rank: result.rank },
                ...prev
            ]);
        }

        setInputWord(""); // 입력창 초기화
    };

    return (
        <div className="kimantle-container">
            <h2>단어를 입력하세요!</h2>
            <input
                type="text"
                value={inputWord}
                onChange={(e) => setInputWord(e.target.value)}
                placeholder="키움증권"
            />
            <button type="button" onClick={handleSubmit}>추측하기</button>

            {latestResult && (
                <div>
                    <h3>이전 단어의 유사도</h3>
                    <KimantleRecord rank={latestResult.rank} word={latestResult.word} similarity={latestResult.similarity} />
                </div>
            )}

            <h3>이전 기록</h3>
            <div className="record-list">
                {history.map((entry, index) => (
                    <KimantleRecord key={index} rank={entry.rank} word={entry.word} similarity={entry.similarity} />
                ))}
            </div>
        </div>
    );
};

export default Kimantle;
