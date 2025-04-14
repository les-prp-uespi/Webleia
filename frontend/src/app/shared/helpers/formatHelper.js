export const formatParams = (filtros) => {
  let filtrosClone = { ...filtros };
  for (let prop in filtrosClone) {
    if (filtrosClone[prop] === -1 || filtrosClone[prop] === undefined || filtrosClone[prop] === '')
      delete filtrosClone[prop];
  }
  return filtrosClone;
};
