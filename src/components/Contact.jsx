import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope
} from "react-icons/fa";

import { motion } from "framer-motion";



const Contact = () => {


const formRef = useRef(null);

const [statusMessage,setStatusMessage]=useState("");




const handleSubmit=(event)=>{


event.preventDefault();


if(!formRef.current) return;



emailjs.sendForm(
"service_id",
"template_id",
formRef.current,
"public_key"

)

.then(()=>{

setStatusMessage(
"Message sent successfully."
);

event.target.reset();


})


.catch(()=>{

setStatusMessage(
"Something went wrong. Try again."
);


});


};





const socials=[


{
name:"Email",
icon:FaEnvelope,
link:"mailto:rashmikagamage077@gmail.com"
},


{
name:"GitHub",
icon:FaGithub,
link:"https://github.com/RashmikaGamage2002"
},


{
name:"LinkedIn",
icon:FaLinkedin,
link:"https://www.linkedin.com/in/rashmika-gamage-b6979b29a"
}


];





return (


<section

id="contact"

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


className="mb-20"


>


<p className="
font-mono
text-accent
mb-6
">

07 / CONTACT

</p>




<h2 className="
section-title
max-w-5xl
">

Let's build something
meaningful together.

</h2>



<p className="
text-dimText
text-xl
mt-8
max-w-2xl
leading-relaxed
">

Whether it's a software project,
internship opportunity or collaboration,
I'd love to hear from you.

</p>


</motion.div>








<div

className="
grid
lg:grid-cols-12
gap-16
"



>


{/* SOCIAL LINKS */}


<div

className="
lg:col-span-4
space-y-5
"


>



{

socials.map((item,index)=>{


const Icon=item.icon;


return (

<motion.a


key={item.name}

href={item.link}

target="_blank"

whileHover={{
x:8
}}


className="
flex
items-center
gap-5
group
"


>


<div

className="
w-12
h-12
border
border-border
rounded-full
flex
items-center
justify-center
group-hover:border-accent
group-hover:text-accent
transition
"

>

<Icon/>

</div>




<span className="
text-lg
text-dimText
group-hover:text-lightText
transition
">

{item.name}

</span>



</motion.a>


)


})


}



</div>








{/* FORM */}



<motion.form


ref={formRef}


onSubmit={handleSubmit}


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



className="
lg:col-span-8
space-y-5
"


>



<div className="
grid
md:grid-cols-2
gap-5
">


<input

type="text"

name="from_name"

placeholder="Your name"

required

className="
contact-input
"

/>



<input

type="email"

name="reply_to"

placeholder="Email address"

required

className="
contact-input
"

/>



</div>





<input

type="text"

name="subject"

placeholder="Subject"

required

className="
contact-input
"

/>






<textarea


name="message"

rows="6"

placeholder="Tell me about your idea..."

required


className="
contact-input
resize-none
"


/>





<button

type="submit"

className="
bg-lightText
text-primary
px-8
py-4
rounded-premium
font-medium
hover:bg-accent
transition
"


>


Send Message


</button>





{

statusMessage &&

<p className="
text-dimText
mt-4
">

{statusMessage}

</p>


}



</motion.form>




</div>



</div>


</section>


);


};



export default Contact;