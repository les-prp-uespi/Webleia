import { TextoStatusProps, TextoStatus } from "app/shared/constants"

const { Chip } = require("@mui/material")

const TextoStatusComponent = ({ status = 0 }) => {
    const isValidStatus = Object.values(TextoStatus).includes(Number(status))
    if (!isValidStatus) return null;

    const statusValues = TextoStatusProps[status]
    return <Chip size="small" color={statusValues.chipColor} label={statusValues.text} />
}

export default TextoStatusComponent