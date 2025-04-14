export const buscaInstituicoesEnsino = (api, props, controller) => {
  return api.get(`instituicoes_ensino`, {
    signal: controller.signal,
    params: props,
  });
};
