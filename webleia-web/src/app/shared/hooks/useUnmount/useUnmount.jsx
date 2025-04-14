import { useEffect, useRef } from "react";

const useUnmount = (func) => {
  const funcRef = useRef(func);

  funcRef.current = func;

  useEffect(
    () => () => {
      funcRef.current();
    },
    []
  );
};

export default useUnmount;
