import Button, {
    ButtonCancel,
    ButtonDefault,
    EditButton,
    NumberButton,
    PrevBtn,
    ScrollButton,
    WrithButton,
} from "@/components/common/Button";
import InputField, { InputDefault, InputEdit, Search } from "@/components/common/InputField";
import React from "react";

const Home = () => {
    return (
        <div>
            home
            {/* <Button /> */}
            <PrevBtn />
            <ButtonDefault fontSize="20px">gd</ButtonDefault>
            <InputField />
            <InputDefault placeholder="제목을 입력해 주세요. (10자 이내)" />
            <ButtonCancel>취소</ButtonCancel>
            <Search placeholder="검색할"></Search>
            <WrithButton />
            <EditButton />
            <NumberButton>1</NumberButton>
            <ScrollButton />
            <ButtonCancel width="166px" background="var(--blue-80)" color="var(--white)">
                취소2
        </ButtonCancel>
        <InputEdit defaultValue={"5분만 더.."} />
        <InputDefault placeholder="비밀번호를 입력해 주세요"/>
        </div>
    );
};

export default Home;
