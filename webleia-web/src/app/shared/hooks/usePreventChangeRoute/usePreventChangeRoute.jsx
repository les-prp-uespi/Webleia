import { useEffect } from "react";
import { useBlocker } from "react-router-dom";
import useConfirmModal from "../useConfirmModal";

const usePreventChangeRoute = (blocked) => {
    const confirmModal = useConfirmModal()

    let blocker = useBlocker(
        ({ currentLocation, nextLocation }) =>
            blocked.current &&
            currentLocation.pathname !== nextLocation.pathname
    );

    const showModal = async () => {
        const confirmed = await confirmModal.openConfirmModal({
            title: "Deseja deixar a página?",
            message: "Suas alterações não salvas podem ser perdidas!"
        })

        if (confirmed) {
            return blocker.proceed()
        }
        blocker.reset()
        confirmModal.hideConfirmModal()
        return;
    }

    useEffect(() => {
        if (blocker.state === "blocked") {
            showModal()
        }

        return () => {
            confirmModal.hideConfirmModal()
        }
    }, [blocker.state])
}

export default usePreventChangeRoute