import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import useAuth from '../../hooks/useAuth';

export default function StripeForm({onPaymentError, createCar, loading}){
    
  const stripe = useStripe();
  const elements = useElements();
  const {user} = useAuth()

  const handleSubmit = async (event) => {
    event.preventDefault();

    
    if (!stripe || !elements) {
        return;
    }
  
    const paymentElement = elements.getElement("payment");
 
    // add these lines
    const {paymentMethod, error} = await stripe.createPaymentMethod({
        type: 'card',
        card: paymentElement,
        billing_details: {
            name: user.username,
            email: user.email,
            phone: user.phone,
        },
    });

    if (error) {
       onPaymentError(error.message)
    } else {
        createCar(paymentMethod.id)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label className="form-label text-light mb-2" htmlFor="payment-name">Name</label>
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
        <PaymentElement />
        <button disabled={!stripe||loading}>Submit</button>
    </form>
  )
};