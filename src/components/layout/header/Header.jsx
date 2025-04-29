import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "../../../scss/styles.scss"

const Header = () => {
    const patchname = usePathname();
    const isAdmin = patchname.startsWith("/admin");
    return (
        <div className="headerWrapper">
            <Link href={isAdmin ? "/admin" : "/"}>
                <img src="/images/Items/LogoText2 S.png" alt="Logo" />
                
            </Link>
        </div>
    );
};

export default Header;
