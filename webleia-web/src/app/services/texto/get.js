export const buscaTextos = (api, props, controller) => {
    return api.get(`producoes_textual`, {
        signal: controller.signal,
        params: props,
    });
};

export const buscaTextoById = (api, props, controller) => {
    return api.get(`producoes_textual/${props.id}`, {
        signal: controller.signal,
        params: props,
    });
};

export const buscaTextoRanking = (api, props, controller) => {
    return api.get(`alunos/ranking`, {
        signal: controller.signal,
        params: props,
    });
};

