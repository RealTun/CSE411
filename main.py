import os
import eel
import json
import joblib
import pandas as pd
import cohere
import numpy as np

# Khởi tạo ứng dụng Eel, trỏ tới thư mục web
eel.init('web')

# File lưu trữ thông tin người dùng
USER_FILE = os.path.join('data', 'thongtincanhan_with_groups.json')
user_login = os.path.join('web', 'json', 'users.json')

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
    if not os.path.exists(path):
        with open(path, 'w', encoding='utf-8') as f:
            json.dump([], f, ensure_ascii=False)
        return []
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(users, f, ensure_ascii=False)

def read_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)
    
@eel.expose
def login(data):
    users = read_file(path=user_login)
    users.append(data)
    write_users(users, user_login)

@eel.expose
def logout():
    write_users([], user_login)

# Đọc dữ liệu đã phân cụm (giả sử bạn có một file CSV với các cụm đã phân loại)
data = pd.read_csv(os.path.join('web', 'bot', 'data_with_adjusted_clusters.csv'))

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

@eel.expose
def predict(input_data):
    if not input_data or 'question' not in input_data:
        return {"error": "Câu hỏi không hợp lệ"}
    
    user_question = input_data['question']

    if isinstance(user_question, list):
        user_question = user_question[0]

    if not isinstance(user_question, str):
        return {"error": "Câu hỏi phải là một chuỗi văn bản"}

    features = np.array([0, 0, 0])
    cluster_info = "Không xác định"

    if "Công nghệ" in user_question or "Kỹ năng mềm vững" in user_question:
        features = np.array([1, 0, 0])
        cluster_info = clusters[0]
    elif "Nội dung" in user_question or "nghiên cứu" in user_question or "phân tích" in user_question or "khả năng công nghệ trung bình" in user_question:
        features = np.array([0, 1, 0])
        cluster_info = clusters[1]
    elif "Kỹ thuật" in user_question or "khả năng công nghệ khá" in user_question or "phát triển hệ thống" in user_question:
        features = np.array([0, 0, 1])
        cluster_info = clusters[2]
    elif "Khả năng sử dụng công nghệ hạn chế" in user_question or "khả năng công nghệ kém" in user_question or "kỹ năng mềm chưa phát triển" in user_question:
        features = np.array([0, 0, 1])
        cluster_info = clusters[2]
    
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
            cohere_error = str(e)
            print(cohere_error)
            return {"error": f"Đã xảy ra lỗi: {str(e)}"}
    else:
        return {'answer': f"Bạn nên vào {cluster_info}."}

@eel.expose
def get_chart_data():
    chart_data = data.to_dict(orient='records')
    return chart_data

# Chạy ứng dụng
eel.start('html/login.html', size=(1280, 800))