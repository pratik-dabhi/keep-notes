import { useEffect, useState } from "react";
import useSidebar from "../../hooks/useSidebar";
import Icons from "../../components/icons/Icons";
import useAuth from "../../hooks/useAuth";
import EditProfile from "./components/EditProfile";
import { IMAGES } from "../../lib/constant";

const Profile = () => {

  const {setVisible } = useSidebar();
  const {loggedUser } = useAuth();
  const [showModal , setShowModal] = useState(false);

  useEffect(() => {
    setVisible(true)
  })

  return (
    <div className="p-20 bg-slate-700 w-full">
      <h1 className="text-2xl font-bold text-white mb-3">Profile</h1>
        <div className="relative bg-white p-6 rounded-lg shadow-lg w-full flex gap-5">
          <div>
            <img src={loggedUser?.profile ? loggedUser?.profile : IMAGES.NO_IMAGES} alt="" className="w-16 md:w-32 lg:w-48 rounded" />
          </div>
          <div>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">{loggedUser?.username}</h2>
          </div>
          <button className="absolute right-0 mr-10" onClick={() => setShowModal(true)}><Icons name="PEN"/></button>
          { showModal && <EditProfile setShowModal={setShowModal} user = {{id:loggedUser?.id ?? "", email:loggedUser?.email ?? "" , username: loggedUser?.username ?? "" , profile:loggedUser?.profile ?? ""}} /> }
        </div>
    </div>
  )}

export default Profile