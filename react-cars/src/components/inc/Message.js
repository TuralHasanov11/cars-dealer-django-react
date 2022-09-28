export default function Message({message, setMessage}){
    if(message && Object.keys(message).length>0){
        switch (message.status) {
            case 'success':
                return (<div className="alert alert-success alert-dismissible fade show" role="alert">
                        <i className="fi-check-circle me-2 me-sm-3 lead"></i>
                        <div>{message.content}</div>
                        <button type="button" onClick={setMessage({})} className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>)
            case 'error':
                return (<div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <i className="fi-x-circle me-2 me-sm-3 lead"></i>
                    <div>{message.content}</div>
                    <button type="button" onClick={setMessage({})} className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>)
            default:
                break;
        } 
    }

    return ''
}

Message.defaultProps = {
    message:{},
    setMessage:()=>{}
}