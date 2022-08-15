import { useContext, useRef } from "react"
import AuthContext from "../../store/auth-context"

function Profile(){

    const authCtx = useContext(AuthContext)

    return <>
        <h1 className="h2 text-light">Personal Info</h1>
        <div className="row pt-2">
            <div className="col-lg-9 col-md-12 col-sm-8 mb-2 mb-m-4">
                <div className="border border-light rounded-3 p-3 mb-4" id="personal-info">                  
                    <div className="border-bottom border-light pb-3 mb-3">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="pe-2 opacity-70">
                            <label className="form-label fw-bold text-light">Full name</label>
                            <div className="text-light" id="name-value">{authCtx.user?.username}</div>
                            </div>
                            <div className="me-n3" data-bs-toggle="tooltip" title="Edit"><a className="nav-link nav-link-light py-0" href="#name-collapse" data-bs-toggle="collapse"><i className="fi-edit"></i></a></div>
                        </div>
                    </div>

                    <div className="border-bottom border-light pb-3 mb-3">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="pe-2 opacity-70">
                                <label className="form-label fw-bold text-light">Email</label>
                                <div className="text-light" id="email-value">{authCtx.user?.email}</div>
                            </div>
                        </div>
                    </div>
                    <div className="border-bottom border-light pb-3 mb-3">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="pe-2 opacity-70">
                            <label className="form-label fw-bold text-light">Phone number</label>
                            <div className="text-light" id="phone-value">{authCtx.user?.profile_user?.phone}</div>
                            </div>
                            {/* <div className="me-n3" data-bs-toggle="tooltip" title="Edit"><a className="nav-link nav-link-light py-0" href="#phone-collapse" data-bs-toggle="collapse"><i className="fi-edit"></i></a></div> */}
                        </div>
                        {/* <div className="collapse" id="phone-collapse" data-bs-parent="#personal-info">
                            <input className="form-control form-control-light mt-3" type="text" data-bs-binded-element="#phone-value" data-bs-unset-value="Not specified" value={phone}/>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-9">
            <div className="d-flex align-items-center justify-content-between pb-1">
                <button className="btn btn-primary" type="button">Save changes</button>
                <button className="btn btn-link btn-light btn-sm px-0" type="button"><i className="fi-trash me-2"></i>Delete account</button>
            </div>
            </div>
        </div>
    </>
}

export default Profile