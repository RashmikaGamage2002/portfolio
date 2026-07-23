import { useEffect, useState } from "react";
import { motion } from "framer-motion";


const Cursor = () => {


const [position,setPosition]=useState({
x:0,
y:0
});


const [hover,setHover]=useState(false);



useEffect(()=>{


const moveCursor=(e)=>{


setPosition({

x:e.clientX,
y:e.clientY

});


};



window.addEventListener(
"mousemove",
moveCursor
);



const elements=document.querySelectorAll(
"a,button,input,textarea"
);



const enter=()=>setHover(true);

const leave=()=>setHover(false);



elements.forEach((el)=>{

el.addEventListener(
"mouseenter",
enter
);


el.addEventListener(
"mouseleave",
leave
);


});



return()=>{


window.removeEventListener(
"mousemove",
moveCursor
);



elements.forEach((el)=>{


el.removeEventListener(
"mouseenter",
enter
);


el.removeEventListener(
"mouseleave",
leave
);



});


};



},[]);






return (


<>


{/* Soft cursor */}



<motion.div


className="
fixed
top-0
left-0
pointer-events-none
z-[999]
hidden
md:block
"


animate={{

x:position.x-8,

y:position.y-8

}}


transition={{

type:"spring",

stiffness:500,

damping:35

}}



>


<div

className={`

w-4
h-4
rounded-full

transition-all
duration-300

${

hover

?

"bg-accent scale-[2]"

:

"bg-lightText"

}

`}


/>



</motion.div>






{/* Glow follower */}




<motion.div


className="
fixed
pointer-events-none
z-[998]
hidden
md:block
"


animate={{

x:position.x-25,

y:position.y-25

}}


transition={{

type:"spring",

stiffness:100,

damping:20

}}


>


<div

className="

w-12
h-12

rounded-full

bg-accent/10

blur-xl

"

/>



</motion.div>



</>


);


};


export default Cursor;