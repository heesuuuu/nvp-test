// lib/positionData.js
export const POSITION_DATA = {
    LEFT: { result: "LEFT", resultKo: "레프트 공격수", resultModifier: "화끈한 공격형 에이스", resultInfo: "당신은 팀의 에이스! 결정적인 순간에 강하게 치고 들어가는 스타일이에요. 열정적이고 추진력이 넘치며, 위기 상황에서도 포기하지 않는 불굴의 의지를 가졌어요. 코트 위에서 가장 빛나는 존재가 바로 당신입니다." },
    CENTER: { result: "CENTER", resultKo: "센터 속공수", resultModifier: "번개 같은 스피드 히어로", resultInfo: "당신은 누구보다 빠르고 민첩해요! 순발력과 판단력이 뛰어나 상황이 눈에 들어오는 순간 이미 움직이고 있죠. 재치 있는 플레이로 팀의 분위기를 단번에 바꾸는 게임 체인저 스타일이에요." },
    SETTER: { result: "SETTER", resultKo: "세터", resultModifier: "냉철한 전략가 리더", resultInfo: "당신은 팀의 두뇌! 경기 흐름을 읽고 최적의 플레이를 연결하는 전략가예요. 침착하고 논리적이며, 팀원 모두를 빛나게 하는 조율 능력이 탁월해요. 세터는 코트 위의 지휘관이에요." },
    LIBERO: { result: "LIBERO", resultKo: "리베로 수비수", resultModifier: "철벽 같은 수비의 요새", resultInfo: "당신은 팀의 든든한 버팀목! 어떤 공격도 막아내는 집중력과 끈기를 가졌어요. 묵묵히 자기 자리를 지키며 팀에 안정감을 주는 존재예요. 리베로 없이는 팀이 무너진다는 걸 모두가 알고 있어요." },
};

export const calcResultStatus = () => {
    try {
        const results = JSON.parse(localStorage.getItem("nvp_results") || "[]");
        const total = results.length;
        if (total === 0) return [];
        const counts = { LEFT: 0, CENTER: 0, SETTER: 0, LIBERO: 0 };
        results.forEach((r) => { if (counts[r.position] !== undefined) counts[r.position]++; });
        return Object.entries(counts)
            .map(([key, count], idx) => ({
                resultStatusId: idx + 1,
                resultStatusName: key,
                resultStatusKo: POSITION_DATA[key].resultKo,
                resultStatusPer: Math.round((count / total) * 100),
            }))
            .sort((a, b) => b.resultStatusPer - a.resultStatusPer);
    } catch { return []; }
};

export const buildResultData = (position) => {
    const top = Object.entries(position).sort((a, b) => b[1] - a[1])[0][0];
    return { resultId: Date.now(), ...POSITION_DATA[top], resultStatus: calcResultStatus() };
};
