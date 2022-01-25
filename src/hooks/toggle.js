import { useState } from "react";

export default function useToggle(initialState = true)
{
    const[visibility, setVisibility] = useState(initialState)

    function toggle(){
        setVisibility(prev => !prev)
    }

    return [visibility, toggle]
}