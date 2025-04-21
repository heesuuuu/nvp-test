"use client"; // 꼭 있어야 해요! useRouter 쓸 거니까

import { useRouter } from "next/navigation";

const Home = () => {
    const router = useRouter();

    const handleStart = () => {
        router.push("/guestbook/test"); // 원하는 경로로 이동
    };

    return (
        <div>
            <h1>환영합니다!</h1>
            <button onClick={handleStart}>테스트 시작하기</button>
        </div>
    );
};

export default Home;
