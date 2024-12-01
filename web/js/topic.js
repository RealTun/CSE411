const backbtn = document.querySelectorAll(".back");
function back(){
    loading();
    setTimeout(()=>{
        window.location.href="index.html";
    },2000);
}
backbtn[0].addEventListener("click",back)