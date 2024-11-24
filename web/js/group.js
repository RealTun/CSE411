const groupDiv = document.querySelector('.group');
const batman = document.querySelector(".batman");
const navItems = document.querySelectorAll('.nav-item');
const groupName = document.querySelector('#gr-name');
const backBtn = document.querySelector('.back');
const loading_location = document.getElementById("loading-location");
const imgVip = document.getElementById("vip");


import { UserComponent } from '../object/user.js';

loadGroupUsers("all");

backBtn.addEventListener('click', () => {
    loading_location.style.opacity = "1";
    loading_location.style.display = "flex";
    setTimeout(function () {
        window.location.href = "index.html";
    }, 1500);
})

function showMember(users) {
    users.forEach(user => {
        let userDiv = new UserComponent(user["Họ tên"], user["Họ tên"]).render();
        groupDiv.appendChild(userDiv);
    });
}

function loadGroupUsers(groupId) {
    groupDiv.innerHTML = "";
    eel.get_users_by_group(groupId)(function (users) {
        showMember(users)
    });
}

navItems.forEach(item => {
    item.addEventListener('click', () => {
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add("active")
        const rect = item.getBoundingClientRect();
        batman.style.left = `${rect.x}px`;
        loadGroupUsers(item.id)
        if (item.id == "1") {
            imgVip.src = "../img/9679.png";
        }
        else if (item.id == "2") {
            imgVip.src = "../img/9680.png";
        }
        else if (item.id == "3") {
            imgVip.src = "../img/9681.png";
        }
        else if (item.id == "4") {
            imgVip.src = "../img/9682.png";
        }
        else {
            imgVip.src = "";
        }
        groupName.innerHTML = `${item.innerHTML}`
    })
})

setTimeout(() => {
    const allUser = document.querySelectorAll('.user');
    allUser.forEach(user => {
        user.addEventListener('click',async () => {
            // console.log(user.id)
            sessionStorage.setItem("userName",user.id);

            setTimeout(function () {
                window.location.href = "user.html";
            }, 1000);

            loading_location.style.opacity = "1";
            loading_location.style.display = "flex";
            // const cus = users[0];
            // const userInf = new UserInforComponent(cus["Họ tên"],cus["Họ tên"]).render();
        })
    })
}, 500)


batman.style.left = `${navItems[0].getBoundingClientRect().x}px`;
