export interface ReduxState {
    a: string;
    b: string;
}
interface Payloads {
    a: null;
    b: null;
}
export interface DispatchedAction<T extends keyof Payloads> {
    type: T;
    payload: Payloads[T];
}
export type AnyAction = {
    [T in keyof Payloads]: DispatchedAction<T>
}[keyof Payloads];
export default function Reducer(
    state: ReduxState = { a: "a", b: "b" },
    action?: AnyAction,
): ReduxState {
    return state;
}
