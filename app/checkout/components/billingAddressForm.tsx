import { AddressData } from '@/types/addressTypes';
import AddressForm from './addressForm';

interface BillingAddressFormProps {
  billingData: AddressData;
  handleBillingInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BillingAddressForm: React.FC<BillingAddressFormProps> = ({}) => {
  return <AddressForm title='Billing Address' />;
};

export default BillingAddressForm;
