import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import toast, {Toaster} from "react-hot-toast"

export default function Paypal() {
    function completePayment(data){
        console.log(data.orderID)
    }

    return (
        <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <PayPalButtons 
                style={{ layout: "horizontal" }} 
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units:{
                            amount:{
                                value:"10.00"
                            }
                        }
                    })
                }}
                onApprove={(data, actions)=>{
                    return actions.order.capture().then(details =>{
                        toast.success("Payment is successful, car is shared! Thank you" + details.payer.name.given_name)
                        completePayment(data)
                    })
                }}
                onCancel={()=>{
                    toast("Payment cancelled!", {
                        duration: 5000
                    })
                }}
                onError={()=>{
                    toast.error("Payment was not successful!", {
                        duration: 5000
                    })
                }}
            />
        </PayPalScriptProvider>
    );
}