import React from "react";
import "./KimantleRecord.css";

const KimantleRecord = ({ rank, word, similarity }) => {
    return (
        <div className="record-item">
            <span className="rank">{rank}</span>
            <span className="word">{word}</span>
            <span className={`similarity ${similarity > 0 ? "positive" : similarity < 0 ? "negative" : "neutral"}`}>
                {similarity > 0 ? `+${similarity}` : similarity}
            </span>
        </div>
    );
};

export default KimantleRecord;
