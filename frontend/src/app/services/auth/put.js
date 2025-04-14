export const atualizarAluno = (api, props, controller) => {
    return api.put(`alunos/${props.id}`, props.data, {
        signal: controller.signal,
    });
};

export const atualizarUsuario = (api, props, controller) => {
    return api.post(`usuarios/${props.id}`, props.data, {
        signal: controller.signal,
    });
};

export const alterarSenha = (api, props, controller) => {
    return api.post(`usuarios/alterar_senha`, props, {
        signal: controller.signal,
    });
};
