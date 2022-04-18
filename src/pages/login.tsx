import { useEffect, useState, SyntheticEvent } from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/auth'
import ApplicationLogo from '@/components/ApplicationLogo'
import AuthCard from '@/components/AuthCard'
import AuthSessionStatus from '@/components/AuthSessionStatus'
import AuthValidationErrors from '@/components/AuthValidationErrors'
import Button from '@/components/Button'
import GuestLayout from '@/components/Layouts/GuestLayout'
import Input from '@/components/Input'
import Label from '@/components/Label'

const Login: NextPage = () => {
    const router = useRouter()

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/',
    })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState<string[]>([])
    const [status, setStatus] = useState<string | null>(null)

    useEffect(() => {
        if ((router.query.reset?.length as number) > 0 && errors.length === 0) {
            setStatus((window as any).atob(router.query.reset))
        } else {
            setStatus(null)
        }
    }, [router.query.reset, errors.length])

    const submitForm = async (event: SyntheticEvent) => {
        event.preventDefault()

        login({ email, password, setErrors, setStatus })
    }

    return (
        <GuestLayout>
            <AuthCard
                logo={
                    <Link href="/">
                        <a>
                            <ApplicationLogo className="mx-auto w-auto" />
                        </a>
                    </Link>
                }>
                {/* Session Status */}
                <AuthSessionStatus className="mb-4" status={status} />

                {/* Validation Errors */}
                <AuthValidationErrors className="mb-4" errors={errors} />
                <form className="space-y-6" onSubmit={submitForm}>
                    {/* Email Address */}
                    <div>
                        <Label
                            className="block text-sm font-medium text-gray-700"
                            htmlFor="email">
                            Email
                        </Label>
                        <div className="mt-1">
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                onChange={event => setEmail(event.target.value)}
                                required
                                autoFocus
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="mt-4">
                        <Label
                            className="block text-sm font-medium text-gray-700"
                            htmlFor="password">
                            Password
                        </Label>
                        <div className="mt-1">
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                onChange={event =>
                                    setPassword(event.target.value)
                                }
                                required
                                autoComplete="current-password"
                            />
                        </div>
                    </div>

                    {/* Remember Me */}

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember"
                                type="checkbox"
                                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                            />
                            <Label
                                htmlFor="remember-me"
                                className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </Label>
                        </div>

                        <div className="text-sm">
                            <Link href="/forgot-password">
                                <a className="font-medium text-emerald-600 hover:text-emerald-500">
                                    Forgot your password?
                                </a>
                            </Link>
                        </div>
                    </div>

                    <div>
                        <Button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                            Sign in
                        </Button>
                    </div>
                </form>
            </AuthCard>
        </GuestLayout>
    )
}

export default Login
