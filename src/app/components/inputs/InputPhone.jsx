import React,{memo} from 'react';
import MaskedInput from 'react-input-mask';

function InputPhone({register,errors,updateLocalStorage}) {
  return (
    <div>
      <label htmlFor="mobilePhoneNumber" className="block text-sm font-medium text-gray-700">
        Phone Number <span className="text-red-500">*</span>
      </label>
      <MaskedInput
        mask="+38 (099) 999 99 99"
        id="mobilePhoneNumber"
        name="mobilePhoneNumber"
        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full outline-none shadow-sm sm:text-sm border-gray-300 rounded-md"
        required
        placeholder="Enter your phone number"
        {...register('mobilePhoneNumber', { required: true,onChange: updateLocalStorage, pattern: /^\+38 \(\d{3}\) \d{3} \d{2} \d{2}$/})}
      />
      {errors.phone && (
        <span>
          {errors.phone.type === 'required' ? 'This field is required' : 'Invalid phone number format'}
        </span>
      )}
    </div>
  );
}

const MemoizedInputPhone= memo(InputPhone)
export default MemoizedInputPhone