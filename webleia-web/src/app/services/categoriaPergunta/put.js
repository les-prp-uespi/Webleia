export const editCategoriaPergunta = (api, props, controller) => {
  return api.put(`categorias_pergunta/${props.id}`, props, {
    signal: controller.signal,
  });
};
