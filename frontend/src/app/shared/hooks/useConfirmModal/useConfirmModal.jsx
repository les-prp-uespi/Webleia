import { ConfirmModalContext } from "app/shared/contexts/ConfirmModalContext";
import { useContext } from "react";

export default function useConfirmModal() {
    return useContext(ConfirmModalContext)
}