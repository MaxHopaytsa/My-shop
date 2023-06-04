'use client'
import React,{useEffect,useCallback} from 'react';
import MemoizedInputPhone from '../../inputs/InputPhone';
import { useForm} from 'react-hook-form';
import { useDispatch,useSelector} from 'react-redux'
import {  clearCart } from '@/Redux/cartSlice';
import MemoizedInputs from '../../inputs/Inputs';
import MemoizedInputEmail from '../../inputs/InputEmail';
import OrderDishes from './OrderDishs';
import { createOrder } from '../../../_actions';
import {  totalPriceSumSelector } from '@/Redux/Selectors';
import ModalWindow from '../../modal/ModalWindow';
import { useModal } from '../../../hooks/useModal';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import MapComponent from './Map';

function OrderForm() {
  const eats = useSelector((state) => state.eats);
  const dispatch = useDispatch();
  const totalPriceSum = useSelector(totalPriceSumSelector)

  const { register, handleSubmit, formState: { errors, isValid }, reset , setValue, getValues } = useForm({
    mode: 'onChange',
  });

  const { isModalOpen, openModal, closeModal } = useModal();
  const [order, setOrder]= useLocalStorage({}, 'order');
  const [mapCenter, setMapCenter] = useLocalStorage(
    { lat: 
      50.4501, lng: 30.5234 },
    'mapCenterKey'
  );

  const { latitude, longitude } = eats.length > 0 ? eats[0].shop : {};
  console.log(latitude, longitude)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const destination = { lat: latitude, lng: longitude };

  //Change the location of the map marker when changing the coordinates entered by the user
  const handleAddressChange = useCallback( async() => {
    const city = getValues('city');
    const street = getValues('street');
    const house = getValues('house');
    const address = `${city}, ${street}, ${house}`;
    if (address) {
      try {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address }, (results, status) => {
          if (status === 'OK' && results.length > 0) {
            const { lat, lng } = results[0].geometry.location;
            const updatedMapCenter = { lat: lat(), lng: lng() };
            setMapCenter(updatedMapCenter);
          } else {
            console.error('Geocoding error:', status);
          }
        });
      } catch (error) {
        console.error('Error geocoding address:', error);
      }
    }
  }, [getValues, setMapCenter]);

//Updating a form from local storage
  useEffect(() => {
    const storedOrder = order
    if (storedOrder) {
      const { name, mobilePhoneNumber, email, city, street, house } = storedOrder;
      setValue('name', name || '');
      setValue('mobilePhoneNumber', mobilePhoneNumber|| '');
      setValue('email', email || '');
      setValue('city', city || '');
      setValue('street', street || '');
      setValue('house', house || '');
    }
    console.log('rr')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const updateLocalStorage = useCallback(() => {
    const formValues = getValues();
    setOrder(formValues);
  },[getValues, setOrder]);

//function for sending an order form
    const onSubmit = async(data) => {
      const { email} = data;
      const updatedData = {
              ...data,
              eats: eats,
              totalAmount: totalPriceSum,
              };
       if (email.trim()==='') {
              delete updatedData.email;
           }
       try {
        await createOrder(updatedData); 
        console.log('Order created successfully!');
        openModal();
        dispatch(clearCart());
        setValue('mobilePhoneNumber', ''); 
        reset();
        setOrder({})
      } catch (error) {
        console.error('Error creating order:', error);
        throw new Error('Error creating an order');
      }
    };
  
    const onClear = () => {
      dispatch(clearCart());
      setValue('mobilePhoneNumber', ''); 
      reset();
      setOrder({})
      setMapCenter({ lat: 50.4501, lng: 30.5234 })
    };

   const isSubmitDisabled = eats.length === 0 || !isValid;

    return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Order Form</h2>
          <form action={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-x-6 gap-y-8">
            <div className="col-span-3 sm:col-span-1 ">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-4 sm:gap-x-4">
             <MemoizedInputs label="name" title="Name" type="text" placeholder="Enter your name" updateLocalStorage={updateLocalStorage} register={register} errors={errors} />
             <MemoizedInputPhone  register={register} updateLocalStorage={updateLocalStorage} errors={errors} />
             <MemoizedInputEmail register={register} updateLocalStorage={updateLocalStorage} errors={errors}/>
             <MemoizedInputs label="city" updateLocalStorage={updateLocalStorage} handleAddressChange={handleAddressChange}  title="City" type="text" placeholder="Enter your city" register={register} errors={errors} />
             <MemoizedInputs label="street" updateLocalStorage={updateLocalStorage} handleAddressChange={handleAddressChange}  title="Street" type="text" placeholder="Enter your street" register={register} errors={errors} />
             <MemoizedInputs label="house" updateLocalStorage={updateLocalStorage} handleAddressChange={handleAddressChange}  title="House" type="text" placeholder="Enter your house" register={register} errors={errors} />
            </div>
            <MapComponent mapCenter={mapCenter} destination={destination} />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <OrderDishes eats={eats}  totalPriceSum={totalPriceSum} />
              <div className="flex justify-center mt-4">
    <input type="submit" value="Submit" disabled={isSubmitDisabled} className={`bg-blue-500 text-white px-4 py-2 rounded mr-4 ${isSubmitDisabled ? "disabled:bg-gray-400" : ""}`} /> 
    <button type="button" onClick={onClear} className="bg-red-500 text-white px-4 py-2 rounded">Clear all</button>
  </div>
            </div>
          </form>
        </div>
        {isModalOpen && (<ModalWindow onClick={closeModal} text='Thank you for your order!'/>)}

      </div>
    );
  } 
  export default OrderForm