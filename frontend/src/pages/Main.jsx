// 메인 페이지

import {Link} from "react-router-dom";
import {useCookies} from "react-cookie";

export default function Main() {
    const [cookies] = useCookies(["uuid"]); // userId 쿠키 가져오기
    console.log(cookies);
    return (
        <div>
            <Link to="/kidle">이동</Link>
        </div>
    )
}