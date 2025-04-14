import { GenericModal } from "app/shared/components"
import { useApp, useFile, useService } from "app/shared/hooks"
import { useRef, useState } from "react";
import ReactCrop, {
    centerCrop,
    convertToPixelCrop,
    makeAspectCrop,
} from "react-image-crop";
import { setCanvasPreview } from "./utils";
import { Box } from "@mui/material";
import "react-image-crop/dist/ReactCrop.css";
import { atualizarUsuario } from "app/services/auth";
import toastr from 'toastr';

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

const EditFotoUserModal = ({ open, onClose }) => {
    const { user, updateUser } = useApp()
    const { dataURLtoFile } = useFile()

    const { request, response } = useService(atualizarUsuario, {
        onSuccess: (data) => {
            toastr.success("Foto de perfil alterada com sucesso!");
            updateUser({ ...user, foto: data.foto })
            onClose()
        }
    })
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [imgSrc, setImgSrc] = useState("");
    const [crop, setCrop] = useState();
    const [error, setError] = useState("");

    const onSelectFile = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.addEventListener("load", () => {
            const imageElement = new Image();
            const imageUrl = reader.result?.toString() || "";
            imageElement.src = imageUrl;

            imageElement.addEventListener("load", (e) => {
                if (error) setError("");
                const { naturalWidth, naturalHeight } = e.currentTarget;
                if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
                    setError("Image must be at least 150 x 150 pixels.");
                    return setImgSrc("");
                }
            });
            setImgSrc(imageUrl);
        });
        reader.readAsDataURL(file);
    };

    const onImageLoad = (e) => {
        const { width, height } = e.currentTarget;
        const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

        const crop = makeAspectCrop(
            {
                unit: "%",
                width: cropWidthInPercent,
            },
            ASPECT_RATIO,
            width,
            height
        );
        const centeredCrop = centerCrop(crop, width, height);
        setCrop(centeredCrop);
    };

    const convertToFormData = (formObj) => {
        const formData = new FormData();
        const keys = Object.keys(formObj);
        keys.forEach((key) => {
            if (formObj[key] !== undefined) {
                formData.append(key, formObj[key] || "");
            }
        });
        return formData;
    };

    const handleConfirm = () => {
        setCanvasPreview(
            imgRef.current, // HTMLImageElement
            previewCanvasRef.current, // HTMLCanvasElement
            convertToPixelCrop(
                crop,
                imgRef.current.width,
                imgRef.current.height
            )
        );
        const dataUrl = previewCanvasRef.current.toDataURL('image/jpeg', 0.5);
        const file = dataURLtoFile(dataUrl, "newProfilePic.jpeg")

        const payload = {
            _method: "PUT",
            foto: file
        }

        request({ id: user.id, data: convertToFormData(payload) })
    }

    return (
        <GenericModal
            open={open}
            title="Editar informações"
            preventCloseClickOutside
            hasCloseIcon={false}
            size="sm"
            actions={[
                {
                    color: 'default',
                    onClick: onClose,
                    disabled: response.loading,
                    label: "CANCELAR"
                },
                {
                    label: "CONFIRMAR",
                    loading: response.loading,
                    onClick: handleConfirm
                }
            ]}
        >
            <>
                <Box display='flex' flexDirection='column' alignItems='center' gap="10px">
                    <label >
                        <span>Escolha uma foto </span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={onSelectFile}
                        />
                    </label>
                    {error && <p className="text-red-400 text-xs">{error}</p>}
                    {imgSrc && (
                        <div className="flex flex-col items-center">
                            <ReactCrop
                                crop={crop}
                                onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
                                circularCrop
                                keepSelection
                                aspect={ASPECT_RATIO}
                                minWidth={MIN_DIMENSION}
                            >
                                <img
                                    ref={imgRef}
                                    src={imgSrc}
                                    alt="Upload"
                                    style={{ maxHeight: 400 }}
                                    onLoad={onImageLoad}
                                />
                            </ReactCrop>

                        </div>
                    )}
                    {crop && (
                        <canvas
                            ref={previewCanvasRef}
                            className="mt-4"
                            style={{
                                display: "none",
                                border: "1px solid black",
                                objectFit: "contain",
                                width: 150,
                                height: 150,
                            }}
                        />
                    )}
                </Box>
            </>
        </GenericModal>
    )
}

export default EditFotoUserModal