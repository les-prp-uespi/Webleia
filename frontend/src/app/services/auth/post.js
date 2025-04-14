export const doLogin = (api, props, controller) => {
  return api.post('acesso/login', props, {
    signal: controller.signal,
  });
};

export const cadastrarUsuario = (api, props, controller) => {
  return api.post('cadastro/aluno', props, {
    signal: controller.signal,
  });
};

export const recuperarSenha = (api, props, controller) => {
  return api.post('acesso/recuperar_senha', props, {
    signal: controller.signal,
  });
};

export const resetarSenha = (api, props, controller) => {
  return api.post('acesso/resetar_senha', props, {
    signal: controller.signal,
  });
};

export const checkToken = (api, props, controller) => {
  return api.post('acesso/check_token', props, {
    signal: controller.signal,
  });
};
