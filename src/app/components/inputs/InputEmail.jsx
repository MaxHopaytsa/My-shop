import React,{memo} from 'react'

function InputEmail({register,errors,updateLocalStorage}) {
  return (
    <div>
               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                 Email <span className="text-red-500">*</span>               
             </label>
               <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 focus:ring-blue-500 outline-none focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter your email"
                  {...register('email',  { required: true,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                    onChange: updateLocalStorage
                  })}
                />
                {errors.email && <span>{errors.email.message}</span>}
              </div>
  )
}
const MemoizedInputEmail = memo(InputEmail)
export default MemoizedInputEmail