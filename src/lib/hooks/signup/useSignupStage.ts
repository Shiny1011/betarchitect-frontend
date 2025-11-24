import Cookies from 'js-cookie';

import { AUTH_TOKEN_EXPIRES, SIGNUP_STAGE_COOKIE } from '@/constants';

interface SignupStageData {
  isSignupStage1: boolean;
}

export const useSignupStage = () => {
  const getSignupStageData = (): SignupStageData | undefined => {
    const cookieValue = Cookies.get(SIGNUP_STAGE_COOKIE);
    if (!cookieValue) return undefined;

    try {
      return JSON.parse(cookieValue) as SignupStageData;
    } catch {
      return undefined;
    }
  };

  const isSignupStage1 = (): boolean => {
    const data = getSignupStageData();
    return data?.isSignupStage1 || false;
  };

  const setSignupStage1 = (status: boolean = true): void => {
    const data: SignupStageData = { isSignupStage1: status };
    Cookies.set(SIGNUP_STAGE_COOKIE, JSON.stringify(data), {
      expires: AUTH_TOKEN_EXPIRES,
      secure: true,
      sameSite: 'lax',
    });
  };

  const clearSignupStage: VoidFunction = () => {
    Cookies.remove(SIGNUP_STAGE_COOKIE);
  };

  const refreshSignupStage = (): SignupStageData | undefined => {
    return getSignupStageData();
  };

  return {
    isSignupStage1: isSignupStage1(),
    signupStageData: getSignupStageData(),
    setSignupStage1,
    clearSignupStage,
    refreshSignupStage,
  };
};
