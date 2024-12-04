const backBtn = document.querySelector('.back');
const loading_location = document.getElementById("loading-location");
const trainer = document.querySelector('.trainner');
import { UserInforComponent } from "../object/user.js";

backBtn.addEventListener('click', () => {
    loading_location.style.opacity = "1";
    loading_location.style.display = "flex";
    setTimeout(function () {
        window.location.href = "group.html";
    }, 1500);
})

function runAnimations() {
    trainer.style.animation = "goAhead 0.5s steps(4) infinite";
    setTimeout(() => {
        trainer.style.animation = "goRight 0.5s steps(4) infinite";
        setTimeout(() => {
            trainer.style.animation = "goLeft 0.5s steps(4) infinite";
            setTimeout(() => {
                trainer.style.animation = "goBack 0.5s steps(4) infinite";
            }, 2000);
        }, 2000);
    }, 2000);
}
runAnimations();
setInterval(() => {
    runAnimations();
}, 8000)

const userName = sessionStorage.getItem("MSV");
async function run(username){
    const userAr = await eel.get_user_by_msv(username)();
    const user = userAr[0];
    console.log(user)
    const userInfo =new UserInforComponent(user["Họ tên"], user["Nhóm"],user["topic"],user["Gợi ý"],
        user["Điểm TB MIS"], user["Điểm TB BigData"], user["Thời gian tự học TB trong ngày"],
        user["Số lần đi học muộn trong giai đoạn 1"], user["Kỹ năng mềm"],
        user["Khả năng sử dụng công nghệ"], user["Sở trường"]).render();
}
run(userName)

