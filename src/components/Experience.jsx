import { motion } from "framer-motion";
import { experience } from "../data/data";


const Experience = () => {


return (

<section

id="experience"

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


className="mb-20"


>


<p className="
font-mono
text-accent
mb-6
">

04 / EXPERIENCE

</p>



<h2 className="
section-title
max-w-4xl
">

Professional journey
and industry experience.

</h2>


</motion.div>








<div className="
max-w-5xl
">


{

experience.map((item,index)=>(


<motion.div


key={item.company}


initial={{
opacity:0,
y:40
}}


whileInView={{
opacity:1,
y:0
}}


transition={{
duration:.7
}}


viewport={{
once:true
}}


className="
border-t
border-border
py-10
grid
md:grid-cols-12
gap-8
"



>



{/* YEAR */}


<div className="
md:col-span-3
">


<p className="
font-mono
text-accent
text-sm
">

{item.period}

</p>


</div>







{/* ROLE */}



<div className="
md:col-span-9
">


<h3 className="
text-3xl
font-display
font-semibold
mb-2
">

{item.role}

</h3>



<p className="
text-xl
text-lightText
mb-5
">

{item.company}

</p>




<p className="
text-dimText
text-lg
leading-relaxed
max-w-3xl
">

{item.description}

</p>



</div>




</motion.div>


))


}



</div>




</div>


</section>


);


};


export default Experience;