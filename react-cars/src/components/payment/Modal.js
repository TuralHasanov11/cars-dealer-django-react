import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import React, { useState } from 'react'
import StripeForm from './Stripe'

const stripePromise = loadStripe('pk_test_');

export default function PaymentModal({createCar, loading}) {

    const [paymentError, setPaymentError] = useState()

    function handlePaymentError(message){
        setPaymentError(message)
    }

  return (
    <div className="modal fade" id="payment-modal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered p-2 my-0 mx-auto" style={{'maxWidth':'950px'}}>
          <div className="modal-content bg-dark border-light">
            <div className="modal-body px-0 py-2 py-sm-0">
              <button className="btn-close btn-close-white position-absolute top-0 end-0 mt-3 me-3" type="button" data-bs-dismiss="modal"></button>
              <div className="row mx-0 align-items-center">
                <div className="col-md-6 border-end-md border-light p-4 p-sm-5">
                  <h2 className="h3 text-light mb-4 mb-sm-5">Checkout!</h2>
                  <img className="d-block mx-auto" src="/assets/img/signin-modal/signin-dark.svg" width="344" alt="Illustartion"/>
                </div>
                <div className="col-md-6 px-4 pt-2 pb-4 px-sm-5 pb-sm-5 pt-md-5">
                    {paymentError && 
                        <div className="alert alert-danger bg-faded-danger border-danger mb-4" role="alert">
                            <div className="d-flex">
                                <i className="fi-alert-circle me-2 me-sm-3"></i>
                                <p className="fs-sm mb-1">{paymentError}</p>
                            </div>
                        </div>
                    }

                    <Elements stripe={stripePromise}>
                        <StripeForm loading={loading} onPaymentError={handlePaymentError} createCar={createCar} />
                    </Elements>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
