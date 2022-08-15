export const validations = {
    required:value=> {return value!==''},
    nullable:value=> {return !value || value.trim().length>=0},
    email:value => {return value && value.includes('@')},
    sameAs:(value, value2)=>{return value === value2},
    minLength:(value, value2)=>{return value && (value.length >= value2)},
    isArray:value=>Array.isArray(value),
    isInteger:value=>!Number.isNaN(value),
    min:(value, value2)=>!Number.isNaN(value)&&Number.parseInt(value)>=value2,
    max:(value, value2)=>!Number.isNaN(value)&&Number.parseInt(value)<=value2,
    between:(value, [value1, value2])=>!Number.isNaN(value)&&Number.parseInt(value)>=value1&&Number.parseInt(value)<=value2,
    boolean:value=>value==true||value==false,
}