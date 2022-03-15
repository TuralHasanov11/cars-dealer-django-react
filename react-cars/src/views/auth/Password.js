import { useState } from "react";

function Password(){


    const [currentPwd, setCurrentPwd] = useState()
    const [newPwd, setNewPwd] = useState()
    const [confirmPwd, setConfirmPwd] = useState()

    function onCurrentPwdChange(e){
        setCurrentPwd(e.target.value)
    }

    function onNewPwdChange(e){
        setNewPwd(e.target.value)
    }

    function onConfirmPwdChange(e){
        setConfirmPwd(e.target.value)
    }


    function submitForm(e){
        e.target.preventDefault()

        // submit
    }


    return <>
        <h1 className="h2 text-light">Password &amp; Security</h1>
        <p className="text-light pt-1">Manage your password settings and secure your account.</p>
        <h2 className="h5 text-light">Password</h2>
        <form onSubmit={submitForm} className="needs-validation pb-4" noValidate>
            <div className="row align-items-end mb-2">
                <div className="col-sm-6 mb-2">
                    <label className="form-label text-light" htmlFor="account-password">Current password</label>
                    <div className="password-toggle">
                    <input className="form-control form-control-light" type="password" id="account-password" required/>
                    <label className="password-toggle-btn" aria-label="Show/hide password">
                        <input value={currentPwd} onChange={onCurrentPwdChange} className="password-toggle-check" type="checkbox"/><span className="password-toggle-indicator"></span>
                    </label>
                    </div>
                </div>
                {/* <div className="col-sm-6 mb-2"><a className="d-inline-block text-light mb-2" href="#">Forgot password?</a></div> */}
            </div>
            <div className="row mb-2">
                <div className="col-sm-6 mb-3">
                    <label className="form-label text-light" htmlFor="account-password-new">New password</label>
                    <div className="password-toggle">
                    <input className="form-control form-control-light" type="password" id="account-password-new" required/>
                    <label className="password-toggle-btn" aria-label="Show/hide password">
                        <input value={newPwd} onChange={onNewPwdChange} className="password-toggle-check" type="checkbox"/><span className="password-toggle-indicator"></span>
                    </label>
                    </div>
                </div>
                <div className="col-sm-6 mb-3">
                    <label className="form-label text-light" htmlFor="account-password-confirm">Confirm password</label>
                    <div className="password-toggle">
                    <input className="form-control form-control-light" type="password" id="account-password-confirm" required/>
                    <label className="password-toggle-btn" aria-label="Show/hide password">
                        <input value={confirmPwd} onChange={onConfirmPwdChange} className="password-toggle-check" type="checkbox"/><span className="password-toggle-indicator"></span>
                    </label>
                    </div>
                </div>
            </div>
            <button className="btn btn-outline-primary" type="submit">Update password</button>
        </form>        
    </>
}

export default Password;
