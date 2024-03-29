import { useContext, useState } from "react";
import { useInput } from "../../hooks/use-input";
import { validations } from "../../hooks/use-validation";
import AuthContext from "../../store/auth-context";

function Password(){

    const authCtx = useContext(AuthContext)
    const [loading, setLoading] = useState(false)


    const {
        value: oldPassword, 
        isValid: oldPasswordIsValid,
        hasError:oldPasswordHasError, 
        valueChange: onOldPasswordChange, 
        valueBlur: onOldPasswordBlur,
        reset:resetOldPassword,
        messages:oldPasswordMessages,
      } = useInput({validations, rules:{required:true}})
  
    const {
        value: newPassword1, 
        isValid: newPassword1IsValid,
        hasError:newPassword1HasError, 
        valueChange: onNewPassword1Change, 
        valueBlur: onNewPassword1Blur,
        reset:resetNewPassword1,
        messages:newPassword1Messages,
    } = useInput({validations, rules:{required:true, minLength:6}})
    
    const {
        value: newPassword2, 
        isValid: newPassword2IsValid,
        hasError:newPassword2HasError, 
        valueChange: onNewPassword2Change, 
        valueBlur: onNewPassword2Blur,
        reset:resetNewPassword2,
        messages:newPassword2Messages,
    } = useInput({validations, rules:{required:true, sameAs:newPassword1}})
  
    let formIsValid = (oldPasswordIsValid && newPassword1IsValid && newPassword2IsValid)

    async function submitForm(e){
        e.preventDefault()
        setLoading(true)
  
        if(!formIsValid){
          return
        } 
  
        await authCtx.passwordChange({oldPassword, newPassword1, newPassword2})
          .then((res)=>{
            resetOldPassword()
            resetNewPassword1()
            resetNewPassword2()
            setLoading(false)
            
            console.log(res)
          })
          .catch((e)=>{
            setLoading(false)
          })
    }


    return <>
        <h1 className="h2 text-light">Password &amp; Security</h1>
        <p className="text-light pt-1">Manage your password settings and secure your account.</p>
        <h2 className="h5 text-light">Password</h2>
        <form onSubmit={submitForm} className="needs-validation pb-4">
            <div className="row align-items-end mb-2">
                <div className="col-sm-6 mb-2">
                    <label className="form-label text-light" htmlFor="account-password">Current password</label>
                    <div className="password-toggle">
                    <input value={oldPassword||''} onChange={onOldPasswordChange} onBlur={onOldPasswordBlur} 
                        className={`form-control form-control-light ${oldPasswordHasError?'is-invalid':'is-valid'}`} type="password" id="account-password"/>
                    {oldPasswordHasError ?  oldPasswordMessages.map((message, index)=>(<small key={index} className="invalid-tooltip">{message.text}</small>)):''}
                    </div>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-sm-6 mb-3">
                    <label className="form-label text-light" htmlFor="account-password-new">New password</label>
                    <div className="password-toggle">
                    <input value={newPassword1||''} onChange={onNewPassword1Change} onBlur={onNewPassword1Blur}  
                        className={`form-control form-control-light ${newPassword1HasError?'is-invalid':'is-valid'}`} type="password" id="account-password-new"/>
                    {newPassword1HasError ?  newPassword1Messages.map((message, index)=>(<small key={index} className="invalid-tooltip">{message.text}</small>)):''}
                    </div>
                </div>
                <div className="col-sm-6 mb-3">
                    <label className="form-label text-light" htmlFor="account-password-confirm">Confirm password</label>
                    <div className="password-toggle">
                    <input value={newPassword2||''} onChange={onNewPassword2Change} onBlur={onNewPassword2Blur} 
                        className={`form-control form-control-light ${newPassword2HasError?'is-invalid':'is-valid'}`} type="password" id="account-password-confirm"/>
                    {newPassword2HasError ?  newPassword2Messages.map((message, index)=>(<small key={index} className="invalid-tooltip">{message.text}</small>)):''}
                    </div>
                </div>
            </div>
            <button disabled={loading||!formIsValid} className="btn btn-outline-primary" type="submit">Update password</button>
        </form>        
    </>
}

export default Password;
