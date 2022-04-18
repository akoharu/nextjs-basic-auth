import { HTMLAttributes } from 'react'

interface AuthSessionStatusProps extends HTMLAttributes<HTMLDivElement> {
    className?: string
    status?: string | null
}

const AuthSessionStatus = ({
    status,
    className,
    ...props
}: AuthSessionStatusProps) => (
    <>
        {status && (
            <div
                className={`${className} font-medium text-sm text-green-600`}
                {...props}
            >
                {status}
            </div>
        )}
    </>
)

export default AuthSessionStatus
