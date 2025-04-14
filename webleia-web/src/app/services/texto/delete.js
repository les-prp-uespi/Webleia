export const deleteTexto = (api, props, controller) => {
    return api
        .delete(`producoes_textual/${props.id}`, props, {
            signal: controller.signal,
        })
};
