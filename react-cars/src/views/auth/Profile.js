import { useContext, useRef, useState } from "react"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import { useInput } from "../../hooks/useInput"
import AuthContext from "../../store/auth-context"
import { validations } from '../../hooks/useValidation'
import { useNavigate } from "react-router-dom"
import sumServerErrors from "../../helpers/sumServerErrors"

function Profile(){

    const {user} = useContext(AuthContext)
    const axiosPrivate = useAxiosPrivate()
    const {setUser, setAccessToken, setCSRFToken} = useContext(AuthContext)
    const accountDeleteErrRef = useRef(null);
    const [accountDeleteErrMessages, setAccountDeleteErrMessages] = useState([]);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)


    const {
        value: password, 
        isValid: passwordIsValid,
        hasError:passwordHasError, 
        valueChange: onPasswordChange, 
        valueBlur: onPasswordBlur,
        reset:resetPassword,
        messages:passwordMessages,
    } = useInput({validations, initialState:'hidraC137', rules:{required:true,minLength:6}})
  
  
  
      let deleteAccountFormIsValid = (passwordIsValid)
  
    async function deleteAccount(e){
        e.preventDefault()

        if(!deleteAccountFormIsValid){
          return
        } 
  
        setLoading(true)
  
        try {
          await axiosPrivate.post("/auth/delete", JSON.stringify({password}));
          setAccessToken("")
          setCSRFToken("")
          setUser({})
          resetPassword()
          navigate("/", {replace: true})
        } catch (err) {
        setAccountDeleteErrMessages(sumServerErrors(err.response.data));
          accountDeleteErrRef.current?.focus();
          setLoading(false)
        }
    }

    return <>
        <h1 className="h2 text-light">Personal Info</h1>
        <div className="row pt-2">
            <div className="col-lg-9 col-md-12 col-sm-8 mb-2 mb-m-4">
                <div className="border border-light rounded-3 p-3 mb-4" id="personal-info">                  
                    <div className="border-bottom border-light pb-3 mb-3">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="pe-2 opacity-70">
                                <label className="form-label fw-bold text-light">Full name</label>
                                <div className="text-light" id="name-value">{user?.username}</div>
                            </div>
                        </div>
                    </div>

                    <div className="border-bottom border-light pb-3 mb-3">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="pe-2 opacity-70">
                                <label className="form-label fw-bold text-light">Email</label>
                                <div className="text-light" id="email-value">{user?.email}</div>
                            </div>
                        </div>
                    </div>
                    <div className="border-bottom border-light pb-3 mb-3">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="pe-2 opacity-70">
                            <label className="form-label fw-bold text-light">Phone number</label>
                            <div className="text-light" id="phone-value">{user?.account_profile?.phone}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-9">
            <div className="d-flex align-items-center justify-content-between pb-1">
                <a className="btn btn-link btn-danger" href="#account-delete-modal" data-bs-toggle="modal"><i className="fi-trash me-2"></i> Delete account</a>
            </div>
            </div>
        </div>

        <div className="modal fade" id="account-delete-modal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered p-2 my-0 mx-auto" style={{'maxWidth':'950px'}}>
          <div className="modal-content bg-dark border-light">
            <div className="modal-body px-0 py-2 py-sm-0">
              <button className="btn-close btn-close-white position-absolute top-0 end-0 mt-3 me-3" type="button" data-bs-dismiss="modal"></button>
              <div className="row mx-0 align-items-center">
                <div className="col-12 px-4 pt-2 pb-4 px-sm-5 pb-sm-5 pt-md-5">
                  <div ref={accountDeleteErrRef}>
                    {accountDeleteErrMessages.map((msg, index) => (<p key={index} className={`${msg ? "errmsg" : "offscreen"} text-danger`} aria-live="assertive">{msg}</p>))}
                  </div>
                  <form onSubmit={deleteAccount} className="needs-validation" noValidate>
                      <div className="mb-4">
                        <label className="form-label text-light" htmlFor="account-delete-password">Confirm your password</label>
                        <div className="password-toggle">
                          <input onChange={onPasswordChange} value={password} onBlur={onPasswordBlur}
                            className={`form-control form-control-light mb-2 ${passwordHasError?'is-invalid':'is-valid'}`} type="password" id="account-delete-password" minLength="8"/>
                          {passwordHasError &&  passwordMessages.map((message, index)=>(<small key={index} className="invalid-tooltip">{message.text}</small>))}
                        </div>
                      </div>
                      <button disabled={loading||!deleteAccountFormIsValid} className="btn btn-danger btn-lg w-100" type="submit">Delete account</button>
                    </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
}

export default Profile