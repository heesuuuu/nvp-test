'use client'
import { usePathname } from "next/navigation";
import React from "react";

const PaddingWrapper = ({children}) => {
    const pathname = usePathname();
    const isMain = pathname === "/";
    return (
        <div className="layout-wrapper" style={{ paddingTop: isMain ? 0 : "50px"  }}>
            {children}
        </div>
    );
};

export default PaddingWrapper;
