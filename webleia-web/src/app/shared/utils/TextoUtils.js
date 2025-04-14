export const groupPerguntasByCategoria = (perguntas, ignoreResposta_texto_final = false) => {
    let grouped = {}
    
    perguntas.forEach(pergunta => {
        const ignore = ignoreResposta_texto_final && String(pergunta.resposta_texto_final) === '0'
        if (!ignore) {
            const categoriaId = pergunta.categoria_pergunta_id
            if (grouped[categoriaId]) {
                const currentPerguntas = grouped[categoriaId].perguntas
                grouped[categoriaId] = {
                    ...grouped[categoriaId],
                    perguntas: [...currentPerguntas, pergunta]
                }
            } else {
                const newItem = { ...pergunta.categoria_pergunta, perguntas: [pergunta] }
                grouped[categoriaId] = newItem
            }
        }
    })

    return Object.values(grouped)
}

export const getCheckedPerguntasIds = (respostas) => {
    const perguntasIds = Object.keys(respostas)
    return perguntasIds.filter(perguntaId => {
        return respostas?.[perguntaId]?.checked && respostas?.[perguntaId]?.answered
    })
}

export const removeTags = (html) => {
    let div = document.createElement("div");
    div.innerHTML = html;
    const text = div.textContent || div.innerText || "";
    return text.trim()
}