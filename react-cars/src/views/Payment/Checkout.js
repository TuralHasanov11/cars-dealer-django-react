import React, { useContext, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import StripeForm from '../../components/payment/Stripe'

import Preview from '../../components/cars/Preview';
import CarsContext from '../../store/cars-context';
import {useNavigate} from 'react-router-dom';
import AuthContext from '../../store/auth-context';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY, {
  stripeAccount: process.env.REACT_APP_STRIPE_ACCOUNT_ID
});

export default function Checkout() {

  const navigate = useNavigate();
  const {user} = useState(AuthContext)
  const {carPreview} = useContext(CarsContext)
  const [paymentError, setPaymentError] = useState()
  const axiosPrivate = useAxiosPrivate()
  const [paymentStarted, setPaymentStarted] = useState(false)
  const [paymentLoading, setPaymentLoading] = useState(false)

  const [clientSecret, setClientSecret] = useState(null)
  const options = {
    clientSecret,
  };

  function handlePaymentError(message){
      setPaymentError(message)
  }

  async function startPayment(){
    setPaymentLoading(true)
    try {
      const {data} = await axiosPrivate.post("payment/stripe/create-payment", {
        session_id: sessionStorage.getItem("car_create_session_id") ?? null
      })
      setClientSecret(data.client_secret)
      sessionStorage.setItem("car_create_session_id", data.id)
      setPaymentStarted(true)
      setPaymentLoading(false)
    } catch (error) {
      setPaymentLoading(false)
      setPaymentStarted(false)
    }
  }

  async function createCar(paymentMethodId){
    setPaymentLoading(true)

    try {
        const formData = new FormData();
        
        formData.append("brand", carPreview.brand);
        formData.append("car_model", carPreview.car_model)
        formData.append("currency", carPreview.currency)
        formData.append("city", carPreview.city)
        formData.append("color", carPreview.color)
        formData.append("car_body", carPreview.car_body)
        formData.append("engine", carPreview.engine)
        formData.append("gear_lever", carPreview.gear_lever)
        formData.append("transmission", carPreview.transmission)
        formData.append("fuel", carPreview.fuel)
        formData.append("equipment", carPreview.equipment)
        formData.append("price", carPreview.price)
        formData.append("barter", carPreview.barter)
        formData.append("credit", carPreview.credit)
        formData.append("distance", carPreview.distance)
        formData.append("description", carPreview.description)
        formData.append("made_at", carPreview.made_at)
        formData.append("front_image", carPreview.front_image.file) 
        formData.append("back_image", carPreview.back_image.file)
        formData.append("panel_image", carPreview.panel_image.file)
        
        if(carPreview.other_images?.length > 0){
            formData.append("other_images", carPreview.other_images.map(file => file.file))
        }
        formData.append("payment_method_id", paymentMethodId)
        formData.append("payment_id", sessionStorage.getItem("car_create_session_id"))

        const res = await axiosPrivate.post(`auto/cars`, formData)
        
        if(res.status===201){
          navigate(`/user/${user.id}/cars`)
          setPaymentLoading(false)
        }
    } catch (error) {
      setPaymentLoading(false)
    }
        
}

  return (<div className="container mt-5 mb-md-4 py-5">
  <div className="row">
    <div className="col-12 col-sm-4 col-md-6">
      <div className="mb-4">
          <h1 className="h2 text-light mb-0">Checkout</h1>
          <button disabled={paymentStarted|paymentLoading} onClick={startPayment} type="button" className="btn btn-primary btn-lg d-block mb-2">Start Payment</button>
          <button type="button" onClick={() => navigate(-1)} className="btn btn-secondary btn-lg d-block mb-2">Back</button>
      </div>
      {paymentStarted &&
        <>
          {paymentError && 
            <div className="alert alert-danger bg-faded-danger border-danger mb-4" role="alert">
                <div className="d-flex">
                    <i className="fi-alert-circle me-2 me-sm-3"></i>
                    <p className="fs-sm mb-1">{paymentError}</p>
                </div>
            </div>
          }

          {clientSecret && 
            (<Elements stripe={stripePromise} options={options}>
                <StripeForm onPaymentError={handlePaymentError} createCar={createCar} />
            </Elements>)
          }
        </>
      }
    </div>

    <div className="col-12 col-sm-8 col-md-6">
      <div className="mb-4">
          <h1 className="h2 text-light mb-0">Preview</h1>
      </div>
      <Preview />
    </div>
  </div>
</div>)
}
