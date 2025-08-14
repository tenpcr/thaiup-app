import * as appTypes from "../types/appTypes";

export const language = (lang: string) => {
    return { type: appTypes.LANGUAGE, payload: { result: lang }};
};