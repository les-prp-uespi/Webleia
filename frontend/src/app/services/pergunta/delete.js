export const deletePerguntaGeneroTextual = (api, props, controller) => {
  return api.delete(`perguntas/${props.id}`, props, {
    signal: controller.signal,
  });
};

export const deleteGeneroTextual = (api, props, controller) => {
  return api.delete(`generos_textuais/${props.id}`, props, {
    signal: controller.signal,
  });
};
