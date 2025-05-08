"use client";
import { InputDefault, InputPassword } from "@/components/common/InputField";
import React, { useEffect, useState } from "react";
import "../../../scss/styles.scss";
import { ButtonCancel, ButtonEnroll } from "@/components/common/Button";
import { useRouter } from "next/navigation";
import api from "@/utils/axios";

const login = () => {
    const router = useRouter();

    const [idTouched, setIdTouched] = useState(false);
    const [passwordTouched, setpasswordTouched] = useState(false);

    const [adminname, setAdminname] = useState("");
    const [password, setPassword] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const isAdminnameValid = adminname.trim().length > 0;
        setIsFormValid(isAdminnameValid);
    }, [adminname, password]);

    const handleConfirm = (e) => {
        e.preventDefault();
        if (!isFormValid) return;

        // 로그인 요청
        api.post("/v1/admins/login", {
            id: adminname,
            password: password,
        })
            .then((res) => {
                console.log(res);
                console.log(res.status);
                if (res.status === 200) {
                    router.push("/admin");
                } else alert("로그인 실패");
            })
            .catch((err) => {
                alert("로그인 실패!");
                console.log(err.status);
                console.error(err);
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
                        ></InputDefault>
                        {/* {(idTouched || adminname.length > 0) && !adminname.trim().length <= 10 && (
                            <p className="error">이름은 특수문제 제외, 1~10자 이내로 입력해주세요.</p>
                        )} */}
                    </div>
                    <p className="input-title">비밀번호</p>
                    <div className="input-box">
                        <InputPassword
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={() => setpasswordTouched(true)}
                        />
                        {/* {(passwordTouched || password.length > 0) && !validatePassword(password) && (
                            <p className="error">이름은 특수문제 제외, 4~10자 이내로 입력해주세요.</p>
                        )} */}
                    </div>

                    <div className="button-wrapper">
                        <ButtonCancel
                            background="var(--gray-20)"
                            color="var(--white)"
                            width="168px"
                            hoverbg="var(--gray-30)"
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
