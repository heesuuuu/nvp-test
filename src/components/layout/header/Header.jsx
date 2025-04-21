import React from "react";
import Link from "next/link";

const Header = () => {
    return (
        <div className="headerWrapper">
            <Link href="/" >
                <img src="/images/Items/LogoText.svg" alt="Logo" />
            </Link>
        </div>
    );
};

export default Header;
