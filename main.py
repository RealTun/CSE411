import eel
import json
import os
from backend import backend as bk
import joblib
import pandas as pd
import cohere
import numpy as np

# Khởi tạo ứng dụng Eel, trỏ tới thư mục web
eel.init('web')

# File lưu trữ thông tin người dùng
USER_FILE ="data/thongtincanhan_with_groups.json"
user_login = "./web/json/users.json"

def read_users():
    if not os.path.exists(USER_FILE):
        with open(USER_FILE, 'w',encoding='utf-8') as f:
            json.dump([], f)
        return []
    with open(USER_FILE, 'r',encoding='utf-8') as f:
        return json.load(f)
    
@eel.expose
def get_users_by_group(group):
    users = read_users()
    # for user in users:
    #     print(user["Nhóm"])
    if(group!="all"):
        filtered_users = [user for user in users if user['Nhóm'] == int(group)]
    else:
        filtered_users=users
    return filtered_users

@eel.expose
def run_back_end():
    bk()

@eel.expose
def get_user_by_name(name):
    users = read_users()
    filtered_users = [user for user in users if user['Họ tên'] == name]
    # print(filtered_users)
    return filtered_users

# # Hàm ghi danh sách người dùng
def write_users(users,path):
    if not os.path.exists(path):
        with open(path, 'w',encoding='utf-8') as f:
            json.dump([], f)
        return []
    with open(path, 'w') as f:
        json.dump(users, f)

# API đăng ký
# @eel.expose
# def register(username, password):
#     users = read_users()
#     if any(user['username'] == username for user in users):
#         return {"success": False, "message": "Tên người dùng đã tồn tại!"}
#     users.append({"username": username, "password": password})
#     write_users(users)
#     return {"success": True, "message": "Đăng ký thành công!"}

# API đăng nhập
def read_file(path):
    with open(path, 'r',encoding='utf-8') as f:
        return json.load(f)
    
@eel.expose
def login(data):
    users = read_file(path=user_login)
    users.append(data)
    write_users(users,user_login)
@eel.expose
def logout():
    write_users([],user_login)

# API lấy danh sách người dùng đã sắp xếp
# @eel.expose
# def get_sorted_users():
#     users = read_users()
#     sorted_users = sorted(users, key=lambda x: x['username'])
#     return sorted_users


kmeans = joblib.load('./web/BOTOPENAI1/kmeans_model.pkl')

# Đọc dữ liệu đã phân cụm (giả sử bạn có một file CSV với các cụm đã phân loại)
data = pd.read_csv('./web/BOTOPENAI1/data_with_adjusted_clusters.csv')

# Thiết lập API Cohere
cohere_api_key = 'x9jg61gS0GFoIcpvxOSD3O4BJNMg7nm3eq3IuOWv'
co = cohere.Client(cohere_api_key)

# Mô tả các cụm (Cluster)
clusters = {
    0: "Cụm 0(Công nghệ): Các cá nhân có điểm số cao, khả năng sử dụng công nghệ tốt và kỹ năng mềm vững, thích hợp với công việc liên quan đến công nghệ",
    1: "Cụm 1(Nội dung): Những người này có điểm số ổn, kỹ năng công nghệ trung bình, chuyên về các công việc nghiên cứu, phân tích và tạo nội dung.",
    2: "Cụm 2(Kỹ thuật): Nhóm này có sở trường về kỹ thuật, điểm số trung bình và khả năng sử dụng công nghệ khá, phù hợp với công việc phát triển hệ thống hoặc kỹ thuật.",
    3: "Cụm 3(Khả năng sử dụng công nghệ hạn chế): Các cá nhân có điểm số thấp hơn, kỹ năng công nghệ và kỹ năng mềm chưa phát triển mạnh, cần cải thiện thêm."
}

# @eel.expose
# def home():
#     return 'index.html'

@eel.expose
def predict(input_data):

    # Kiểm tra input
    if not input_data or 'question' not in input_data:
        return {"error": "Câu hỏi không hợp lệ"}
    
    user_question = input_data['question']

    # Kiểm tra nếu 'question' là một danh sách, lấy phần tử đầu tiên
    if isinstance(user_question, list):
        user_question = user_question[0]  # Lấy câu hỏi đầu tiên trong danh sách

    # Kiểm tra nếu 'user_question' không phải là chuỗi
    if not isinstance(user_question, str):
        return {"error": "Câu hỏi phải là một chuỗi văn bản"}

    # Phân tích câu hỏi người dùng và phân loại vào các cụm nếu có
    features = np.array([0, 0, 0])  # Mặc định là không có sở thích
    cluster_info = "Không xác định"
    # Kiểm tra câu hỏi và phân loại nếu có từ khóa liên quan đến lĩnh vực
    if "Công nghệ" in user_question or "Kỹ năng mềm vững" in user_question:
        features = np.array([1, 0, 0])  # Cụm 0
        cluster_info = clusters[0]
    elif "Nội dung" in user_question or "nghiên cứu" in user_question  or "phân tích" in user_question or "khả năng công nghệ trung bình" in user_question:
        features = np.array([0, 1, 0])  # Cụm 1
        cluster_info = clusters[1]
    elif "Kỹ thuật" in user_question or "khả năng công nghệ khá" in user_question or "phát triển hệ thống" in user_question:
        features = np.array([0, 0, 1])  # Cụm 2
        cluster_info = clusters[2]
    elif "Khả năng sử dụng công nghệ hạn chế" in user_question or "khả năng công nghệ kém" in user_question or "kỹ năng mềm chưa phát triển" in user_question:
        features = np.array([0, 0, 1])  # Cụm 3
        cluster_info = clusters[2]
    
    # Nếu không có từ khóa cụ thể, trả lời bình thường bằng Cohere
    if cluster_info == "Không xác định":
        try:
            # Gọi API Cohere để trả lời câu hỏi bình thường
            response = co.generate(
                model='command-r-plus-08-2024',  # Model có thể tùy chỉnh
                prompt=user_question.strip(),  # Đảm bảo là chuỗi và loại bỏ khoảng trắng dư thừa
                max_tokens=200,
                temperature=0.7,
            )
            answer = response.generations[0].text.strip()

            return {'answer': answer}

        except Exception as e:
            cohere_error = str(e)
            print(cohere_error)
            return {"error": f"Đã xảy ra lỗi: {str(e)}"}
    
    # Nếu có từ khóa liên quan đến lĩnh vực, trả lời theo cụm
    else:
        return {
            'answer': f"Bạn nên vào {cluster_info}."
        }


@eel.expose
def get_chart_data():
    chart_data = data.to_dict(orient='records')
    return chart_data

# Chạy ứng dụng
eel.start('html/login.html',size=(1280,800))

