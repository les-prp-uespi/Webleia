export const buscaAluno = (api, props, controller) => {
    return api.get(`alunos/${props.id}`, {
        signal: controller.signal,
        params: props,
    });
};