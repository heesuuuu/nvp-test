// lib/storage.js
const KEYS = { QUESTIONS: "nvp_questions", GUESTBOOKS: "nvp_guestbooks", RESULTS: "nvp_results", VISITORS: "nvp_visitors", ADMIN_PW: "nvp_admin_pw" };

const get = (key) => { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : null; } catch { return null; } };
const set = (key, val) => { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { console.error("localStorage 저장 실패", e); } };

export const visitorsApi = {
    hit: () => { const n = (get(KEYS.VISITORS) ?? 0) + 1; set(KEYS.VISITORS, n); return n; },
};

export const questionsApi = {
    getAll: () => {
        const s = get(KEYS.QUESTIONS);
        if (s && s.length > 0) return s;
        const { initialQuestions } = require("./mockData");
        set(KEYS.QUESTIONS, initialQuestions);
        return initialQuestions;
    },
    update: (q) => { set(KEYS.QUESTIONS, questionsApi.getAll().map((item) => item.questionId === q.questionId ? q : item)); },
    reset: () => { const { initialQuestions } = require("./mockData"); set(KEYS.QUESTIONS, initialQuestions); },
};

export const resultsApi = {
    save: (position, buildResultData) => {
        const results = get(KEYS.RESULTS) ?? [];
        const top = Object.entries(position).sort((a, b) => b[1] - a[1])[0][0];
        set(KEYS.RESULTS, [...results, { resultId: Date.now(), position: top, positionDetail: position, createdAt: new Date().toISOString() }]);
        return buildResultData(position);
    },
    getStats: () => {
        const results = get(KEYS.RESULTS) ?? [];
        const stats = { LEFT: 0, CENTER: 0, SETTER: 0, LIBERO: 0 };
        results.forEach((r) => { if (stats[r.position] !== undefined) stats[r.position]++; });
        return { total: results.length, resultStatus: stats };
    },
};

export const guestbooksApi = {
    getAll: () => get(KEYS.GUESTBOOKS) ?? [],
    getPage: ({ cursor = null, limit = 10, keyword = "" }) => {
        let list = [...(guestbooksApi.getAll())].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        if (keyword.trim()) { const kw = keyword.trim().toLowerCase(); list = list.filter((g) => g.guestBookNickname.toLowerCase().includes(kw) || g.guestBookInfo.toLowerCase().includes(kw)); }
        const startIdx = cursor ? list.findIndex((g) => g.guestBookId === cursor) + 1 : 0;
        const page = list.slice(startIdx, startIdx + limit);
        return { guestBookResList: page, nextCursor: startIdx + limit < list.length ? page[page.length - 1]?.guestBookId : null, hasNext: startIdx + limit < list.length, total: list.length };
    },
    add: ({ guestBookNickname, guestBookInfo, guestBookPassword }) => {
        const item = { guestBookId: Date.now(), guestBookNickname: guestBookNickname || "익명", guestBookInfo, guestBookPassword, createdAt: new Date().toISOString() };
        set(KEYS.GUESTBOOKS, [item, ...guestbooksApi.getAll()]);
        return item;
    },
    delete: (id, password = null) => {
        const list = guestbooksApi.getAll();
        const target = list.find((g) => g.guestBookId === id);
        if (!target) return { success: false, message: "항목 없음" };
        if (password !== null && target.guestBookPassword !== password) return { success: false, message: "비밀번호가 일치하지 않습니다." };
        set(KEYS.GUESTBOOKS, list.filter((g) => g.guestBookId !== id));
        return { success: true };
    },
    deleteMany: (ids) => set(KEYS.GUESTBOOKS, guestbooksApi.getAll().filter((g) => !ids.includes(g.guestBookId))),
};

const DEFAULT_ADMIN = { id: "admin1", password: "nvp-password-2019" };
export const adminApi = {
    login: (id, pw) => { const s = get(KEYS.ADMIN_PW) ?? DEFAULT_ADMIN; return s.id === id && s.password === pw; },
    isLoggedIn: () => typeof window !== "undefined" && sessionStorage.getItem("nvp_admin_session") === "true",
    setSession: (v) => { if (v) sessionStorage.setItem("nvp_admin_session", "true"); else sessionStorage.removeItem("nvp_admin_session"); },
};
