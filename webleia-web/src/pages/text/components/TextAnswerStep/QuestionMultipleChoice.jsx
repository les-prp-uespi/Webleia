import { Checkbox, FormControl, FormControlLabel, FormGroup, Radio, RadioGroup } from "@mui/material"
import { TextoPerguntaTypes } from "app/shared/constants"
import { useState } from "react"

const QuestionMultipleChoice = ({ pergunta, onChange, multipleRespostas = '' }) => {
    const [checkbox, setCheckbox] = useState(multipleRespostas.split(','))

    const handleChangeRadio = (e, value) => {
        onChange(String(value))
    }

    const handleChangeCheckbox = (checked, id) => {
        if (checked) {
            const newValue = [...checkbox, id]
            setCheckbox(newValue)
            onChange(newValue.join(","))
            return;
        }
        const newValue = checkbox.filter(currentId => currentId !== id)
        setCheckbox(newValue)
        onChange(newValue.join(","))
    }

    if (pergunta.tipo + '' === TextoPerguntaTypes.CHECKBOX) {
        return (
            <FormControl component="fieldset" variant="standard">
                <FormGroup>
                    {pergunta.itens.map(item => {
                        const checked = checkbox.includes(item.id)
                        return (
                            <FormControlLabel
                                key={item.id}
                                control={
                                    <Checkbox
                                        checked={checked}
                                        onChange={(e) => {
                                            handleChangeCheckbox(e.target.checked, item.id)
                                        }}
                                    />
                                }
                                label={item.descricao}
                            />
                        )
                    })}

                </FormGroup>
            </FormControl>
        )
    }

    if (pergunta.tipo + '' === TextoPerguntaTypes.RADIO) {
        return (
            <FormControl>
                <RadioGroup
                    defaultValue={multipleRespostas.split(',')?.[0]}
                    onChange={handleChangeRadio}
                    name="radio-buttons-group"
                >
                    {pergunta.itens.map(item => {
                        return (
                            <FormControlLabel
                                key={item.id}
                                value={item.id}
                                control={<Radio />}
                                label={item.descricao}
                            />
                        )
                    })}
                </RadioGroup>
            </FormControl>
        )
    }
    return null
}

export default QuestionMultipleChoice