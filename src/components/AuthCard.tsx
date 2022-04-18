import { FC, ReactElement } from 'react'

const AuthCard: FC<{ logo: ReactElement }> = ({ logo, children }) => (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
            {logo}
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                {children}
            </div>
        </div>
    </div>
)

export default AuthCard
