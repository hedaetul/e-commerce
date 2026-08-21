import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldErrors, FieldPath, FieldValues } from "react-hook-form";

interface AddressFormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder: string;
  errors: FieldErrors<T>;
}

const AddressFormField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  errors,
}: AddressFormFieldProps<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input id={name} type="text" placeholder={placeholder} {...field} />
        </FormControl>
        <FormMessage>{errors[name]?.message?.toString() || ""}</FormMessage>
      </FormItem>
    )}
  />
);

export default AddressFormField;
