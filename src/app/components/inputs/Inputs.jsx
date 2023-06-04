import React,{memo} from 'react'

function Inputs({label,type,title,placeholder,register,errors,updateLocalStorage, handleAddressChange}) {
  const handleChange = (event) => {
    updateLocalStorage(event);
    if (typeof handleAddressChange === 'function') {
      handleAddressChange(event);
    }
  };
  return (
    <div>
                <label htmlFor={label} className="block text-sm font-medium text-gray-700">
                  {title} <span className="text-red-500">*</span>
                </label>
                <input
                  type={type}
                  id={label}
                  name={label}
                  className="mt-1 focus:ring-blue-500 outline-none focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder={placeholder}
                  autoComplete="off"
                  {...register(label, { required: true, onChange: handleChange })}
                />
                {errors.label && <span>This field is required</span>}
              </div>
  )
}
const MemoizedInputs = memo(Inputs)
export default MemoizedInputs