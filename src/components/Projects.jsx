import { motion } from "framer-motion";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaFigma
} from "react-icons/fa";

import { projects } from "../data/data";



const Projects = () => {



return (


<section

id="projects"

className="
py-section-xl
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

03 / SELECTED WORK

</p>



<h2 className="
section-title
max-w-4xl
">

Projects built with
engineering and creativity.

</h2>



</motion.div>








<div className="space-y-32">



{

projects.map((project,index)=>(



<motion.article


key={project.id}


initial={{
opacity:0,
y:60
}}


whileInView={{
opacity:1,
y:0
}}


transition={{
duration:.8
}}


viewport={{
once:true
}}



className="
grid
lg:grid-cols-12
gap-10
items-center
"




>



{/* IMAGE */}



<div

className={`
lg:col-span-7
${index % 2 !==0 ? "lg:order-2":""}
`}



>


<div

className="
group
relative
overflow-hidden
rounded-soft
border
border-border
"


>


<img


src={project.image}


alt={project.title}


className="
w-full
aspect-video
object-cover
transition
duration-700
group-hover:scale-105
"


/>



<div

className="
absolute
inset-0
bg-primary/40
opacity-0
group-hover:opacity-100
transition
flex
items-center
justify-center
gap-5
"


>



{

project.github &&

<a

href={project.github}

target="_blank"

className="
p-4
rounded-full
bg-lightText
text-primary
hover:bg-accent
transition
"

>

<FaGithub/>

</a>

}




{

project.live &&

<a

href={project.live}

target="_blank"

className="
p-4
rounded-full
bg-lightText
text-primary
hover:bg-accent
transition
"

>

<FaExternalLinkAlt/>

</a>

}





{

project.figma &&

<a

href={project.figma}

target="_blank"

className="
p-4
rounded-full
bg-lightText
text-primary
hover:bg-accent
transition
"

>

<FaFigma/>

</a>

}



</div>



</div>


</div>







{/* CONTENT */}



<div

className={`
lg:col-span-5
${index % 2 !==0 ? "lg:order-1":""}
`}


>



<span

className="
font-mono
text-accent
text-sm
"

>


0{index+1}

</span>





<h3

className="
text-4xl
font-display
font-semibold
mt-5
mb-6
tracking-tight
"

>


{project.title}


</h3>




<p

className="
text-dimText
leading-relaxed
text-lg
"

>


{project.description}


</p>





{/* TECHNOLOGIES */}



<div

className="
flex
flex-wrap
gap-3
mt-8
"


>


{

project.tech.map((tech)=>(


<span

key={tech}

className="
px-4
py-2
border
border-border
rounded-full
text-sm
text-dimText
"

>

{tech}

</span>


))


}


</div>





</div>




</motion.article>



))


}



</div>




</div>



</section>


);


};



export default Projects;