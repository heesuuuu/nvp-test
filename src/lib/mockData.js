// lib/mockData.js
// 초기 질문 데이터 (5포지션: LEFT, RIGHT, CENTER, SETTER, LIBERO)
// 실제 질문 내용은 이 파일에서 자유롭게 수정하세요.

export const initialQuestions = [
    {
        questionId: 1,
        questionInfo: "팀 프로젝트에서 당신은 주로 어떤 역할을 맡나요?",
        answers: [
            { answerId: 101, answer: "전략을 짜고 팀을 이끈다", result: "SETTER" },
            { answerId: 102, answer: "묵묵히 맡은 자리를 지킨다", result: "LIBERO" },
            { answerId: 103, answer: "기회가 오면 과감하게 치고 나간다", result: "LEFT" },
            { answerId: 104, answer: "빠르게 치고 빠지는 역할을 한다", result: "CENTER" }
        ],
    },
    {
        questionId: 2,
        questionInfo: "위기 상황에서 당신의 반응은?",
        answers: [
            { answerId: 201, answer: "침착하게 상황을 분석하고 지시한다", result: "SETTER" },
            { answerId: 202, answer: "최대한 실수 없이 버텨낸다", result: "LIBERO" },
            { answerId: 203, answer: "순간적인 판단으로 돌파한다", result: "LEFT" },
            { answerId: 204, answer: "빠르게 움직여 상황을 전환한다", result: "CENTER" }
        ],
    },
    {
        questionId: 3,
        questionInfo: "친구들 사이에서 나의 이미지는?",
        answers: [
            { answerId: 301, answer: "계획적이고 논리적인 편이다", result: "SETTER" },
            { answerId: 302, answer: "믿음직하고 안정적이다", result: "LIBERO" },
            { answerId: 303, answer: "열정적이고 추진력이 강하다", result: "LEFT" },
            { answerId: 304, answer: "재치 있고 순발력이 뛰어나다", result: "CENTER" }

        ],
    },
    {
        questionId: 4,
        questionInfo: "새로운 환경에서 당신은?",
        answers: [
            { answerId: 401, answer: "먼저 전체 흐름을 파악한다", result: "SETTER" },
            { answerId: 402, answer: "적응할 때까지 조심스럽게 행동한다", result: "LIBERO" },
            { answerId: 403, answer: "적극적으로 먼저 다가간다", result: "LEFT" },
            { answerId: 404, answer: "눈치 빠르게 상황을 읽고 맞춰간다", result: "CENTER" }
        ],
    },
    {
        questionId: 5,
        questionInfo: "내가 가장 잘하는 것은?",
        answers: [
            { answerId: 501, answer: "상황에 맞는 판단과 조율", result: "SETTER" },
            { answerId: 502, answer: "꾸준함과 집중력", result: "LIBERO" },
            { answerId: 503, answer: "강한 의지와 실행력", result: "LEFT" },
            { answerId: 504, answer: "빠른 반응과 민첩함", result: "CENTER" }
        ],
    },
    {
        questionId: 6,
        questionInfo: "시험 전날 나는?",
        answers: [
            { answerId: 601, answer: "전체 내용을 정리하며 흐름을 잡는다", result: "SETTER" },
            { answerId: 602, answer: "틀렸던 문제를 반복해서 다시 푼다", result: "LIBERO" },
            { answerId: 603, answer: "중요한 것만 집중적으로 벼락치기한다", result: "LEFT" },
            { answerId: 604, answer: "핵심 키워드를 빠르게 훑는다", result: "CENTER" }
        ],
    },
    {
        questionId: 7,
        questionInfo: "스트레스를 풀 때 나는?",
        answers: [
            { answerId: 701, answer: "혼자 생각을 정리하는 시간을 갖는다", result: "SETTER" },
            { answerId: 702, answer: "좋아하는 것을 반복하며 안정을 찾는다", result: "LIBERO" },
            { answerId: 703, answer: "운동이나 활동적인 것으로 푼다", result: "LEFT" },
            { answerId: 704, answer: "재밌는 걸 찾아 기분 전환을 한다", result: "CENTER" }
        ],
    },
    {
        questionId: 8,
        questionInfo: "나에게 팀워크란?",
        answers: [
            { answerId: 801, answer: "전략적 협력으로 시너지를 내는 것", result: "SETTER" },
            { answerId: 802, answer: "서로 믿고 각자 자리를 지키는 것", result: "LIBERO" },
            { answerId: 803, answer: "목표를 향해 함께 돌진하는 것", result: "LEFT" },
            { answerId: 804, answer: "빠르게 소통하고 즉각 반응하는 것", result: "CENTER" }
        ],
    },
    {
        questionId: 9,
        questionInfo: "경기에서 지고 있을 때 나는?",
        answers: [
            { answerId: 901, answer: "전술을 바꿔 반전을 노린다", result: "SETTER" },
            { answerId: 902, answer: "흔들리지 않고 실수를 줄인다", result: "LIBERO" },
            { answerId: 903, answer: "더 강하게 밀어붙인다", result: "LEFT" },
            { answerId: 904, answer: "빠른 플레이로 분위기를 바꾼다", result: "CENTER" }
        ],
    },
    {
        questionId: 10,
        questionInfo: "나의 강점 한 가지를 고른다면?",
        answers: [
            { answerId: 1001, answer: "뛰어난 판단력과 리더십", result: "SETTER" },
            { answerId: 1002, answer: "안정적인 수비와 지구력", result: "LIBERO" },
            { answerId: 1003, answer: "폭발적인 공격력과 추진력", result: "LEFT" },
            { answerId: 1004, answer: "민첩한 움직임과 순발력", result: "CENTER" }
        ],
    },
];
