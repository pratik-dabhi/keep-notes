import { useState } from "react";
import { IUserCredentials, IUserDetails } from "../../interfaces/interfaces";
import { decrypt, encrypt, setItem, stringify } from "../../lib/helper";
import { useNavigate } from "react-router-dom";
import userService from "../../lib/firebase/services/user.service";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { IMAGES, MESSAGES } from "../../lib/constant";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const loginForm = useForm<IUserCredentials>();
  const registerForm = useForm<IUserDetails>();

  const loginHandler: SubmitHandler<IUserCredentials> = (data) => {
    userService.getByEmail(data.email).then((response) => {
      if (response?.password) {
        if (decrypt(response.password) === data.password) {
          setItem("user", stringify(response));
          toast.success(MESSAGES.LOGIN_SUCCESS);
          navigate("/notes");
        } else {
          loginForm.reset();
          toast.error(MESSAGES.INVALID_CREDS);
        }
      } else {
        loginForm.reset();
        toast.error(MESSAGES.INVALID_CREDS);
      }
    });
  };

  const registerHandler: SubmitHandler<IUserDetails> = (data) => {
    userService
      .create({ ...data, password: encrypt(data.password) })
      .then(() => {
        registerForm.reset();
        toast.success(MESSAGES.REGISTER_SUCCESS);
        setIsLogin(true);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 transition-colors duration-500">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden flex transform transition-all">
        {/* Left Side: Illustrative Image (hidden on small screens) */}
        <div className="hidden lg:block lg:w-1/2 relative bg-indigo-50">
          <div className="absolute inset-0 bg-indigo-600/10 mix-blend-multiply transition-colors duration-500"></div>
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src={IMAGES.LOGIN}
            alt="Authentication"
          />
          <div className="absolute inset-0 flex flex-col justify-center px-12 text-white bg-black/40 backdrop-blur-[2px]">
            <h2 className="text-4xl font-bold mb-4 tracking-tight">
              {isLogin ? "Welcome Back!" : "Join Us Today"}
            </h2>
            <p className="text-lg text-gray-100 font-medium">
              {isLogin
                ? "Sign in to continue organizing your life, taking notes, and staying productive."
                : "Create an account to quickly capture what's on your mind and manage your tasks."}
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-1/2 px-8 py-14 sm:px-12 xl:px-16 flex flex-col justify-center relative bg-white">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
              {import.meta.env.VITE_APP_NAME || "Keep Notes"}
            </h2>
            <p className="text-sm text-gray-500 font-medium">
              {isLogin
                ? "Sign in to access your account"
                : "Register for a new account"}
            </p>
          </div>

          <div className="relative">
            {isLogin ? (
              <form
                onSubmit={loginForm.handleSubmit(loginHandler)}
                className="space-y-6 animate-in fade-in duration-500"
              >
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Email address
                  </label>
                  <input
                    type="email"
                    className={`w-full rounded-xl border-gray-300 bg-gray-50 text-gray-900 shadow-sm focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 py-3 px-4 outline-none transition-all duration-200 border ${loginForm.formState.errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}
                    placeholder="name@example.com"
                    {...loginForm.register("email", {
                      required: "The email is required!",
                    })}
                  />
                  {loginForm.formState.errors.email?.message && (
                    <p className="mt-1.5 text-sm text-red-600 font-medium">
                      {loginForm.formState.errors.email?.message}
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-sm font-semibold text-gray-700">
                      Password
                    </label>
                  </div>
                  <input
                    type="password"
                    className={`w-full rounded-xl border-gray-300 bg-gray-50 text-gray-900 shadow-sm focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 py-3 px-4 outline-none transition-all duration-200 border ${loginForm.formState.errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}
                    placeholder="Enter your password"
                    {...loginForm.register("password", {
                      required: "The password is required!",
                    })}
                  />
                  {loginForm.formState.errors.password?.message && (
                    <p className="mt-1.5 text-sm text-red-600 font-medium">
                      {loginForm.formState.errors.password?.message}
                    </p>
                  )}
                  <div className="flex justify-end mt-2">
                    <button
                      type="button"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center mt-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 active:scale-[0.98]"
                >
                  Sign in
                </button>
              </form>
            ) : (
              <form
                onSubmit={registerForm.handleSubmit(registerHandler)}
                className="space-y-6 animate-in fade-in duration-500"
              >
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Username
                  </label>
                  <input
                    type="text"
                    className={`w-full rounded-xl border-gray-300 bg-gray-50 text-gray-900 shadow-sm focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 py-3 px-4 outline-none transition-all duration-200 border ${registerForm.formState.errors.username ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}
                    placeholder="Choose a username"
                    {...registerForm.register("username", {
                      required: "The username is required!",
                    })}
                  />
                  {registerForm.formState.errors.username?.message && (
                    <p className="mt-1.5 text-sm text-red-600 font-medium">
                      {registerForm.formState.errors.username?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Email address
                  </label>
                  <input
                    type="email"
                    className={`w-full rounded-xl border-gray-300 bg-gray-50 text-gray-900 shadow-sm focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 py-3 px-4 outline-none transition-all duration-200 border ${registerForm.formState.errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}
                    placeholder="name@example.com"
                    {...registerForm.register("email", {
                      required: "The email is required!",
                    })}
                  />
                  {registerForm.formState.errors.email?.message && (
                    <p className="mt-1.5 text-sm text-red-600 font-medium">
                      {registerForm.formState.errors.email?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Password
                  </label>
                  <input
                    type="password"
                    className={`w-full rounded-xl border-gray-300 bg-gray-50 text-gray-900 shadow-sm focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 py-3 px-4 outline-none transition-all duration-200 border ${registerForm.formState.errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}
                    placeholder="Create a strong password"
                    {...registerForm.register("password", {
                      required: "The password is required!",
                    })}
                  />
                  {registerForm.formState.errors.password?.message && (
                    <p className="mt-1.5 text-sm text-red-600 font-medium">
                      {registerForm.formState.errors.password?.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center mt-8 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 active:scale-[0.98]"
                >
                  Create account
                </button>
              </form>
            )}
          </div>

          <div className="mt-10 text-center">
            {isLogin ? (
              <p className="text-sm text-gray-600 font-medium">
                Don't have an account?{" "}
                <button
                  onClick={() => setIsLogin(false)}
                  className="font-bold text-indigo-600 hover:text-indigo-500 transition-colors focus:outline-none focus:underline"
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p className="text-sm text-gray-600 font-medium">
                Already have an account?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="font-bold text-indigo-600 hover:text-indigo-500 transition-colors focus:outline-none focus:underline"
                >
                  Log in
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
