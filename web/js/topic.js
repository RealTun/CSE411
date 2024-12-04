const backbtn = document.querySelectorAll(".back");
function back() {
    loading();
    setTimeout(() => {
        window.location.href = "index.html";
    }, 2000);
}
backbtn[0].addEventListener("click", back)
const username = sessionStorage.getItem("username");
const btnTopic = document.querySelector("#btnTopics");
btnTopic.addEventListener("click", async (event) => {
    try {
        event.preventDefault();
        loading();
        const form = document.getElementById('form-topic');
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        })
        data["username"] = username;
        console.log(data);
        const response = await fetch("http://localhost:3001/api/group/selectTopic", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const text =await response.json();
        toast.style.display = "flex";
        toast.style.opacity = "1";
        toast.animation = "none";
        setTimeout(() => {
            toast.style.animation = "flyDown 1s ease-in-out forwards";
            toast.style.transition = "opacity 2s ease-in-out";
            setTimeout(() => {
                chatbox[0].innerHTML = text.message;
                chatbox[0].style.color = "#00d29e";
            })
            setTimeout(() => {
                toast.style.opacity = "0";
                setTimeout(() => {
                    toast.style.display = "none";
                }, 1000);
            }, 3000);
        }, 500);
        setTimeout(() => {
            stopLoading();
        }, 4500);
    }
    catch(error){
        toast.style.display = "flex";
        toast.style.opacity = "1";
        toast.style.animation = 'none';
        setTimeout(() => {
            toast.style.animation = "flyDown 1s ease-in-out forwards";
            toast.style.transition = "opacity 1s ease-in-out";
            setTimeout(() => {
                chatbox[0].innerHTML = "Cập nhật dữ liệu không thành công!";
                chatbox[0].style.color = "red";
            })
            setTimeout(() => {
                toast.style.opacity = "0";
                setTimeout(() => {
                    toast.style.display = "flex";
                }, 1000);
            }, 3000);
        }, 500);
        setTimeout(() => {
            stopLoading();
        }, 3500)
    }
})