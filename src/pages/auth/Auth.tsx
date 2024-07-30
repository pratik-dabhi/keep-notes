import "./auth.css";
import Icons from "../../components/icons/Icons";
import useFlipHandler from "./useFlipHandler";
import { IUserCredentials, IUserDetails } from "../../interfaces/interfaces";
import { decrypt, encrypt, setItem, stringify } from "../../lib/helper";
import { useNavigate } from "react-router-dom";
import userService from "../../lib/firebase/services/user.service";
import { useForm, SubmitHandler } from "react-hook-form"
import { toast } from 'react-toastify';
import { MESSAGES } from "../../lib/constant";

const Auth = () => {

  const [flipCardClass, handleFlipCard] = useFlipHandler();

  const navigate = useNavigate();

  const loginForm = useForm<IUserCredentials>()
  const registerForm = useForm<IUserDetails>()

  const loginHandler: SubmitHandler<IUserCredentials> = (data) => {
    userService.getByEmail(data.email).then(response => {
      if(response?.password){
        if(decrypt(response.password) == data.password){
          setItem('user',stringify(data));
          toast.success(MESSAGES.LOGIN_SUCCESS);
          navigate('/notes');
        }else{
          loginForm.reset();
          toast.error(MESSAGES.INVALID_CREDS);
        }
      }else{
        loginForm.reset();
        toast.error(MESSAGES.INVALID_CREDS);
      }
    });
  }

  const registerHandler: SubmitHandler<IUserDetails> = (data) => {
    userService.create({...data,password:encrypt(data.password)}).then(() => {
      registerForm.reset();
      toast.success(MESSAGES.REGISTER_SUCCESS);
      handleFlipCard()
    });
  }

  return (
      <div className={`md:py-16 lg:py-20 xl:py-36 min-h-screen ${flipCardClass} `}>
        <div className="flip-card-inner">

          {/* LOGIN FORM*/}

          <div className="flip-card-front">
            <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
              <div className="hidden lg:block lg:w-1/2 bg-cover" style={{backgroundImage:'url("https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80")',}}></div>
              <div className="w-full p-8 lg:w-1/2">
                <h2 className="text-2xl font-semibold text-gray-700 text-center">
                  {import.meta.env.VITE_APP_NAME}
                </h2>
                <a href="#" className="flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100">
                  <div className="px-4 py-3">
                    <Icons name="GOOGLE" />
                  </div>
                  <h1 className="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">
                    Sign in with Google
                  </h1>
                </a>
                <div className="mt-4 flex items-center justify-between text-xs text-center text-gray-500 uppercase">
                  <span className="border-b w-1/5 lg:w-2/5" /> or <span className="border-b w-1/5 lg:w-2/5" />
                </div>
                <form onSubmit={loginForm.handleSubmit(loginHandler)}>
                  <div className="mt-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Email
                    </label>
                    <input className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                      {...loginForm.register("email", { required: "The email is required!"})}
                    />
                    {loginForm.formState.errors.email?.message && <p className="text-red-600">{loginForm.formState.errors.email?.message}</p>}
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Password
                      </label>
                    </div>
                    <input className=" text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" 
                      type="password"
                      {...loginForm.register("password", { required: "The password is required!"})}
                    />
                    <span className={`flex ${loginForm.formState.errors.password?.message ? 'justify-between' : 'justify-end' } mt-1`}>
                    {loginForm.formState.errors.password?.message && <p className="text-red-600">{loginForm.formState.errors.password?.message}</p>}
                      <a href="#" className="text-xs text-gray-500">Forget Password?</a>
                    </span>
                  </div>
                  <div className="mt-8">
                    <input className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600" type="submit" value={"Login"} />
                  </div>
                </form>
                <div className="mt-4">
                  <p className="px-4 py-3 w-100 text-center"> Don't have an account?{" "}<button onClick={handleFlipCard} className="text-gray-600 font-bold">Sign Up</button></p>
                </div>
              </div>
            </div>
          </div>

          {/* REGISTER FORM */}

          <div className="flip-card-back">
            <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
              <div className="w-full p-8 lg:w-1/2">
                <h2 className="text-2xl font-semibold text-gray-700 text-center">
                  {import.meta.env.VITE_APP_NAME}
                </h2>
                <form onSubmit={registerForm.handleSubmit(registerHandler)}>
                  <div className="mt-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Username
                    </label>
                    <input className=" text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                      {...registerForm.register("username", { required: "The username is required!"})}
                    />
                    {registerForm.formState.errors.username?.message && <p className="text-red-600">{registerForm.formState.errors.username?.message}</p>}
                  </div>
                  <div className="mt-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Email
                    </label>
                    <input className=" text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                      {...registerForm.register("email", { required: "The email is required!"})}                                            
                    />
                    {registerForm.formState.errors.email?.message && <p className="text-red-600">{registerForm.formState.errors.email?.message}</p>}
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Password
                      </label>
                    </div>
                    <input className=" text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                      type="password"
                      {...registerForm.register("password", { required: "The password is required!"})}                                            
                    />
                    {registerForm.formState.errors.password?.message && <p className="text-red-600">{registerForm.formState.errors.password?.message}</p>}
                  </div>
                  <div className="mt-8">
                    <input className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600" type="submit" value={"Sign Up"} />
                  </div>
                </form>
                <div className="mt-4">
                  <p className="px-4 py-3 w-100 text-center"> Have an account?{" "} <button onClick={handleFlipCard} className="text-gray-600 font-bold"> Login</button></p>
                </div>
              </div>
              <div className="hidden lg:block lg:w-1/2 bg-cover" style={{backgroundImage:'url("https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80")',}}></div>
            </div>
          </div>

        </div>
      </div>
  );
};

export default Auth;
