import { ButtonHTMLAttributes, FC } from 'react'
import Link, { LinkProps } from 'next/link'

interface ResponsiveNavLinkProps extends LinkProps {
    active: boolean
}

const ResponsiveNavLink: FC<ResponsiveNavLinkProps> = ({
    active = false,
    children,
    ...props
}) => (
    <Link {...props}>
        <a
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium leading-5 focus:outline-none transition duration-150 ease-in-out ${
                active
                    ? 'border-emerald-400 text-emerald-700 bg-emerald-50 focus:text-emerald-800 focus:bg-emerald-100 focus:border-emerald-700'
                    : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300'
            }`}
        >
            {children}
        </a>
    </Link>
)

export const ResponsiveNavButton = (
    props: ButtonHTMLAttributes<HTMLButtonElement>,
) => (
    <button
        className="block w-full pl-3 pr-4 py-2 border-l-4 text-left text-base font-medium leading-5 focus:outline-none transition duration-150 ease-in-out border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300"
        {...props}
    />
)

export default ResponsiveNavLink
