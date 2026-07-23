const Footer = () => {


return (

<footer

className="
py-12
border-t
border-border
bg-primary
"


>


<div className="container">


<div

className="
flex
flex-col
md:flex-row
justify-between
gap-5
text-sm
text-dimText
"


>


<p

className="
font-mono
"

>

RASHMIKA GAMAGE

</p>




<p>

Software Engineer • Frontend Developer

</p>




<p>

© {new Date().getFullYear()}

</p>



</div>


</div>



</footer>


);


};


export default Footer;