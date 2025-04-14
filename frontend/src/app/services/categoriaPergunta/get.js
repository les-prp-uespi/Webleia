export const buscaCategoriasPergunta = (api, props, controller) => {
  return api.get(`categorias_pergunta`, {
    signal: controller.signal,
    params: props,
  });
};

export const buscaCategoriaPergunta = (api, props, controller) => {
  return api.get(`categorias_pergunta/${props.id}`, {
    signal: controller.signal,
    params: props,
  });
};
