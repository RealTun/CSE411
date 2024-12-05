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
async function run(username) {
    const topic = await fetch(`https://secure-koi-wholly.ngrok-free.app/api/group/getMyTopic/?username=${username}`, {
        method: 'GET',
        headers: {
            'ngrok-skip-browser-warning': 'true',
            'User-Agent': 'CustomUserAgent'  // Tùy chọn: có thể thêm User-Agent tùy chỉnh
        }
    });
    const topicData = await topic.json();
    const userDB = await fetch(`https://secure-koi-wholly.ngrok-free.app/api/group/getMyInfor/?username=${username}`, {
        method: 'GET',
        headers: {
            'ngrok-skip-browser-warning': 'true',
            'User-Agent': 'CustomUserAgent'  // Tùy chọn: có thể thêm User-Agent tùy chỉnh
        }
    });
    const userDBData = await userDB.json();
    const userInfo = new UserInforComponent(userDBData["fullname"], userDBData["Group"], topicData[0].Topic,
        userDBData["Average_MIS_Score"], userDBData["Average_BigData_Score"], userDBData["Average_Self_Study_Time"],
        userDBData["Number_of_Late_Attendances_in_Phase_1"], userDBData["Soft_Skills"],
        userDBData["Technology_Usage_Skills"], userDBData["Strengths"]).render();
}
run(userName)

