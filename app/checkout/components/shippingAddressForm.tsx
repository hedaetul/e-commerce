import { AddressData } from '@/types/addressTypes';
import AddressForm from './addressForm';

interface ShippingAddressFormProps {
  shippingData: AddressData;
  handleShippingInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showShippingAddress: boolean;
  handleShippingAddressToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ShippingAddressForm: React.FC<ShippingAddressFormProps> = ({
  showShippingAddress,
  handleShippingAddressToggle,
}) => {
  return (
    <div>
      <div className='flex items-center mb-4'>
        <input
          type='checkbox'
          checked={!showShippingAddress}
          onChange={handleShippingAddressToggle}
          id='sameAsBilling'
          className='mr-2'
        />
        <label htmlFor='sameAsBilling' className='text-sm'>
          Shipping address is the same as billing address
        </label>
      </div>
      {showShippingAddress && (
        <AddressForm
          title='Shipping Address'
        />
      )}
    </div>
  );
};

export default ShippingAddressForm;
