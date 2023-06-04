'use client'
import React from 'react';
import MemoizedInputPhone from '../../inputs/InputPhone';
import { useForm} from 'react-hook-form';
import ModalWindow from '../../modal/ModalWindow';
import { useModal } from '../../../hooks/useModal';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { getOrderHistory } from '../../../_actions';
import HistoryDishes from './HistoryDishes';
//Order history form
function HistoryForm() {
  const { register, handleSubmit, formState: { errors, isValid }, reset , setValue, getValues } = useForm({
    mode: 'onChange',
  });
  const { isModalOpen, openModal, closeModal } = useModal();
  const [historyStorage, setHistoryStorage]= useLocalStorage([], 'history')

//The function of sending a request for order history
  const onSubmit = async (data) => {
    try {
      const history = await getOrderHistory(data);
      console.log('Order history:', history);
      if (history.length) {
        setHistoryStorage(history);
      } else {
        openModal();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      throw new Error('Error submitting form');
    }
  };
  
    const onClear = () => {
      setValue('mobilePhoneNumber', ''); 
      reset();
      setHistoryStorage([]);
    };

   const isSubmitDisabled = !isValid;
   
   return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Order Form</h2>
        <form action={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-x-6 gap-y-8">
          <div className="col-span-2">
            {historyStorage.length ? (
              <>
                <div className="flex justify-center mt-4">
                  <HistoryDishes eats={historyStorage} />
                </div>
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={onClear}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Clear history
                  </button>
                </div>
              </>
            ) : (
              <> 
              <h3 className=" flex justify-center font-bold text-lg ">Please enter your phone number to see your order history</h3>
                <div className="flex justify-center mt-4">
                  <MemoizedInputPhone register={register} errors={errors} />
                </div>
                <div className="flex justify-center mt-4">
                  <input
                    type="submit"
                    value="Submit"
                    disabled={isSubmitDisabled}
                    className={`bg-blue-500 text-white px-4 py-2 rounded mr-4 ${
                      isSubmitDisabled ? 'disabled:bg-gray-400' : ''
                    }`}
                  />
                  <button
                    type="button"
                    onClick={onClear}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Clear number
                  </button>
                </div>
              </>
            )}
          </div>
        </form>
      </div>
      {isModalOpen && <ModalWindow onClick={closeModal} text="Oh, no! It seems you haven't ordered anything yet!" />}
    </div>
  );
  } 
  export default HistoryForm