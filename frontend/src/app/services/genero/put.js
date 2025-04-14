export const updateGeneroTextual = (api, props, controller) => {
  return api.put(`generos_textuais/${props.id}`, props, {
    signal: controller.signal,
  });
};
