import { MenuItem, OutlinedTextFieldProps, TextField } from '@mui/material'
import { ReactNode, useEffect, useState } from 'react'

interface TextFieldSelectProps<T> extends Omit<OutlinedTextFieldProps, 'variant'> {
    options: T[]
    getOptionLabel: (option: T) => string | ReactNode
    getOptionValue: (option: T) => string | number
}

const TextFieldSelect = <T extends Record<string, unknown> | unknown>(props: TextFieldSelectProps<T>) => {
    const { options, getOptionLabel, getOptionValue, autoComplete, ...rest } = props

    const [state, setState] = useState(props.value ?? props.defaultValue ?? '')

    useEffect(() => {
        setState(props.value ?? '')
    }, [props.value])

    return (
        <TextField
            {...rest}
            autoComplete={autoComplete ?? 'none'}
            select
            value={state}
            onChange={e => {
                if (props.onChange) props.onChange(e)
                setState(e.target.value)
            }}
            variant="outlined"
        >
            {options.map((option, index) => (
                <MenuItem key={index} value={getOptionValue(option)}>
                    {getOptionLabel(option)}
                </MenuItem>
            ))}
        </TextField>
    )
}

export default TextFieldSelect
