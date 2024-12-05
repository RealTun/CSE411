import os
import sys
import eel
import json
import joblib
import pandas as pd
import cohere
import numpy as np

def get_base_path():
    """Lấy đường dẫn gốc cho ứng dụng"""
    if hasattr(sys, '_MEIPASS'):  # PyInstaller build
        return sys._MEIPASS
    return os.path.abspath(".")  # Môi trường phát triển

# Khởi tạo ứng dụng Eel, trỏ tới thư mục web
eel.init(os.path.join(get_base_path(), 'web'))

# File lưu trữ thông tin người dùng
USER_FILE = os.path.join(get_base_path(), 'data', 'thongtincanhan_with_groups.json')
user_login = os.path.join(get_base_path(), 'web', 'json', 'users.json')

def read_users():
    if not os.path.exists(USER_FILE):
        with open(USER_FILE, 'w', encoding='utf-8') as f:
            json.dump([], f)
        return []
    with open(USER_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)

@eel.expose
def get_users_by_group(group):
    users = read_users()
    if group != "all":
        filtered_users = [user for user in users if user['Nhóm'] == int(group)]
    else:
        filtered_users = users
    return filtered_users

def write_users(users, path):
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(users, f, ensure_ascii=False)

def read_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)

@eel.expose
def login(data):
    users = read_file(user_login)
    users.append(data)
    write_users(users, user_login)

@eel.expose
def logout():
    write_users([], user_login)

# Đọc dữ liệu đã phân cụm (giả sử bạn có một file CSV với các cụm đã phân loại)
data_file = os.path.join(get_base_path(), 'web', 'bot', 'data_with_adjusted_clusters.csv')
if os.path.exists(data_file):
    data = pd.read_csv(data_file)
else:
    data = pd.DataFrame()  # Nếu file không tồn tại, tạo DataFrame rỗng

# Thiết lập API Cohere
cohere_api_key = 'x9jg61gS0GFoIcpvxOSD3O4BJNMg7nm3eq3IuOWv'
co = cohere.Client(cohere_api_key)

# Mô tả các cụm (Cluster)
clusters = {
    0: "Cụm 0 (Công nghệ): ...",
    1: "Cụm 1 (Nội dung): ...",
    2: "Cụm 2 (Kỹ thuật): ...",
    3: "Cụm 3 (Khả năng sử dụng công nghệ hạn chế): ..."
}

@eel.expose
def predict(input_data):
    if not input_data or 'question' not in input_data:
        return {"error": "Câu hỏi không hợp lệ"}
    
    user_question = input_data['question']

    # Kiểm tra nếu 'question' là một danh sách, lấy phần tử đầu tiên
    if isinstance(user_question, list):
        user_question = user_question[0]  # Lấy câu hỏi đầu tiên trong danh sách

    # Kiểm tra nếu 'user_question' không phải là chuỗi
    if not isinstance(user_question, str):
        return {"error": "Câu hỏi phải là một chuỗi văn bản"}

    # Chuyển đổi câu hỏi về chữ thường để so sánh không phân biệt chữ hoa/chữ thường
    user_question_lower = user_question.lower()

    # Phân tích câu hỏi người dùng và phân loại vào các cụm nếu có
    features = np.array([0, 0, 0])  # Mặc định là không có sở thích
    cluster_info = "Không xác định"
    
    # Kiểm tra câu hỏi và phân loại nếu có từ khóa liên quan đến lĩnh vực
    if "công nghệ" in user_question_lower or "kỹ năng mềm vững" in user_question_lower:
        features = np.array([1, 0, 0])  # Cụm 0
        cluster_info = clusters[0]
    elif "nội dung" in user_question_lower or "nghiên cứu" in user_question_lower or "phân tích" in user_question_lower or "khả năng công nghệ trung bình" in user_question_lower:
        features = np.array([0, 1, 0])  # Cụm 1
        cluster_info = clusters[1]
    elif "kỹ thuật" in user_question_lower or "khả năng công nghệ khá" in user_question_lower or "phát triển hệ thống" in user_question_lower:
        features = np.array([0, 0, 1])  # Cụm 2
        cluster_info = clusters[2]
    elif "khả năng sử dụng công nghệ hạn chế" in user_question_lower or "khả năng công nghệ kém" in user_question_lower or "kỹ năng mềm chưa phát triển" in user_question_lower:
        features = np.array([0, 0, 1])  # Cụm 3
        cluster_info = clusters[2]
    
    # Logic xử lý câu hỏi...
    if cluster_info == "Không xác định":
        try:
            response = co.generate(
                model='command-r-plus-08-2024',
                prompt=user_question.strip(),
                max_tokens=1000,
                temperature=0.7,
            )
            answer = response.generations[0].text.strip()
            return {'answer': answer}
        except Exception as e:
            return {"error": f"Đã xảy ra lỗi: {str(e)}"}
    else:
        return {'answer': f"Bạn nên vào {cluster_info}."}

@eel.expose
def get_chart_data():
    chart_data = data.to_dict(orient='records')
    return chart_data

# Chạy ứng dụng
eel.start(os.path.join('html', 'login.html'), size=(1280, 800))
