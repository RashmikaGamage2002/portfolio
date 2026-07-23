import { motion } from "framer-motion";
import { useState, useEffect } from "react";


const Navbar = () => {


const [scrolled,setScrolled] = useState(false);



useEffect(()=>{


const handleScroll=()=>{

setScrolled(window.scrollY > 50);

};


window.addEventListener(
"scroll",
handleScroll
);


return()=>{

window.removeEventListener(
"scroll",
handleScroll
);

};


},[]);





const links=[

{
name:"About",
href:"#about"
},

{
name:"Skills",
href:"#skills"
},

{
name:"Projects",
href:"#projects"
},

{
name:"Experience",
href:"#experience"
},

{
name:"Contact",
href:"#contact"
}

];





return (


<motion.nav


initial={{
y:-100
}}


animate={{
y:0
}}


transition={{
duration:.6
}}


className={`

fixed
top-0
left-0
right-0
z-50

transition-all
duration-500


${

scrolled

?

"bg-primary/80 backdrop-blur-xl border-b border-border"

:

"bg-transparent"

}

`}



>


<div className="container">


<div

className="
h-24
flex
items-center
justify-between
"

>


{/* LOGO */}


<a

href="#home"

className="
font-display
font-bold
text-xl
tracking-tight
"

>


RASHMIKA<span className="text-accent">.</span>


</a>








{/* LINKS */}



<div

className="
hidden
md:flex
items-center
gap-8
"

>


{

links.map((link)=>(


<a

key={link.name}

href={link.href}

className="
text-sm
text-dimText
hover:text-lightText
transition
"

>


{link.name}


</a>


))


}



</div>







{/* RESUME */}



<a

href="/Resume.pdf"

download

className="
hidden
md:block
px-5
py-2.5
border
border-border
rounded-premium
text-sm
hover:border-accent
hover:text-accent
transition
"


>


Resume


</a>



</div>



</div>


</motion.nav>


);


};


export default Navbar;