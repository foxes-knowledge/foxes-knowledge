import { StylesConfig } from 'react-select'

export const tagStyles: StylesConfig = {
    control: styles => ({ ...styles, backgroundColor: '#fff' }),
    option: (styles, { data, isDisabled, isSelected }) => {
        return {
            ...styles,
            backgroundColor: isDisabled ? '#fff' : isSelected ? '#ff0000' : '#fff',
            color: (data as any).color,
            cursor: isDisabled ? 'not-allowed' : 'pointer',
        }
    },
    multiValue: (styles, { data }) => {
        return {
            ...styles,
            backgroundColor: (data as any).color,
            color: '#fff',
        }
    },
    multiValueLabel: styles => {
        return { ...styles, color: '#fff' }
    },
    multiValueRemove: styles => {
        return { ...styles, color: '#fff', cursor: 'pointer', ':hover': { color: '#fff' } }
    },
}
