export const createGeneroTextual = (api, props, controller) => {
  return api.post('generos_textuais', props, {
    signal: controller.signal,
  });
};
