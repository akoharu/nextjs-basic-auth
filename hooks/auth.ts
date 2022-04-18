import useSWR from "swr";
import axios from '../lib/axios'
import { useEffect } from "react";
import { useRouter } from "next/router";

interface ArgsType {
  middleware?: string;
  redirectIfAuthenticated?: string;
}

export const useAuth = ({
  middleware,
  redirectIfAuthenticated,
}: ArgsType = {}) => {
  const router = useRouter();

  const {
    data: user,
    error,
    mutate,
  } = useSWR("/api/user", () =>
    axios
      .get("/api/user")
      .then((res) => res.data)
      .catch((error) => {
        if (error.response.status != 409) throw error;

        router.push("/verify-email");
      })
  );

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  interface RegisterTypes {
    setErrors: any;
  }
  const register = async ({ setErrors, ...props }: RegisterTypes) => {
    await csrf();

    setErrors([]);

    axios
      .post("/api/register", props)
      .then(() => mutate())
      .catch((error) => {
        if (error.response.status != 422) throw error;

        setErrors(Object.values(error.response.data.errors).flat());
      });
  };

  interface LoginTypes {
    email: string;
    password: string;
    remember: boolean;
    setErrors: any;
    setStatus: any;
  }
  const login = async ({
    email,
    password,
    remember,
    setErrors,
    setStatus,
  }: LoginTypes) => {
    await csrf();

    setErrors([]);
    setStatus(null);

    return await axios
      .post("/api/login", {
        email: email,
        password: password,
        remember: remember,
      })
      .then(() => mutate())
      .catch((error) => {
        if (error.response.status && error.response.status != 422) throw error;

        setErrors(Object.values(error.response.data.errors).flat());
      });
  };

  interface ForgotPasswordTypes {
    setErrors: any;
    setStatus: any;
    email: string;
  }
  const forgotPassword = async ({
    setErrors,
    setStatus,
    email,
  }: ForgotPasswordTypes) => {
    await csrf();

    setErrors([]);
    setStatus(null);

    axios
      .post("/api/forgot-password", { email })
      .then((response) => setStatus(response.data.status))
      .catch((error) => {
        if (error.response.status != 422) throw error;

        setErrors(Object.values(error.response.data.errors).flat());
      });
  };

  interface ResetPasswordTypes {
    setErrors: any;
    setStatus: any;
  }
  const resetPassword = async ({
    setErrors,
    setStatus,
    ...props
  }: ResetPasswordTypes) => {
    await csrf();

    setErrors([]);
    setStatus(null);

    axios
      .post("/api/reset-password", { token: router.query.token, ...props })
      .then((response) =>
        router.push("/login?reset=" + btoa(response.data.status))
      )
      .catch((error) => {
        if (error.response.status != 422) throw error;

        setErrors(Object.values(error.response.data.errors).flat());
      });
  };

  interface ResendEmailVerificationTypes {
    setStatus: any;
  }
  const resendEmailVerification = ({
    setStatus,
  }: ResendEmailVerificationTypes) => {
    axios
      .post("/email/verification-notification")
      .then((response) => setStatus(response.data.status));
  };

  const logout = async () => {
    if (!error) {
      await axios.post("/api/logout");

      mutate();
    }

    window.location.pathname = "/login";
  };

  useEffect(() => {
    if (middleware == "guest" && redirectIfAuthenticated && user)
      router.push(redirectIfAuthenticated);
    if (middleware == "auth" && error) logout();
  }, [error]);

  return {
    user,
    register,
    login,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    logout,
  };
};