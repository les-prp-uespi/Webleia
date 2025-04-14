export const TextoStatus = {
    NAO_INICIADO: 0,
    EM_ANDAMENTO: 1,
    CONCLUIDO: 2,
};

export const TextoFileTypes = {
    PDF: 'pdf',
    TXT: 'txt',
    DOCX: 'docx',
};

export const TextoPerguntaTypes = {
    TEXT: '1',
    NUMBER: '2',
    RADIO: '3',
    CHECKBOX: '4',
};

export const TextoPerguntaLista = [
    TextoPerguntaTypes.TEXT,
    TextoPerguntaTypes.NUMBER,
    TextoPerguntaTypes.RADIO,
    TextoPerguntaTypes.CHECKBOX,
]

export const TextoPerguntaTypesProps = {
    [TextoPerguntaTypes.TEXT]: {
        text: "Texto"
    },
    [TextoPerguntaTypes.NUMBER]: {
        text: "Número"
    },
    [TextoPerguntaTypes.RADIO]: {
        text: "Escolha única"
    },
    [TextoPerguntaTypes.CHECKBOX]: {
        text: "Múltipla escolha"
    },
};

export const TextoFileTypesProps = {
    [TextoFileTypes.PDF]: {
        text: "PDF"
    },
    [TextoFileTypes.TXT]: {
        text: "TXT"
    },
    [TextoFileTypes.DOCX]: {
        text: "DOCX"
    },
};

export const TextoStatusProps = {
    [TextoStatus.EM_ANDAMENTO]: {
        chipColor: "secondary",
        text: "Em andamento"
    },
    [TextoStatus.NAO_INICIADO]: {
        chipColor: "default",
        text: "Não iniciado"
    },
    [TextoStatus.CONCLUIDO]: {
        chipColor: "success",
        text: "Concluído"
    },
};