import { Children } from "@/types";
import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";

interface AdapaterProps {
    children: Children | undefined;
}

const AdapaterContext = createContext({} as {
    config: boolean;
    setConfig: Dispatch<SetStateAction<boolean>>;
})
 
const AdapaterProvider: React.FC<AdapaterProps> = ({children}) => {
    const [config,setConfig] = useState(false);
    return ( 
        <AdapaterContext.Provider value={{config,setConfig}}>
            {children}
        </AdapaterContext.Provider>
     );
}

export const useAdapater = () => {
    return useContext(AdapaterContext);
}

export default AdapaterProvider;