import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldErrors } from "react-hook-form";

interface AddressFormFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder: string;
  errors: FieldErrors;
}

const AddressFormField = ({
  control,
  name,
  label,
  placeholder,
  errors,
}: AddressFormFieldProps) => (
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
