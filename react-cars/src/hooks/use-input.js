import { useReducer } from 'react'
import validationMessages from '../resources/en/validation'

const inputStateReducer = (state, action) => {

    switch (action.type) {
        case 'INPUT':
            return {value:action.value, touched: state.touched}
        case 'BLUR':
            return {value:state.value, touched: true}
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

export const useInput = ({validations, rules, initialState})=>{

    const [inputState, dispatch] = useReducer(inputStateReducer,initialState!=''||initialState==0?{value: initialState}:{})

    let messages = []

    const validateValue = (value, rules) => {

        if(value == undefined){
            return false
        }
        
        let isValid=true
        for (const index in rules) {
          if(validations[index](value, rules[index])){
            
            messages = messages.filter((el)=>(el.type !== index))
            isValid = true
          } else{
            messages.push({type:index,text:validationMessages[index](rules[index])})
            isValid = false
          }
        }
        
        return isValid
    }


    const valueIsValid = validateValue(inputState.value, rules)

    const hasError = (valueIsValid==false) && (inputState.touched == true)

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
        messages,
        valueChange, 
        valueBlur,
        reset
    }
}
