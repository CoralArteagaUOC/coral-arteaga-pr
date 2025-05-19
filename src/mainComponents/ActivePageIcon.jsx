import React from "react";
import { BsLayoutSidebar,BsFileEarmarkPlus,BsFolder,BsHouseDoor,BsQuestionLg} from "react-icons/bs";
import { LuAlarmClock } from "react-icons/lu";
import { useLocation } from 'react-router'



const SideBarIcon = ({icon, hasBorder = true}) => ( 
   hasBorder? (
    <div className = "relative flex items-center justify-center h-22 w-22 mx-auto border-2 rounded-xl">
        {icon}
    </div> 
    ) : (
     <div className = "relative flex items-center justify-center h-20 w-20 mx-auto">
        {icon}
    </div> 
    )
    
)


//Icons path
const pageIcons = {
   '/Notes':   BsFileEarmarkPlus,
    '/Folders': BsFolder,
    '/Timer':   LuAlarmClock,
    '/':        BsHouseDoor, 
}

const pixelSize = 64;
const defaultIcon = BsQuestionLg;

//CONDITIONAL RENDERING
//useLocation.pathname 
//Fuente:https://reactrouter.com/api/hooks/useLocation
//Fuente:https://stackoverflow.com/questions/61337929/uselocation-pathname-in-react-router-dom-is-changing-but-when-i-put-it-in-an
const ActivePageIcon = () => { 
    let location = useLocation()

   const IconComponent = pageIcons[location.pathname] || defaultIcon
    return (
        <div className="bg-white rounded-xl text-black">
            <SideBarIcon icon={< IconComponent size={pixelSize} />} hasBorder={false} />
        </div>
        
    );
    
 
};
export default ActivePageIcon;

