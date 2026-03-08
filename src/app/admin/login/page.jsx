"use client";
import { InputDefault, InputPassword } from "@/components/common/InputField";
import React, { useEffect, useState } from "react";
import "../../../scss/styles.scss";
import { ButtonCancel, ButtonEnroll } from "@/components/common/Button";
import { useRouter } from "next/navigation";
import api from "@/utils/axios";
import { adminApi } from "@/lib/storage";

const login = () => {
    const router = useRouter();
    const [idTouched, setIdTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [adminname, setAdminname] = useState("");
    const [password, setPassword] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        setIsFormValid(adminname.trim().length > 0);
    }, [adminname, password]);

    const handleConfirm = (e) => {
        e.preventDefault();
        if (!isFormValid) return;

        api.post("/v1/admins/login", { id: adminname, password })
            .then((res) => {
                if (res.status === 200) {
                    router.push("/admin");
                } else {
                    alert("로그인 실패");
                }
            })
            .catch(() => {
                // 서버 연결 실패 시 → 로컬 인증으로 fallback
                const success = adminApi.login(adminname, password);
                if (success) {
                    adminApi.setSession(true);
                    router.push("/admin");
                } else {
                    alert("로그인 실패!");
                }
            });
    };

    return (
        <div className="login-wrapper">
            <div className="inner">
                <section>
                    <p className="login-title">관리자 정보를 입력해 주세요.</p>
                    <p className="login-stitle">
                        올바른 아이디, 비밀번호를 입력하시면 <br /> 관리자 모드에 들어갈 수 있어요 :)
                    </p>
                </section>
                <form className="input-wrapper" onSubmit={handleConfirm}>
                    <p className="input-title">아이디</p>
                    <div className="input-box">
                        <InputDefault
                            placeholder="아이디를 입력해 주세요."
                            value={adminname}
                            onChange={(e) => setAdminname(e.target.value)}
                            onBlur={() => setIdTouched(true)}
                        />
                    </div>
                    <p className="input-title">비밀번호</p>
                    <div className="input-box">
                        <InputPassword
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={() => setPasswordTouched(true)}
                        />
                    </div>
                    <div className="button-wrapper">
                        <ButtonCancel
                            background="var(--gray-20)"
                            color="var(--white)"
                            width="168px"
                            hoverbg="var(--gray-30)"
                            onClick={() => router.back()}
                        >
                            취소
                        </ButtonCancel>
                        <ButtonEnroll type="submit" disabled={!isFormValid} width="168px" activebg="var(--active)">
                            확인
                        </ButtonEnroll>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default login;
