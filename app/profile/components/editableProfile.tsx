import { Button } from "@/components/ui/button";
import Image from "next/image";
import { BsCameraFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import ProfileForm from "./profileForm";

const EditableProfile = ({ personalInformation }: { personalInformation: any }) => {
  console.log(personalInformation);

  return (
    <div className="flex w-full flex-col gap-6 rounded-md bg-white p-4 shadow-md">
      <div className="relative w-[100px]">
        <Image
          width={100}
          height={100}
          src={personalInformation?.photoUrl || <FaUser />}
          alt="User"
          className="mr-4 h-20 w-20 rounded-full"
        />
        <button className="absolute right-2 top-14 rounded-full bg-slate-200 p-2">
          <BsCameraFill />
        </button>
      </div>
      <div className="flex flex-col gap-4">
        <div className="mx-auto w-full rounded-lg">
          <ProfileForm personalInformation={personalInformation} />
        </div>
      </div>
    </div>
  );
};

export default EditableProfile;
