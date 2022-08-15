export default {
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