export const savePergunta = (api, props, controller) => {
  return api.post('producao_textual_respostas', props, {
    signal: controller.signal,
  });
};

export const savePerguntaGeneroTextual = (api, props, controller) => {
  return api.post('perguntas', props, {
    signal: controller.signal,
  });
};
