import React, { Suspense } from "react";
import Result from "./ResultContent";

export default function Page() {
    return (
        <Suspense>
            <Result/>
        </Suspense>
    );
}
