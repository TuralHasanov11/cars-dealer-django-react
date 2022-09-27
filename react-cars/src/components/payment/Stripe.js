import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import useAuth from '../../hooks/useAuth';
import { useState, useEffect } from 'react';
import useAxiosPrivate from "../../hooks/useAxiosPrivate"

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

    
    if (!stripe) {
        return;
    }
  
    if(selectedPaymentMethod){
        createCar(selectedPaymentMethod)
    }else{

        if(!elements){
            return
        }

        const paymentElement = elements.getElement("payment");

        const {paymentMethod, error} = await stripe.createPaymentMethod({
            type: 'card',
            card: paymentElement,
            billing_details: {
                name: user.username,
                email: user.email,
                phone: user.phone,
            },
        });

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
        {paymentMethods && selectedPaymentMethod
            ? paymentMethods?.data?.map(method => (
                <div className="mb-4">
                    <label className="form-label text-light mb-2" htmlFor={`payment-method-${method?.id}`}>{method?.card?.brand + ' ************' + method?.card?.last4}</label>
                    <input type="radio" onChange={(e)=>{setSelectedPaymentMethod(e.target.value)}} value={method?.id} className={`form-control form-control-light mb-2`} id={`payment-method-${method?.id}`}/>
                </div>))
            : <PaymentElement />}
        <button disabled={!stripe||loading}>Submit</button>
    </form>
  )
};