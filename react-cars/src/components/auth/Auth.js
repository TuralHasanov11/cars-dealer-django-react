import { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation} from 'react-router-dom'
import {useInput} from '../../hooks/use-input'
import { validations } from '../../hooks/use-validation'
import AuthContext from '../../store/auth-context'


// admin3@test.com
// hidraC137

// test1@gmail.com
// hidraC137

function Auth(){

    const navigate = useNavigate()
    const location = useLocation()
    const authCtx = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const signInModal = useRef()

    const {
      value: username, 
      isValid: usernameIsValid,
      hasError:usernameHasError, 
      valueChange: onUsernameChange, 
      valueBlur: onUsernameBlur,
      reset:resetUsername,
      messages:usernameMessages,
    } = useInput({validations, initialState:'', rules:{required:true,}})
  
    const {
      value: email, 
      isValid: emailIsValid,
      hasError:emailHasError, 
      valueChange: onEmailChange, 
      valueBlur: onEmailBlur,
      reset:resetEmail,
      messages:emailMessages,
    } = useInput({validations, initialState:'', rules:{required:true, email:true}})

    const {
      value: phone, 
      isValid: phoneIsValid,
      hasError:phoneHasError, 
      valueChange: onPhoneChange, 
      valueBlur: onPhoneBlur,
      reset:resetPhone,
      messages:phoneMessages,
    } = useInput({validations, initialState:'', rules:{required:true,}})

    const {
      value: password, 
      isValid: passwordIsValid,
      hasError:passwordHasError, 
      valueChange: onPasswordChange, 
      valueBlur: onPasswordBlur,
      reset:resetPassword,
      messages:passwordMessages,
    } = useInput({validations, initialState:'', rules:{required:true,minLength:6}})

    const {
      value: confirmPassword, 
      isValid: confirmPasswordIsValid,
      hasError:confirmPasswordHasError, 
      valueChange: onConfirmPasswordChange, 
      valueBlur: onConfirmPasswordBlur,
      reset:resetConfirmPassword,
      messages:confirmPasswordMessages,
    } = useInput({validations, initialState:'', rules:{required:true,sameAs:password}})


    let loginFormIsValid = (emailIsValid && passwordIsValid)
    let registerFormIsValid = (usernameIsValid && emailIsValid && passwordIsValid && confirmPasswordIsValid && emailIsValid)


    async function login(e){
      e.preventDefault()
      setLoading(true)

      if(!loginFormIsValid){
        return
      } 

      await authCtx.login({email, password})
        .then((res)=>{

          // resetEmail()
          // resetPassword()
          setLoading(false)
          const origin = location.state?.from?.pathname || '/user/profile';
          // document.location.replace(origin)
        })
        .catch((e)=>{
          console.log(e)
        })
    }

    async function register(e){
      e.preventDefault()
      setLoading(true)

      if(!registerFormIsValid){
        return
      } 

      await authCtx.register({username, email, password, password2:confirmPassword, phone:phone})
        .then((res)=>{
          console.log(res)
        })
        .catch((e)=>{
          console.log(e)
        })

      resetUsername()
      resetEmail()
      resetPassword()
      resetConfirmPassword()

      
    }


    return (
      <>
      <div ref={signInModal} className="modal fade" id="signin-modal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered p-2 my-0 mx-auto" style={{'maxWidth':'950px'}}>
          <div className="modal-content bg-dark border-light">
            <div className="modal-body px-0 py-2 py-sm-0">
              <button className="btn-close btn-close-white position-absolute top-0 end-0 mt-3 me-3" type="button" data-bs-dismiss="modal"></button>
              <div className="row mx-0 align-items-center">
                <div className="col-md-6 border-end-md border-light p-4 p-sm-5">
                  <h2 className="h3 text-light mb-4 mb-sm-5">Hey there!<br/>Welcome back.</h2><img className="d-block mx-auto" src="/assets/img/signin-modal/signin-dark.svg" width="344" alt="Illustartion"/>
                  <div className="text-light mt-4 mt-sm-5"><span className="opacity-60">Don't have an account? </span><a className="text-light" href="#signup-modal" data-bs-toggle="modal" data-bs-dismiss="modal">Sign up here</a></div>
                </div>
                <div className="col-md-6 px-4 pt-2 pb-4 px-sm-5 pb-sm-5 pt-md-5"><a className="btn btn-outline-info w-100 mb-3" href="#"><i className="fi-google fs-lg me-1"></i>Sign in with Google</a><a className="btn btn-outline-info w-100 mb-3" href="#"><i className="fi-facebook fs-lg me-1"></i>Sign in with Facebook</a>
                  <div className="d-flex align-items-center py-3 mb-3">
                    <hr className="hr-light w-100"/>
                    <div className="text-light opacity-70 px-3">Or</div>
                    <hr className="hr-light w-100"/>
                  </div>
                  <form onSubmit={login} className="needs-validation" noValidate>
                    <div className="mb-4">
                      <label className="form-label text-light mb-2" htmlFor="signin-email">Email address</label>
                      <input onChange={onEmailChange} value={email} onBlur={onEmailBlur} 
                        className={`form-control form-control-light ${emailHasError?'is-invalid':'is-valid'}`} type="email" id="signin-email" placeholder="Enter your email"/>
                      {emailHasError ?  emailMessages.map((message, index)=>(<small key={index} className="invalid-tooltip">{message.text}</small>)):''}
                    </div>
                    <div className="mb-4">
                      {/* <div className="d-flex align-items-center justify-content-between mb-2">
                        <label className="form-label text-light mb-0" htmlFor="signin-password">Password</label><a className="fs-sm text-light" href="#">Forgot password?</a>
                      </div> */}
                      <div className="password-toggle">
                        <input onChange={onPasswordChange} value={password} onBlur={onPasswordBlur} 
                          className={`form-control form-control-light ${passwordHasError?'is-invalid':'is-valid'}`} type="password" id="signin-password" placeholder="Enter password"/>
                        {passwordHasError ?  passwordMessages.map((message, index)=>(<small key={index} className="invalid-tooltip">{message.text}</small>)):''}
                      </div>
                    </div>
                    <button disabled={loading||!loginFormIsValid} className="btn btn-primary btn-lg w-100" type="submit">Sign in </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="signup-modal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered p-2 my-0 mx-auto" style={{'maxWidth':'950px'}}>
          <div className="modal-content bg-dark border-light">
            <div className="modal-body px-0 py-2 py-sm-0">
              <button className="btn-close btn-close-white position-absolute top-0 end-0 mt-3 me-3" type="button" data-bs-dismiss="modal"></button>
              <div className="row mx-0 align-items-center">
                <div className="col-md-6 border-end-md border-light p-4 p-sm-5">
                  <h2 className="h3 text-light mb-4 mb-sm-5">Cars.<br/>Get benefits:</h2>
                  <ul className="list-unstyled mb-4 mb-sm-5">
                    <li className="d-flex mb-2"><i className="fi-check-circle text-primary mt-1 me-2"></i><span className="text-light">Add and promote your listings</span></li>
                    <li className="d-flex mb-2"><i className="fi-check-circle text-primary mt-1 me-2"></i><span className="text-light">Easily manage your wishlist</span></li>
                    <li className="d-flex mb-0"><i className="fi-check-circle text-primary mt-1 me-2"></i><span className="text-light">Leave reviews</span></li>
                  </ul><img className="d-block mx-auto" src="/assets/img/signin-modal/signup-dark.svg" width="344" alt="Illustration"/>
                  <div className="text-light mt-sm-4 pt-md-3"><span className="opacity-60">Already have an account? </span><a className="text-light" href="#signin-modal" data-bs-toggle="modal" data-bs-dismiss="modal">Sign in</a></div>
                </div>
                <div className="col-md-6 px-4 pt-2 pb-4 px-sm-5 pb-sm-5 pt-md-5">
                  <a className="btn btn-outline-info w-100 mb-3" href="#"><i className="fi-google fs-lg me-1"></i>Sign in with Google</a>
                  <a className="btn btn-outline-info w-100 mb-3" href="#"><i className="fi-facebook fs-lg me-1"></i>Sign in with Facebook</a>
                  <div className="d-flex align-items-center py-3 mb-3">
                    <hr className="hr-light w-100"/>
                    <div className="text-light opacity-70 px-3">Or</div>
                    <hr className="hr-light w-100"/>
                  </div>
                  <form onSubmit={register} className="needs-validation" noValidate>
                    <div className="mb-4">
                      <label className="form-label text-light" htmlFor="signup-name">Username</label>
                      <input onChange={onUsernameChange} value={username} onBlur={onUsernameBlur} 
                        className={`form-control form-control-light ${usernameHasError?'is-invalid':'is-valid'}`} type="text" id="signup-name" placeholder="Enter your username"/>
                        {usernameHasError ?  usernameMessages.map((message, index)=>(<small key={index} className="invalid-tooltip">{message.text}</small>)):''}
                    </div>
                    <div className="mb-4">
                      <label className="form-label text-light" htmlFor="signup-email">Email address</label>
                      <input onChange={onEmailChange} value={email} onBlur={onEmailBlur}
                        className={`form-control form-control-light ${emailHasError?'is-invalid':'is-valid'}`} type="email" id="signup-email" placeholder="Enter your email"/>
                        {emailHasError ?  emailMessages.map((message, index)=>(<small key={index} className="invalid-tooltip">{message.text}</small>)):''}
                    </div>
                    <div className="mb-4">
                      <label className="form-label text-light" htmlFor="signup-phone">Phone</label>
                      <input onChange={onPhoneChange} value={phone} onBlur={onPhoneBlur} 
                        className={`form-control form-control-light ${phoneHasError?'is-invalid':'is-valid'}`} type="text" id="signup-name" placeholder="xx-xxx-xx-xx"/>
                        {phoneHasError ?  phoneMessages.map((message, index)=>(<small key={index} className="invalid-tooltip">{message.text}</small>)):''}
                    </div>
                    <div className="mb-4">
                      <label className="form-label text-light" htmlFor="signup-password">Password <span className='fs-sm opacity-50'>min. 8 char</span></label>
                      <div className="password-toggle">
                        <input onChange={onPasswordChange} value={password} onBlur={onPasswordBlur}
                          className={`form-control form-control-light ${passwordHasError?'is-invalid':'is-valid'}`} type="password" id="signup-password" minLength="8"/>
                        {passwordHasError ?  passwordMessages.map((message, index)=>(<small key={index} className="invalid-tooltip">{message.text}</small>)):''}
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="form-label text-light" htmlFor="signup-password-confirm">Confirm password</label>
                      <div className="password-toggle">
                        <input onChange={onConfirmPasswordChange} value={confirmPassword} onBlur={onConfirmPasswordBlur}
                         className={`form-control form-control-light ${confirmPasswordHasError?'is-invalid':'is-valid'}`} type="password" id="signup-password-confirm" minLength="8"/>
                        {confirmPasswordHasError ?  confirmPasswordMessages.map((message, index)=>(<small key={index} className="invalid-tooltip">{message.text}</small>)):''}
                      </div>
                    </div>
                    <button disabled={loading||!registerFormIsValid} className="btn btn-primary btn-lg w-100" type="submit">Sign up</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
    )
}

export default Auth