export const buscaPerguntas = (api, props, controller) => {
  return api.get(`perguntas`, {
    signal: controller.signal,
    params: props,
  });
};

export const buscaPerguntasCount = (api, props, controller) => {
  return api.get(`perguntas/count`, {
    signal: controller.signal,
    params: props,
  });
};
