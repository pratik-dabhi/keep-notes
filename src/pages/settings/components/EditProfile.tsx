import { useMemo, useState } from "react";
import CommonModal from "../../../components/common/CommonModal";
import { IUserDetails } from "../../../interfaces/interfaces";
import Icons from "../../../components/icons/Icons";
import { SubmitHandler, useForm } from "react-hook-form";
import userService from "../../../lib/firebase/services/user.service";
import { toast } from "react-toastify";
import { MESSAGES } from "../../../lib/constant";
import { getFileName } from "../../../lib/helper";
import useLoader from "../../../hooks/useLoader";

type TEditProfileProps = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  user: Omit<IUserDetails, "password"> & {
    profile :string | ArrayBuffer | null;
  };
};

const EditProfile = ({ setShowModal, user }: TEditProfileProps) => {
    const header = useMemo(() => (
      <h1 className="text-gray-700 my-2 py-2 px-4 block appearance-none"> Edit Profile</h1>
    ),[]);

    const [imgSrc, setImgSrc] = useState<string | ArrayBuffer | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const { register, handleSubmit, formState } = useForm<Omit<IUserDetails, "password"> & { profile :string | ArrayBuffer | null} >({defaultValues: { username: user.username, email: user.email}});
    const {setLoading} = useLoader();

    const onSelectFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files.length > 0) {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        const reader = new FileReader();

        reader.onloadend = () => {
            setImgSrc(reader.result);
        };

        reader.readAsDataURL(selectedFile);
        const renamedFile = getFileName(user.username)
        const newFile = new File([selectedFile], renamedFile, { type: selectedFile.type });
        setFile(newFile);
        }

    };

    const formSubmitHandler: SubmitHandler<Omit<IUserDetails, "password"> & { profile :string | ArrayBuffer | null}> = (data) => {
      setLoading(true);
      if(file){
        userService.upload(file).then((result) => {
          userService.update({id:user.id,data:{email:data.email,username:data.username,profile:result}}).then(() => {
            toast.success(MESSAGES.PROFILE_UPDATE)
            setShowModal(false);
            setLoading(false);
          });
        });
      }else{
        userService.update({id:user.id,data:{email:data.email,username:data.username}}).then((result) => console.log("User updated successfully!"+result));
        toast.success(MESSAGES.PROFILE_UPDATE)
        setShowModal(false);
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
          <label htmlFor="username" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
          {formState.errors.username?.message && ( <p className="text-red-600">{formState.errors.username?.message}</p> )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            {...register("email", { required: "The email is required!" })}
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Email </label>
          {formState.errors.email?.message && (<p className="text-red-600">{formState.errors.email?.message}</p>)}
        </div>

        <div className="flex items-center justify-center w-full mb-5">
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Icons name="UPLOAD" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500"> SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              {...register("profile", { required: "The profile picture is required!", onChange: onSelectFileHandler})}
            />
          </label>
        </div>
        
        {formState.errors.profile?.message && (<p className="text-red-600 mb-5">{formState.errors.profile?.message}</p>)}

        {imgSrc && (<img className="h-auto w-1/3 rounded-lg mb-5" src={imgSrc as string} alt="Selected file" />)}

        <button type="submit" className="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"> Submit </button>
      </form>
    </CommonModal>
  );
};

export default EditProfile;
