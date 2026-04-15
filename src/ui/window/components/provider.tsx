import { useState } from "react";
import { Context } from "../context";
import type { State } from "../types";

export default function Provider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<State>("default");

    return <Context.Provider value={{ state, setState }}>
        {children}
    </Context.Provider>
}

