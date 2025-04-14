export const saveTexto = (api, props, controller) => {
    return api
        .post("producoes_textual", props, {
            signal: controller.signal,
        })
};

export const duplicateTexto = (api, props, controller) => {
    return api
        .post(`producoes_textual/clone/${props.id}`, props, {
            signal: controller.signal,
        })
};

export const exportTexto = (api, props, controller) => {
    return api
        .post(`producoes_textual/export/${props.id}`, props, {
            signal: controller.signal,
            responseType: 'blob'
        })
};
