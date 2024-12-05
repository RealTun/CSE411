$(document).ready(async function () {
    await eel.get_chart_data()(function (data) {
        // console.log(data);
        const ctx = document.getElementById('kmeans-chart').getContext('2d');
        const kmeansChart = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [
                    {
                        label: 'Cụm 0',
                        data: data.filter(d => d.cluster === 0).map(d => ({ x: d.DiemTB_MIS, y: d.DiemTB_BigData })),
                        backgroundColor: 'rgba(255, 99, 132, 1)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Cụm 1',
                        data: data.filter(d => d.cluster === 1).map(d => ({ x: d.DiemTB_MIS, y: d.DiemTB_BigData })),
                        backgroundColor: 'rgba(54, 162, 235, 1)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Cụm 2',
                        data: data.filter(d => d.cluster === 2).map(d => ({ x: d.DiemTB_MIS, y: d.DiemTB_BigData })),
                        backgroundColor: 'rgba(75, 192, 192, 1)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Cụm 3',
                        data: data.filter(d => d.cluster === 3).map(d => ({ x: d.DiemTB_MIS, y: d.DiemTB_BigData })),
                        backgroundColor: 'rgba(153, 102, 255, 1)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom',
                        title: {
                            display: true,
                            text: 'Điểm TB MIS'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Điểm TB BigData'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Phân nhóm Sinh viên',
                        font: {
                            size: 24
                        },
                        padding: {
                            top: 20,
                            bottom: 20
                        }
                    }
                }
            }
        });
    });

    // Sự kiện gửi tin nhắn khi nhấn phím Enter
    $('#user-input').keypress(function (event) {
        if (event.which === 13) { // Kiểm tra nếu phím Enter (key code 13) được nhấn
            event.preventDefault(); // Ngăn chặn hành vi mặc định của Enter
            sendMessage(); // Gọi hàm gửi tin nhắn
        }
    });
});

function sendMessage() {
    var userInput = $('#user-input').val();
    if (userInput) {
        $('#chat-history').append('<div class="chat-message user"><strong>Bạn:</strong> ' + userInput + '</div>');
        sendToClusterAPI(userInput);
        $('#user-input').val('');
    }
}

async function sendToClusterAPI(userInput) {
    try {
        var inputData = userInput.split(',');
        const result = { "question": inputData }
        const response = await eel.predict(result)();
        console.log('Response from cluster API:', response);

        document.getElementById('chat-history').innerHTML +=
            '<div class="chat-message bot"><strong>Bot:</strong> ' + response.answer + '</div>';
    } catch (error) {
        console.error('Error:', error);

        document.getElementById('chat-history').innerHTML +=
            '<div class="chat-message bot"><strong>Bot:</strong> Đã xảy ra lỗi trong quá trình xử lý.</div>';
    }
}
document.addEventListener("DOMContentLoaded", function () {
    const topicButtons = document.querySelectorAll('.topic-button');
    const inputField = document.getElementById('user-input');

    topicButtons.forEach(button => {
        button.addEventListener('click', function () {
            const topicText = this.textContent; // Lấy nội dung của nút
            inputField.value = topicText; // Đặt nội dung vào ô nhập liệu
            sendMessage(); // Gửi tin nhắn tự động
        });
    });
});
const backBtn = document.querySelector('.back');
const loading_location = document.getElementById("loading-location");
backBtn.addEventListener('click', () => {
    loading_location.style.opacity = "1";
    loading_location.style.display = "flex";
    setTimeout(function () {
        window.location.href = "../../../html/index.html";
    }, 1500);
})