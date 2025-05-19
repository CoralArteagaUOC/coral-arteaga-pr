import React from "react";
import { BsLayoutSidebar,BsFileEarmarkPlus,BsFolder,BsHouseDoor,BsQuestionLg} from "react-icons/bs";
import { LuAlarmClock } from "react-icons/lu";
import { NavLink } from "react-router-dom";

//ICONS
// Fuente: https://react.dev/learn/passing-props-to-a-component 
// Fuente: https://tailwindcss.com/docs/border-radius#rounding-sides-separately
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
//console.log(SideBarIcon);

const pixelSize = 64;
const pixelSize2 = 48;


//Navigation bar 
//Fuente: https://reactrouter.com/api/components/NavLink
const Navbar = () => {
    return (
        <div className="fixed top-0 left-0 h-screen w-36
                flex flex-col items-center justify-evenly gap-14 border-r-3
                m-0" >
           
            <NavLink to = "">
            <SideBarIcon icon={<BsLayoutSidebar size={pixelSize2} />} hasBorder={false} />
            </NavLink>
            {/*Iconos Navegación Principal ||| Fuente: https://reactrouter.com/api/components/NavLink*/}
            <div className = " flex flex-col items-center justify-evenly gap-14 m-0" >
                <NavLink to = "/Notes"  end className={({isActive}) => isActive?"bg-white rounded-xl text-black":""}>
                <SideBarIcon icon={<BsFileEarmarkPlus size={pixelSize} />} />
                </NavLink>
                <NavLink to = "/Folders" end className={({isActive}) => isActive?"bg-white rounded-xl text-black":""}>
                <SideBarIcon icon={<BsFolder size={pixelSize} />} />
                </NavLink>
                <NavLink to = "/" end className="">
                <SideBarIcon icon={<LuAlarmClock size={pixelSize} />} />
                </NavLink>
                <NavLink to = "/" end className={({isActive}) => isActive?"bg-white rounded-xl text-black":""}>
                <SideBarIcon icon={<BsHouseDoor size={pixelSize} />} />
                </NavLink> 
            </div>
            <div className = " flex items-center justify-center h-16 w-16 border-2 rounded-full">
                <NavLink to = "">
                <SideBarIcon icon={<BsQuestionLg size={pixelSize2} />} hasBorder={false} />
                </NavLink>
            </div>
            
        </div>
    );
    
 
};
export default Navbar;

