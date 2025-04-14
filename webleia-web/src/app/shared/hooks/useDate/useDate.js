const useDate = () => {
  const getTextoPeriodo = (inicio, termino) => {
    if (!inicio || !termino) return "-";
    const inicioDate = new Date(inicio).setUTCHours(3);
    const terminoDate = new Date(termino).setUTCHours(3);

    const dateFromater = new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "short",
      timeZone: "america/sao_paulo",
    });

    const inicioFormatado = dateFromater.format(inicioDate);
    const fimFormatado = dateFromater.format(terminoDate);

    return `${inicioFormatado} a ${fimFormatado}`;
  };

  return {
    getTextoPeriodo,
  };
};

export default useDate;
