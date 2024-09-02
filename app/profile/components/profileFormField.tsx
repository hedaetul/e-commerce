import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { Control, FieldErrors } from "react-hook-form";

interface ProfileFormFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  type: any;
  placeholder: string;
  errors: FieldErrors;
  personalInformation: any;
}

const ProfileFormField: React.FC<ProfileFormFieldProps> = ({
  control,
  name,
  type,
  label,
  placeholder,
  errors,
  personalInformation,
}) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input id={name} type={type} placeholder={placeholder} {...field} />
        </FormControl>
        <FormMessage>{errors[name]?.message?.toString() || ""}</FormMessage>
      </FormItem>
    )}
  />
);

export default ProfileFormField;
