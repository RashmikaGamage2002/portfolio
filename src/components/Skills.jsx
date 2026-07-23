import { motion } from "framer-motion";


const Skills = () => {


const categories=[


{

number:"01",

title:"Frontend Engineering",

description:
"Building modern, responsive and accessible interfaces with strong attention to user experience.",

skills:[
"React",
"JavaScript",
"TypeScript",
"Tailwind CSS",
"Vite"
]

},



{

number:"02",

title:"Backend Engineering",

description:
"Developing scalable backend systems and database-driven applications.",

skills:[
"Node.js",
"Java",
"Spring Boot",
"MySQL",
"MongoDB"
]

},



{

number:"03",

title:"Development Tools",

description:
"Using modern tools and workflows to design, build and deploy applications.",

skills:[
"Git",
"Docker",
"Figma",
"Postman"
]

}


];



return (


<section
id="skills"
className="py-section-lg bg-primary"
>


<div className="container">


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


<p className="font-mono text-accent mb-5">

03 / SKILLS

</p>


<h2 className="section-title">

Technologies I work with

</h2>


<p className="mt-6 text-dimText max-w-xl text-lg">

A focused toolkit for building reliable software products
from idea to deployment.

</p>


</motion.div>





<div className="space-y-20">


{

categories.map((item,index)=>(


<motion.div

key={item.number}

initial={{
opacity:0,
y:50
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
grid
md:grid-cols-12
gap-8
border-t
border-border
pt-10
"


>


<div className="md:col-span-3">


<span className="font-mono text-accent text-sm">

{item.number}

</span>


<h3 className="mt-5 text-2xl font-semibold">

{item.title}

</h3>


</div>





<div className="md:col-span-5">


<p className="text-dimText leading-relaxed">

{item.description}

</p>


</div>





<div className="md:col-span-4 flex flex-wrap gap-3">


{

item.skills.map(skill=>(


<span

key={skill}

className="
px-4
py-2
border
border-border
rounded-full
text-sm
text-dimText
hover:text-accent
hover:border-accent
transition
"

>

{skill}

</span>


))

}


</div>



</motion.div>


))

}



</div>



</div>


</section>


);


};



export default Skills;