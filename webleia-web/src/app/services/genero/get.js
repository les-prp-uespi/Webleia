export const buscaGenerosTextuais = (api, props, controller) => {
  return api.get(`generos_textuais`, {
    signal: controller.signal,
    params: props,
  });
};


export const buscaGenerosTextualById = (api, props, controller) => {
  return api.get(`generos_textuais/${props.id}`, {
    signal: controller.signal,
    params: props,
  });
};

export const buscaGenerosTextuaisCount = (api, props, controller) => {
  return api.get(`generos_textuais/count`, {
    signal: controller.signal,
    params: props,
  });
};
