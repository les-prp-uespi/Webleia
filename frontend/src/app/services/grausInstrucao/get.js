export const buscaGrausInstrucao = (api, props, controller) => {
  return api.get(`graus_instrucao`, {
    signal: controller.signal,
    params: props,
  });
};
