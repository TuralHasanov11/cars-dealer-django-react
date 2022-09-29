export const validations = {
    required:value=> {return value!==''},
    nullable:value=> true,
    email:value => {return value && value.includes('@')},
    sameAs:(value, value2)=>{return value === value2},
    minLength:(value, value2)=>{return value && (value.length >= value2)},
    isArray:value=>Array.isArray(value),
    isInteger:value=>!Number.isNaN(value),
    min:(value, value2)=>!Number.isNaN(value)&&Number.parseInt(value)>=value2,
    max:(value, value2)=>!Number.isNaN(value)&&Number.parseInt(value)<=value2,
    between:(value, [value1, value2])=>!Number.isNaN(value)&&Number.parseInt(value)>=value1&&Number.parseInt(value)<=value2,
    boolean:value=>value===true||value===false,
}

export const messages = {
    required:()=>('Field is required'),
    email:()=>('Invalid email'),
    minLength:value=>`Min length should be ${value}`,
    sameAs:value=>`Field should be same as ${value}`,
    isArray:()=>`Field should be array`,
    isInteger:()=>`Field should be integer`,
    min:value=>`Value should be greater than or equal to ${value}`,
    max:value=>`Value should be lower than or equal to ${value}`,
    between:(value1, value2)=>`Value should be between ${value1} and ${value2}`,
    boolean:()=>`Value should be boolean`,
}