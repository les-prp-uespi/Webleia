export const saveUsoTextoFinal = (api, props, controller) => {
    return api
        .post("producao_textual_respostas/uso_texto_final", props, {
            signal: controller.signal,
        })
};
