export const updateTexto = (api, props, controller) => {
    return api
        .put(`producoes_textual/${props.id}`, props, {
            signal: controller.signal,
        })
};
