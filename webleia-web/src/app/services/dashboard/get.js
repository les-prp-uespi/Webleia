export const buscaDashboardCounters = (api, props, controller) => {
    return api.get(`dash/counts`, {
        signal: controller.signal,
        params: props,
    });
};