import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaDownload
} from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";


const Hero = () => {


const socials=[

{
icon:FaGithub,
link:"https://github.com/RashmikaGamage2002"
},


{
icon:FaLinkedin,
link:"https://www.linkedin.com/in/rashmika-gamage-b6979b29a"
},


{
icon:AiFillInstagram,
link:"https://www.instagram.com/rashmika_gamagee/"
}


];




return (


<section

id="home"

className="
relative
min-h-screen
flex
items-center
overflow-hidden
bg-primary
"

>


{/* Background Glow */}


<div

className="
absolute
top-0
right-0
w-[500px]
h-[500px]
bg-accent/10
blur-[160px]
rounded-full
"

/>




<div className="container relative z-10">


<div

className="
grid
lg:grid-cols-12
gap-10
items-center
"

>


{/* LEFT CONTENT */}



<motion.div


className="
lg:col-span-7
pt-20
"


initial={{
opacity:0,
y:40
}}


animate={{
opacity:1,
y:0
}}


transition={{
duration:.8
}}



>


<p className="
font-mono
text-accent
text-sm
mb-8
">

01 / SOFTWARE ENGINEER

</p>





<h1

className="
font-display
text-[clamp(4rem,10vw,8rem)]
font-bold
leading-[0.9]
tracking-[-0.06em]
"

>


Rashmika

<br/>


<span className="gradient-text">

Gamage

</span>


</h1>






<p

className="
mt-10
text-xl
md:text-2xl
text-dimText
max-w-xl
leading-relaxed
"

>


Building thoughtful digital experiences
through software engineering,
frontend development and UI/UX design.


</p>





<div

className="
flex
flex-wrap
gap-5
mt-12
"

>


<motion.a


href="/Resume.pdf"

download


whileHover={{
y:-4
}}


className="
flex
items-center
gap-3
bg-lightText
text-primary
px-7
py-4
rounded-premium
font-medium
"

>


<FaDownload/>

Download CV


</motion.a>





<motion.a


href="#projects"


whileHover={{
y:-4
}}


className="
px-7
py-4
border
border-border
rounded-premium
hover:border-accent
hover:text-accent
transition
"

>


View Work


</motion.a>



</div>






{/* SOCIALS */}



<div

className="
flex
gap-6
mt-12
"

>


{

socials.map((social,index)=>{


const Icon=social.icon;


return (

<motion.a

key={index}

href={social.link}

target="_blank"

whileHover={{
y:-5,
scale:1.1
}}

className="
text-dimText
hover:text-accent
transition
text-xl
"


>


<Icon/>


</motion.a>


)


})

}



</div>



</motion.div>








{/* RIGHT IMAGE */}



<motion.div


className="
lg:col-span-5
relative
"


initial={{
opacity:0,
scale:.9
}}


animate={{
opacity:1,
scale:1
}}


transition={{
duration:1
}}



>


<div

className="
absolute
inset-0
bg-accent/20
blur-[90px]
rounded-full
"

/>



<img


src="/hero-image.png"


alt="Rashmika Gamage"


className="
relative
w-full
max-w-md
mx-auto
object-cover
rounded-[40px]
grayscale
hover:grayscale-0
transition
duration-700
"


/>



</motion.div>



</div>





{/* Bottom Info */}


<div

className="
absolute
bottom-10
left-0
right-0
"

>


<div

className="
container
flex
justify-between
text-sm
text-dimText
font-mono
"

>


<span>

Sri Lanka

</span>


<span>

Available for opportunities

</span>


</div>


</div>




</div>


</section>


);


};



export default Hero;