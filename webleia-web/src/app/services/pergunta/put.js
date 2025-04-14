export const updatePergunta = (api, props, controller) => {
  return api.put(`producao_textual_respostas/${props.id}`, props, {
    signal: controller.signal,
  });
};

export const updatePerguntaGeneroTextual = (api, props, controller) => {
  return api.put(`perguntas/${props.id}`, props, {
    signal: controller.signal,
  });
};
