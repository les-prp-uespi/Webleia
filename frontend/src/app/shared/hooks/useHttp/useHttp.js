import {
  DOMAIN,
  AppKey
} from "app/shared/constants";
import { AuthUtils } from "app/shared/utils";
import axios from "axios";

const useHttp = () => {
  const api = axios.create({
    baseURL: DOMAIN,
  });

  api.interceptors.request.use(async (config) => {
    config.headers["AppKey"] = AppKey;
    const user = AuthUtils.getUser();
    if (user) {
      const userToken = user.id + ":" + user.token + ":" + AppKey;
      config.headers["TokenUser"] = userToken;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const errorCode = error?.code;
      if (errorCode === "ERR_CANCELED") {
        return "ERR_CANCELED";
      }
      const errorStatus = error?.response?.status
      const errorMessage = error?.response?.data?.message
      if (
        errorStatus === 403 &&
        [
          "Você não pode realizar essa operação",
          "Token expirado, efetue login novamente!"
        ].includes(errorMessage)
      ) {
        return AuthUtils.logout(true);
      }

      return Promise.reject(error);
    }
  );
  return api;
};

export default useHttp;
