import { createContext, useState } from "react";

const MainContext = createContext({
    fetchLoading:true,
    fetchLoadingToggle:()=>{}
})

export function MainContextProvider(props){

    const [fetchLoading, setFetchLoading] = useState(true)

    function fetchLoadingToggle(state=true){
        if(state){
            setFetchLoading(state)
        }else{
            setTimeout(() => {
                setFetchLoading(state)
            }, 500);
        }
    }

    return <MainContext.Provider value={{
        fetchLoadingToggle,
        fetchLoading,
    }}>
        {props.children}
    </MainContext.Provider>
}

export default MainContext