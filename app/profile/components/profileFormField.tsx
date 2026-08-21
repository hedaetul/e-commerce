import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldErrors, FieldPath, FieldValues } from "react-hook-form";

interface ProfileFormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  type: string;
  placeholder: string;
  errors: FieldErrors<T>;
  personalInformation?: unknown;
}

const ProfileFormField = <T extends FieldValues>({
  control,
  name,
  type,
  label,
  placeholder,
  errors,
}: ProfileFormFieldProps<T>) => (
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
