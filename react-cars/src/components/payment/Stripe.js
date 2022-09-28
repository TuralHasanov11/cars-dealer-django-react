import {useStripe, useElements, PaymentElement, CardElement} from '@stripe/react-stripe-js';
import useAuth from '../../hooks/useAuth';
import { useState, useEffect } from 'react';
import useAxiosPrivate from "../../hooks/useAxiosPrivate"

const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

export default function StripeForm({onPaymentError, createCar, loading}){
    
  const stripe = useStripe();
  const elements = useElements();
  const {user} = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const [paymentMethods, setPaymentMethods] = useState([])
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null)

  useEffect(()=>{
    async function getPaymentMethods(){
        const {data} = await axiosPrivate.get("payment/stripe/payment-methods")
        setPaymentMethods(data)
    }

    getPaymentMethods()

    return () => {}
  }, [])

  async function attachPaymentMethodToCustomer(paymentMethodId){
    try {
        const {data} = await axiosPrivate.post("payment/stripe/payment-methods/attach",{
            payment_method_id: paymentMethodId, 
        })

        return data
    } catch (error) {
       throw error 
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(selectedPaymentMethod){
      createCar(selectedPaymentMethod)
    }else{
      if (!stripe) {
        return;
      }
  
      if(!elements){
        return
      }
  
      const paymentElement = elements.getElement("card");
  
      const {paymentMethod, error} = await stripe.createPaymentMethod({
          type: 'card',
          card: paymentElement,
          billing_details: {
              name: user.username,
              email: user.email,
              phone: user.phone,
          },
      });
  
      setPaymentMethods(prev => [...prev, paymentMethod.id])
  
      await attachPaymentMethodToCustomer(paymentMethod.id)
  
      if (error) {
          onPaymentError(error.message)
      } else {
          createCar(paymentMethod.id)
      }
    }
  
  };

  

  return (
    <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label className="form-label text-light mb-2" htmlFor={'payment-method-'}>Name</label>
            <input disabled value={user.username} className={`form-control form-control-light mb-2`} id="payment-name"/>
        </div>
        <div className="mb-4">
            <label className="form-label text-light mb-2" htmlFor="payment-email">Email address</label>
            <input disabled value={user.email} className={`form-control form-control-light mb-2`} type="email" id="payment-email"/>
        </div>
        <div className="mb-4">
            <label className="form-label text-light mb-2" htmlFor="payment-phone">Phone</label>
            <input disabled value={user.account_profile.phone} className={`form-control form-control-light mb-2`} id="payment-phone"/>
        </div>
        {
          paymentMethods?.data?.map(method => (
            <div className="mb-4" key={method.id}>
                <label className="form-label text-light mb-2" htmlFor={`payment-method-${method?.id}`}>{method?.card?.brand + ' ************' + method?.card?.last4}</label>
                <input type="radio" onChange={(e)=>{setSelectedPaymentMethod(e.target.value)}} value={method?.id} className={`form-control form-control-light mb-2`} id={`payment-method-${method?.id}`}/>
            </div>))
        }
        <div className="mb-4">
          <label className="form-label text-light mb-2" htmlFor={`payment-method-0`}>New payment method</label>
          <input type="radio" onChange={(e)=>{setSelectedPaymentMethod(e.target.value)}} value="custom" className={`form-control form-control-light mb-2`} id={`payment-method-0`}/>
        </div>
        {selectedPaymentMethod === "custom" && <CardElement options={CARD_ELEMENT_OPTIONS} />}
        <button disabled={!stripe||loading} className="btn btn-primary btn-lg d-block mb-2">Submit</button>
    </form>
  )
};