import {useReducer} from 'react'

const inputStateReducer = (state, action) => {

    switch (action.type) {
        case 'INPUT':
            return {value:action.value, touched: state.touched}
        case 'BLUR':
            return {touched: state.touched}
        case 'RESET':
            return {value: '', touched:false}
        default:
            break;
    }

    return {
        value: '',
        touched:false
    }
}

const useInput = (validateValue)=>{

    const [inputState, dispatch] = useReducer(inputStateReducer,{})
    const valueIsValid = validateValue(inputState.value)
    const hasError = !valueIsValid && inputState.touched


    function valueChange(event){
        dispatch({type:'INPUT', value:event.target.value})
    }
    
    function valueBlur(event){
        dispatch({type:'BLUR'})
    }

    function reset(){
        dispatch({type:'RESET'})
    }
    

    return {
        value:inputState.value, 
        isValid: valueIsValid, 
        hasError, 
        valueChange, 
        valueBlur,
        reset
    }
}

export default useInput