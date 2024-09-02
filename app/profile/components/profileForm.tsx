import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAuth } from "@/context/AuthContext";
import { firestore } from "@/lib/firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import { doc, updateDoc } from "firebase/firestore";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ProfileFormField from "./profileFormField";

const ProfileSchema = z.object({
  name: z.string(),
  email: z.string().email("Invalid email address"),
  number: z.string(),
  birthDate: z.string(),
  photoUrl: z.string(),
  loginMethod: z.string(),
});

type ProfileFormValues = z.infer<typeof ProfileSchema>;
type ProfileFormProps = {
  personalInformation: any;
};

const ProfileForm: React.FC<ProfileFormProps> = ({ personalInformation }) => {
  const { user } = useAuth();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: personalInformation?.name || "",
      email: personalInformation?.email || "",
      number: personalInformation?.number || "",
      birthDate: personalInformation?.birthDate || "",
      photoUrl: user?.photoURL || "",
      loginMethod: user?.providerData[0].providerId,
    },
  });
  const { handleSubmit, control, formState } = form;

  const onSubmit = async (formData: ProfileFormValues) => {
    if (!user) {
      console.log("User not authenticated");
      return;
    }
    try {
      const userRef = doc(firestore, "users", user.uid);
      await updateDoc(userRef, { personalInformation: formData });
      console.log("user details updated sucessfully");
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <ProfileFormField
              control={control}
              name="name"
              type="text"
              label="Name"
              placeholder={personalInformation.name}
              errors={formState.errors}
              personalInformation={personalInformation}
            />
            <ProfileFormField
              control={control}
              name="email"
              type="text"
              label="Email"
              placeholder={personalInformation.email}
              errors={formState.errors}
              personalInformation={personalInformation}
            />
            <ProfileFormField
              control={control}
              name="number"
              type="text"
              label="Phone Number"
              placeholder={personalInformation.number}
              errors={formState.errors}
              personalInformation={personalInformation}
            />
            <ProfileFormField
              control={control}
              name="birthDate"
              type="date"
              label="Date of Birth"
              placeholder={personalInformation.birthDate}
              errors={formState.errors}
              personalInformation={personalInformation}
            />
          </div>
          <Button
            onClick={() => handleSubmit(onSubmit)()}
            className="mt-2 cursor-pointer"
            type="submit"
          >
            Save changes
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProfileForm;
