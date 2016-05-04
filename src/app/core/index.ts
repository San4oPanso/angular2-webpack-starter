import {usePreMiddleware, usePostMiddleware, Middleware, Action} from "@ngrx/store";

const actionLog: Middleware = action => {
    return action.do(val => {
        console.warn('DISPATCHED ACTION: ', val)
    });
};

const stateLog: Middleware = state => {
    return state.do(val => {
        console.info('NEW STATE: ', val)
    });
};

export const ActionLog = usePreMiddleware(actionLog);
export const StateLog = usePostMiddleware(stateLog);
export const MiddleWareLogs = [ActionLog, StateLog];