export const submitWord = async (word, uuid) => {
    try {
        const response = await fetch(`${server}/api/kimantle`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            // body: new URLSearchParams({ word, uuid })
            body: JSON.stringify({ word, uuid })
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("API 호출 실패:", error);
        return { status: "error", message: "서버와 연결할 수 없습니다." };
    }
};

export const fetchHistory = async () => {
    try {
        const response = await fetch(`${server}/api/kimantle`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("초기 데이터 가져오기 실패:", error);
        return { status: "error", message: "서버와 연결할 수 없습니다." };
    }
};