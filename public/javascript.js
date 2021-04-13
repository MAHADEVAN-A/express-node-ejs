const links = document.querySelectorAll('nav ul li')
const ultag = document.querySelector('nav ul')
const check = document.getElementById('check')
links.forEach((item)=>{
    item.addEventListener('click',()=>{
        ultag.style.left='-100%';
        // ultag.style.left='0';
    })
})

function handleChange(e){
    if(ultag.style.left=='-100%'){
        ultag.style.left='0';
    }
    else{
        ultag.style.left='-100%';
    }
}
console.log(links);
console.log(check);
console.log(ultag);