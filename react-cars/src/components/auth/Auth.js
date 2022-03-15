import { useContext, useEffect, useRef, useState } from 'react'
import {Routes, Navigate, Route, Outlet, Link, useParams, useNavigate, useLocation} from 'react-router-dom'
import AuthContext from '../../store/auth-context'

function Auth(){

    const navigate = useNavigate()
    const location = useLocation()
    const authCtx = useContext(AuthContext)
    const {signIn} = useParams()
    const [loading, setLoading] = useState(false)
    const signInModal = useRef()

    const [email, setEmail] = useState('admin@test.com')
    const [username, setUsername] = useState()
    const [password, setPassword] = useState('hidraC137')
    const [confirmPassword, setConfirmPassword] = useState()
    const [agree, setAgree] = useState(false)

    const {
      value: username, 
      isValid: usernameIsValid,
      hasError:usernameHasError, 
      valueChange: usernameChange, 
      valueBlur: usernameBlur,
      reset:resetUsername
    } = useInput(value => value.trim() !== '')
  
    const {
      value: email, 
      isValid: emailIsValid,
      hasError:emailHasError, 
      valueChange: emailChange, 
      valueBlur: emailBlur,
      reset:resetEmail
    } = useInput(value => value.includes('@'))

    const {
      value: password, 
      isValid: passwordIsValid,
      hasError:passwordHasError, 
      valueChange: passwordChange, 
      valueBlur: passwordBlur,
      reset:resetPassword
    } = useInput(value => value.trim() !== '')

    const {
      value: confirmPassword, 
      isValid: confirmPasswordIsValid,
      hasError:confirmPasswordHasError, 
      valueChange: confirmPasswordChange, 
      valueBlur: confirmPasswordBlur,
      reset:resetConfirmPassword
    } = useInput(value => value.trim() !== '')

    let loginFormIsValid = (emailIsValid && passwordIsValid)
    let registerFormIsValid = (usernameIsValid && emailIsValid && passwordIsValid && confirmPasswordIsValid)


    function onEmailChange(e){
      setEmail(e.target.value)
    }

    function onUsernameChange(e){
      setUsername(e.target.value)
    }

    function onPasswordChange(e){
      setPassword(e.target.value)
    }

    function onConfirmPasswordChange(e){
      setConfirmPassword(e.target.value)
    }

    function onAgreeChange(e){
      setAgree(e.target.value)
    }

    async function login(e){
      e.preventDefault()
      setLoading(true)

      if(!loginFormIsValid){
        return
      } 
  
      // submit form
      console.log({email, password})
  
      // resetEmail()
      // resetPassword()

      // await authCtx.login({email, password})
      //   .then((res)=>{
      //     setLoading(false)
      //     const origin = location.state?.from?.pathname || '/user/profile';
      //     document.location.replace(origin)
      //   })
      //   .catch((e)=>{
      //     console.log(e)
      //   })
    }

    async function register(e){
      e.preventDefault()
      setLoading(true)

      if(!registerFormIsValid){
        return
      } 

      console.log({username, email, password, password2:confirmPassword})
    
      // resetUsername()
      // resetEmail()
      // resetPassword()
      // resetConfirmPassword()

      // await authCtx.register({username, email, password, password2:confirmPassword})
      //   .then((res)=>{
      //     console.log(res)
      //   })
      //   .catch((e)=>{
      //     console.log(e)
      //   })
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
                      <input onChange={onEmailChange} value={email} className="form-control form-control-light" type="email" id="signin-email" placeholder="Enter your email"/>
                      {!usernameHasError ?? <small className="invalid-feedback">Invalid</small>}
                    </div>
                    <div className="mb-4">
                      {/* <div className="d-flex align-items-center justify-content-between mb-2">
                        <label className="form-label text-light mb-0" htmlFor="signin-password">Password</label><a className="fs-sm text-light" href="#">Forgot password?</a>
                      </div> */}
                      <div className="password-toggle">
                        <input onChange={onPasswordChange} value={password} className="form-control form-control-light" type="password" id="signin-password" placeholder="Enter password"/>
                        <label className="password-toggle-btn" aria-label="Show/hide password">
                          <input className="password-toggle-check" type="checkbox"/><span className="password-toggle-indicator"></span>
                        </label>
                      </div>
                    </div>
                    <button disabled={loading} className="btn btn-primary btn-lg w-100" type="submit">Sign in </button>
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
                  </ul><img className="d-block mx-auto" src="/assets/img/signin-modal/signup-dark.svg" width="344" alt="Illustartion"/>
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
                      <label className="form-label text-light" htmlFor="signup-name">Full name</label>
                      <input onChange={onUsernameChange} value={username} className="form-control form-control-light" type="text" id="signup-name" placeholder="Enter your full name" required/>
                    </div>
                    <div className="mb-4">
                      <label className="form-label text-light" htmlFor="signup-email">Email address</label>
                      <input onChange={onEmailChange} value={email} className="form-control form-control-light" type="email" id="signup-email" placeholder="Enter your email" required/>
                    </div>
                    <div className="mb-4">
                      <label className="form-label text-light" htmlFor="signup-password">Password <span className='fs-sm opacity-50'>min. 8 char</span></label>
                      <div className="password-toggle">
                        <input onChange={onPasswordChange} value={password} className="form-control form-control-light" type="password" id="signup-password" minLength="8" required/>
                        <label className="password-toggle-btn" aria-label="Show/hide password">
                          <input className="password-toggle-check" type="checkbox"/><span className="password-toggle-indicator"></span>
                        </label>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="form-label text-light" htmlFor="signup-password-confirm">Confirm password</label>
                      <div className="password-toggle">
                        <input onChange={onConfirmPasswordChange} value={confirmPassword} className="form-control form-control-light" type="password" id="signup-password-confirm" minLength="8" required/>
                        <label className="password-toggle-btn" aria-label="Show/hide password">
                          <input className="password-toggle-check" type="checkbox"/><span className="password-toggle-indicator"></span>
                        </label>
                      </div>
                    </div>
                    <div className="form-check form-check-light mb-4">
                      <input onChange={onAgreeChange} value={agree} className="form-check-input" type="checkbox" id="agree-to-terms" required/> 
                      <label className="form-check-label" htmlFor="agree-to-terms"><span className='opacity-70'>By joining, I agree to the</span> 
                      <a href='#' className='text-light'>Terms of use</a> 
                      <span className='opacity-70'>and</span> 
                      <a href='#' className='text-light'>Privacy policy</a></label>
                    </div>
                    <button disabled={loading} className="btn btn-primary btn-lg w-100" type="submit">Sign up</button>
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