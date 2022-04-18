import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string
    disabled?: boolean
}

const Input = ({ disabled = false, className, ...props }: InputProps) => (
    <input
        disabled={disabled}
        className={`${className} rounded-md shadow-sm border-gray-300 focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50`}
        {...props}
    />
)

export default Input
