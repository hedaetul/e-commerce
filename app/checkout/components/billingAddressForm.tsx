import AddressForm from "./addressFormx";

interface BillingAddressFormProps {
  handleBillingInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BillingAddressForm: React.FC<BillingAddressFormProps> = ({}) => {
  return <AddressForm title="Billing Address" />;
};

export default BillingAddressForm;
