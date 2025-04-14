import { useEffect } from "react";


const usePreventCloseWindow = (blocked) => {
    const preventCloseHandler = (ev) => {
        if (!blocked.current) return;
        ev.preventDefault();
        ev.returnValue = '';
        return '';
    };

    useEffect(() => {
        window.addEventListener('beforeunload', preventCloseHandler);
        return () => {
            window.removeEventListener('beforeunload', preventCloseHandler);
        };
    }, [blocked]);
}

export default usePreventCloseWindow