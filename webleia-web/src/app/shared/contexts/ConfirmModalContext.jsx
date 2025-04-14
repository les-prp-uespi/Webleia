import { Box, Typography } from "@mui/material";
import { GenericModal } from "../components";

const { createContext, useState, useContext, useRef } = require("react");


const useModalShow = () => {
    const [show, setShow] = useState(false)

    const hideModal = () => {
        setShow(false)
    }

    return {
        show, setShow, hideModal
    }
}

const ConfirmModalContext = createContext({})

const ConfirmModalProvider = (props) => {
    const { show, setShow, hideModal } = useModalShow()
    const [content, setContent] = useState()
    const [loading, setLoading] = useState(false)
    const resolver = useRef()

    const openConfirmModal = ({
        title,
        message,
        loader = false
    }) => {
        setContent({
            title,
            message,
            loader
        })
        setShow(true)
        return new Promise(function (resolve) {
            resolver.current = resolve
        })
    }

    const handleHideModal = () => {
        setLoading(false)
        setContent(null)
        hideModal()
    }

    const modalContext = {
        openConfirmModal,
        hideConfirmModal: handleHideModal
    }

    const handleConfirm = () => {
        resolver?.current?.(true)
        if (content.loader) {
            setLoading(true)
            return;
        }
        handleHideModal()
    }

    const handleCancel = () => {
        resolver?.current?.(false)
        handleHideModal()
    }

    const isMessageString = typeof content?.message === 'string'

    return (
        <ConfirmModalContext.Provider value={modalContext}>
            {props.children}

            {content && (
                <GenericModal
                    open={show}
                    onClose={handleHideModal}
                    size="xs"
                    preventCloseClickOutside
                    hasCloseIcon={!loading}
                    title={content.title || ''}
                    actions={[
                        {
                            label: "Cancelar",
                            disabled: loading,
                            color: "inherit",
                            onClick: handleCancel,
                            size: "small"
                        },
                        {
                            label: "Confirmar",
                            variant: "contained",
                            disabled: loading,
                            loading: loading,
                            onClick: handleConfirm,
                            size: "small"
                        },
                    ]}
                >
                    <Box
                        minHeight='60px'
                    >
                        {isMessageString ? (
                            <Typography>{content.message || ''}</Typography>
                        ) : (
                            content.message
                        )}
                    </Box>
                </GenericModal>
            )}
        </ConfirmModalContext.Provider>
    )

}

const useConfirmModal = () => useContext(ConfirmModalContext)

export {
    useModalShow,
    useConfirmModal,
    ConfirmModalProvider,
    ConfirmModalContext
}

export default ConfirmModalProvider