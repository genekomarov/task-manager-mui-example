import React from "react"

const getBreakedString = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value
    let start = e.currentTarget.selectionStart
    let end = e.currentTarget.selectionEnd

    e.currentTarget.value =
        value.slice(0, start !== null ? start : undefined) + '\n' +
        value.slice(end !== null ? end : undefined, value.length-1)

    e.currentTarget.selectionStart = start ? start + 1 : value.length - 1
    e.currentTarget.selectionEnd = start ? start + 1 : value.length - 1

    return e
}

export const keyDownOnTextarea = (
    handleSubmit: () => void,
    handleChange: (e: React.KeyboardEvent<HTMLInputElement>) => void,
    userAgent: string
) => (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.ctrlKey) {
        if (/Windows NT/.test(userAgent)) {
            handleSubmit()
            e.preventDefault()
        }
    } else if (e.key === 'Enter' && e.ctrlKey) {
        handleChange(getBreakedString(e))
    }
}