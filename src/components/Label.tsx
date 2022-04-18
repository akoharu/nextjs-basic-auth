import { FC, LabelHTMLAttributes } from 'react'

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    className?: string
}

const Label: FC<LabelProps> = ({ className, children, ...props }) => (
    <label
        className={`${className} block font-medium text-sm text-gray-700`}
        {...props}
    >
        {children}
    </label>
)

export default Label
