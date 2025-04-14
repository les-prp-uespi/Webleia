import { useReducer, useRef } from 'react';
import useHttp from '../useHttp';
import useUnmount from '../useUnmount';
import toastr from 'toastr';
import { useDispatch, useSelector } from 'react-redux';
import { setCache } from 'app/redux/reducers/cacheSlice';

const useService = (service, configs) => {
  const dispatch = useDispatch();
  const cachedData = useSelector((state) => state.cache);
  //IMPORTANTE - só pode ser TRUE para requsições 'GET' (busca de dados)
  const shouldUseCache = configs?.cache || false;
  const cacheKey = configs?.cacheKey;

  const [responseData, updateResponse] = useReducer(
    (state, action) => {
      return {
        ...state,
        ...action,
      };
    },
    {
      data: null,
      loading: false,
      error: false,
    },
  );

  const api = useHttp();
  const controller = useRef(new AbortController());
  const retryParams = useRef({});

  const cancel = () => {
    controller.current.abort();
    controller.current = new AbortController();
    updateResponse({ error: false, loading: false });
  };

  const retry = () => {
    const lastParams = retryParams.current;
    request(lastParams);
  };

  const getFinalCacheKey = () => {
    const params = retryParams.current;
    const finalCacheKey = `#${cacheKey}#-${JSON.stringify(params)}`;
    return finalCacheKey;
  };

  const getDeepCopy = (value) => {
    return JSON.parse(JSON.stringify(value));
  };

  const setResultOnCache = (data) => {
    if (!shouldUseCache || !cacheKey) return;
    const finalCacheKey = getFinalCacheKey();

    dispatch(setCache({ key: finalCacheKey, data: getDeepCopy(data) }));
  };

  const tryCache = () => {
    if (!shouldUseCache || !cacheKey) return;
    const finalCacheKey = getFinalCacheKey();
    const cachedReponse = cachedData?.[finalCacheKey];
    if (cachedReponse) {
      updateResponse({ data: getDeepCopy(cachedReponse) });
      configs?.onSuccess?.(cachedReponse);
      return true;
    }
    return false;
  };

  const request = async (params = {}, options) => {
    retryParams.current = params;

    const silent = !!options?.silent

    if (!options?.ignoreCache) {
      const successCache = tryCache(params);
      if (successCache) return;
    }

    if (options?.cancelPrevious) {
      cancel()
    }

    try {
      if (!silent) {
        updateResponse({ error: false, loading: true, data: null });
      }

      const response = await service(api, params, controller.current);
      const data = response?.data;

      if (response !== "ERR_CANCELED") {
        updateResponse({ error: false, loading: false, data: data });
        setResultOnCache(data);
        configs?.onSuccess?.(data);
      }
    } catch (error) {

      const errorMessage = error?.response?.data?.message;
      if (errorMessage) {
        if (error?.response?.data?.errors) {
          Object.entries(error?.response?.data.errors).map(([field, messages]) =>
            messages.map((message) => toastr.error(message)),
          );
        } else {
          toastr.error(errorMessage);
        }
      }
      updateResponse({ error: true, loading: false });
      configs?.onError?.();
    }
  };

  useUnmount(() => {
    cancel();
  });

  return {
    request,
    cancel,
    response: responseData,
    retry,
  };
};

export default useService;
