import { motion } from "framer-motion";
import { certifications } from "../data/data";
import { FaArrowUpRight } from "react-icons/fa6";


const Certifications = () => {


return (


<section

id="certifications"

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

05 / CERTIFICATIONS

</p>




<h2 className="
section-title
max-w-4xl
">

Continuous learning
and professional growth.

</h2>



</motion.div>







{/* LIST */}



<div className="
max-w-5xl
">


{


certifications.map((cert,index)=>(


<motion.a


key={cert.name}


href={cert.link}


target="_blank"


rel="noreferrer"



initial={{
opacity:0,
y:30
}}


whileInView={{
opacity:1,
y:0
}}


transition={{
duration:.5,
delay:index*.1
}}


viewport={{
once:true
}}


className="
group
grid
md:grid-cols-12
gap-6
items-center
border-t
border-border
py-10
hover:border-accent
transition
"



>


{/* NUMBER */}



<div className="
md:col-span-2
">


<span className="
font-mono
text-accent
text-sm
">


0{index+1}


</span>


</div>






{/* CONTENT */}



<div className="
md:col-span-8
">


<h3 className="
text-3xl
font-display
font-semibold
group-hover:text-accent
transition
">


{cert.name}


</h3>



<p className="
text-dimText
mt-2
text-lg
">


Issued by {cert.issuer}


</p>



</div>








{/* LINK */}



<div className="
md:col-span-2
flex
md:justify-end
">


<div className="
w-10
h-10
rounded-full
border
border-border
flex
items-center
justify-center
group-hover:bg-accent
group-hover:text-primary
transition
">


<FaArrowUpRight className="text-sm"/>


</div>


</div>





</motion.a>


))


}



</div>




</div>


</section>


);


};


export default Certifications;