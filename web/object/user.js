// userComponent.js
export class UserComponent {
    constructor(id, name, avatar) {
        this.id = id;
        this.name = name;
        this.avatar = avatar;
    }

    render() {
        const userDiv = document.createElement('div');
        userDiv.className = 'user';

        const img = document.createElement('img');
        img.src = '../img/user.png';
        userDiv.appendChild(img);

        const divFlex = document.createElement('div');
        divFlex.className = "d-flex flex-column";

        const h3 = document.createElement('h3');
        h3.textContent = this.name || 'Người dùng ẩn danh';
        const danhhieu = document.createElement("div");
        danhhieu.className = "danhhieu";
        const imgDanhHieu = document.createElement("img");

        let rd = Math.random() * 9;

        if (rd >= 0 && rd <= 5) {
            imgDanhHieu.src = "../img/9671.png";
        }
        else if (rd > 5 && rd <= 8) {
            imgDanhHieu.src = "../img/9672.png";
        }
        else {
            imgDanhHieu.src = "../img/9670.png";
        }

        danhhieu.appendChild(imgDanhHieu);

        divFlex.appendChild(h3);
        divFlex.appendChild(danhhieu);

        userDiv.appendChild(divFlex);

        userDiv.id = this.id;

        return userDiv;
    }
}

export class UserInforComponent {
    constructor(name, group, topic, suggest, mis, bigdata, time_learn, no_school_day, soft_skill, technology_skill, best_skill) {
        this.name = name;
        this.group = group;
        this.mis = mis;
        this.bigdata = bigdata;
        this.time_learn = time_learn;
        this.no_school_day = no_school_day;
        this.soft_skill = soft_skill;
        this.technology_skill = technology_skill;
        this.best_skill = best_skill;
        this.topic = topic;
        this.suggest = suggest;
    }

    render() {
        const name = document.querySelector("#name");
        const group = document.querySelector("#group");
        const topic = document.querySelector("#topic");
        const suggest = document.querySelector("#suggest");
        const mis = document.querySelector("#mis");
        const bigdata = document.querySelector("#bigdata");
        const time_learn = document.querySelector("#time-learn");
        const no_school_day = document.querySelector("#no-school-day");
        const soft_skill = document.querySelector("#soft-skill");
        const technology_skill = document.querySelector("#technology-skill");
        const best_skill = document.querySelector("#best-skill");
        name.innerHTML = `${this.name}`;
        group.innerHTML = `${this.group}`;
        topic.innerHTML = `${this.topic}`;
        suggest.innerHTML = `${this.suggest}`;
        mis.innerHTML = `${this.mis}`;
        bigdata.innerHTML = `${this.bigdata}`;
        time_learn.innerHTML = `${this.time_learn}`;
        no_school_day.innerHTML = `${this.no_school_day}`;
        soft_skill.innerHTML = `${this.soft_skill}`;
        technology_skill.innerHTML = `${this.technology_skill}`;
        best_skill.innerHTML = `${this.best_skill}`;
    }
}

export class UserMyInfor {
    constructor(name, group, topic, suggest, mis, bigdata, time_learn, no_school_day, soft_skill, technology_skill, best_skill) {
        this.name = name;
        this.group =parseInt(group);
        this.mis = mis;
        this.bigdata = bigdata;
        this.time_learn = time_learn;
        this.no_school_day = no_school_day;
        this.soft_skill = soft_skill;
        this.technology_skill = technology_skill;
        this.best_skill = best_skill;
        this.topic = topic;
        this.suggest = parseInt(suggest)+1;
    }
    render() {
        const name = document.querySelector("#name");
        const group = document.querySelector("#group");
        const topic = document.querySelector("#topic");
        const suggest = document.querySelector("#suggest");
        const mis = document.querySelector("#mis");
        const bigdata = document.querySelector("#bigdata");
        const time_learn = document.querySelector("#time-learn");
        const no_school_day = document.querySelector("#no-school-day");
        const soft_skill = document.querySelector("#soft-skill");
        const technology_skill = document.querySelector("#technology-skill");
        const best_skill = document.querySelector("#best-skill");
        name.innerHTML = `${this.name}`;
        group.innerHTML = `${this.group}`;
        topic.innerHTML = `${this.topic}`;
        suggest.innerHTML = `${this.suggest}`;
        mis.innerHTML = `${this.mis}`;
        bigdata.innerHTML = `${this.bigdata}`;
        time_learn.innerHTML = `${this.time_learn}`;
        no_school_day.innerHTML = `${this.no_school_day}`;
        soft_skill.innerHTML = `${this.soft_skill}`;
        technology_skill.innerHTML = `${this.technology_skill}`;
        best_skill.innerHTML = `${this.best_skill}`;
    }
    async build() {
        var content;
        await fetch('../template/userInfor.html')
            .then(response => response.text())
            .then(html => {
                content = html;
            });
        return content;
    }
}

// document.addEventListener('DOMContentLoaded', () => {
//     // Tạo các instance của UserComponent
//     const user1 = new UserComponent('Nguyễn Văn A', '../img/user1.png');
//     const user2 = new UserComponent('Trần Thị B', '../img/user2.png');

//     // Thêm các component vào nhóm
//     const groupDiv = document.getElementById('groupDiv');
//     groupDiv.appendChild(user1.render());
//     groupDiv.appendChild(user2.render());
// });