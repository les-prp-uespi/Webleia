export const saveCategoriaPergunta = (api, props, controller) => {
  return api.post('categorias_pergunta', props, {
    signal: controller.signal,
  });
};
