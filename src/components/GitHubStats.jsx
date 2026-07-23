import { motion } from "framer-motion";
import GitHubCalendar from "react-github-calendar";
import { FaGithub } from "react-icons/fa";


const GitHubStats = () => {


const username = "RashmikaGamage2002";



return (


<section

id="githubstats"

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

06 / OPEN SOURCE

</p>



<h2 className="
section-title
max-w-4xl
">

Building, learning
and improving every day.

</h2>



</motion.div>









{/* GITHUB AREA */}



<motion.div


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
border
border-border
rounded-soft
p-8
md:p-12
overflow-hidden
"



>


<p className="
text-dimText
text-lg
mb-10
max-w-2xl
">


My GitHub activity reflects my continuous
practice in software development, experimenting
with technologies and building real-world projects.


</p>





<div className="
overflow-x-auto
pb-5
">


<GitHubCalendar

username={username}

blockSize={14}

blockMargin={5}

fontSize={14}


/>


</div>






<a


href={`https://github.com/${username}`}

target="_blank"


className="
inline-flex
items-center
gap-3
mt-10
text-lightText
hover:text-accent
transition
"


>


<FaGithub/>


View GitHub Profile


<span>

↗

</span>


</a>



</motion.div>





</div>


</section>


);


};


export default GitHubStats;