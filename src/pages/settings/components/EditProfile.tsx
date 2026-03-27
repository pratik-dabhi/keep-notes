import { useMemo } from "react";
import CommonModal from "../../../components/common/CommonModal";
import { IUserDetails } from "../../../interfaces/interfaces";
import { SubmitHandler, useForm } from "react-hook-form";
import userService from "../../../lib/firebase/services/user.service";
import { toast } from "react-toastify";
import { MESSAGES } from "../../../lib/constant";
import useAuth from "../../../hooks/useAuth";
import useLoader from "../../../hooks/useLoader";

type TEditProfileProps = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  user: Omit<IUserDetails, "password">;
};

const EditProfile = ({ setShowModal, user }: TEditProfileProps) => {
  const { setLoggedUser } = useAuth();
  const header = useMemo(
    () => (
      <h1 className="text-gray-700 my-2 py-2 px-4 block appearance-none">
        Edit Profile
      </h1>
    ),
    [],
  );

  const { register, handleSubmit, formState } = useForm<
    Omit<IUserDetails, "password">
  >({ defaultValues: { username: user.username, email: user.email } });
  const { setLoading } = useLoader();

  const formSubmitHandler: SubmitHandler<
    Omit<IUserDetails, "password">
  > = async (data) => {
    try {
      setLoading(true);
      await userService.update({
        id: user.id,
        data: { email: data.email, username: data.username },
      });

      setLoggedUser((prev) =>
        prev ? { ...prev, username: data.username, email: data.email } : null,
      );

      toast.success(MESSAGES.PROFILE_UPDATE);
      setShowModal(false);
    } catch (error) {
      console.error("Failed to update user:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CommonModal setShowModal={setShowModal} header={header}>
      <form
        className="max-w-md mx-auto py-10"
        onSubmit={handleSubmit(formSubmitHandler)}
      >
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            id="username"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            {...register("username", { required: "The username is required!" })}
          />
          <label
            htmlFor="username"
            className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Username
          </label>
          {formState.errors.username?.message && (
            <p className="text-red-600">{formState.errors.username?.message}</p>
          )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            {...register("email", { required: "The email is required!" })}
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email
          </label>
          {formState.errors.email?.message && (
            <p className="text-red-600">{formState.errors.email?.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Submit
        </button>
      </form>
    </CommonModal>
  );
};

export default EditProfile;
