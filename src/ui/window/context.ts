import { createContext } from "react";
import type { State } from './types';

export const Context = createContext({
    state: "default",
    setState: (_state: State) => { },
});