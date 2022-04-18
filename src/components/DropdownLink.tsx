import { ButtonHTMLAttributes, FC } from 'react'
import Link, { LinkProps } from 'next/link'
import { Menu } from '@headlessui/react'

const DropdownLink: FC<LinkProps> = ({ children, ...props }) => (
    <Menu.Item>
        {({ active }) => (
            <Link {...props}>
                <a
                    className={`w-full text-left block px-4 py-2 text-sm leading-5 text-gray-700 ${
                        active ? 'bg-gray-100' : ''
                    } focus:outline-none transition duration-150 ease-in-out`}
                >
                    {children}
                </a>
            </Link>
        )}
    </Menu.Item>
)

export const DropdownButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
    children,
    ...props
}) => (
    <Menu.Item>
        {({ active }) => (
            <button
                className={`w-full text-left block px-4 py-2 text-sm leading-5 text-gray-700 ${
                    active ? 'bg-gray-100' : ''
                } focus:outline-none transition duration-150 ease-in-out`}
                {...props}
            >
                {children}
            </button>
        )}
    </Menu.Item>
)

export default DropdownLink
