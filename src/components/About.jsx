import { motion } from "framer-motion";
import { personalInfo } from "../data/data";


const About = () => {


const details=[

{
title:"Education",
value:personalInfo.education
},

{
title:"Location",
value:personalInfo.location
},

{
title:"Focus",
value:"Frontend Engineering • UI/UX • Full Stack Development"
},

{
title:"Experience",
value:"Daraz — Project Assistant (2024 - Present)"
}


];



return (


<section

id="about"

className="
py-section-lg
bg-primary
"


>


<div className="container">


{/* HEADER */}



<motion.div


initial={{
opacity:0,
y:40
}}


whileInView={{
opacity:1,
y:0
}}


viewport={{
once:true
}}


className="mb-24"


>


<p className="
font-mono
text-accent
mb-6
">

02 / ABOUT

</p>



<h2

className="
section-title
max-w-5xl
"

>


A software engineer
focused on building
meaningful digital experiences.

</h2>


</motion.div>








{/* CONTENT */}



<div

className="
grid
lg:grid-cols-12
gap-16
items-start
"

>




{/* IMAGE */}



<motion.div


className="
lg:col-span-5
"


initial={{
opacity:0,
x:-40
}}


whileInView={{
opacity:1,
x:0
}}


viewport={{
once:true
}}



>


<div

className="
relative
"


>


<div

className="
absolute
inset-0
bg-accent/20
blur-3xl
rounded-full
"

/>



<img


src="/about-bg.png"


alt="Rashmika Gamage"


className="
relative
rounded-soft
w-full
object-cover
"




/>



</div>



</motion.div>








{/* STORY */}



<motion.div


className="
lg:col-span-7
space-y-8
"


initial={{
opacity:0,
x:40
}}


whileInView={{
opacity:1,
x:0
}}


viewport={{
once:true
}}



>


<p

className="
text-xl
leading-relaxed
text-lightText
"

>


I am Rashmika Gamage, a Software Engineering student
who enjoys combining technology, creativity and problem solving
to create meaningful software solutions.


</p>





<p

className="
text-dimText
leading-relaxed
text-lg
"

>


My journey started with curiosity about how technology
can improve everyday experiences. Through academic projects,
personal development and industry exposure, I have worked on
frontend applications, backend systems and user-focused designs.


</p>





<p

className="
text-dimText
leading-relaxed
text-lg
"

>


Currently, I focus on building modern web applications
using React, Java, Node.js and database technologies while
continuously improving my understanding of software architecture
and product design.


</p>






{/* DETAILS */}



<div

className="
mt-14
border-t
border-border
"

>


{

details.map((item,index)=>(


<div

key={index}

className="
py-6
border-b
border-border
grid
md:grid-cols-3
gap-4
"

>


<span

className="
font-mono
text-sm
text-accent
"

>

{item.title}

</span>



<p

className="
md:col-span-2
text-dimText
"

>

{item.value}

</p>



</div>


))


}



</div>




</motion.div>





</div>


</div>


</section>


);


};



export default About;