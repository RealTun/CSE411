import eel
import json
import os
from backend import backend as bk

# Khởi tạo ứng dụng Eel, trỏ tới thư mục web
eel.init('web')

# File lưu trữ thông tin người dùng
USER_FILE ="data/thongtincanhan_with_groups.json"

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
# def write_users(users):
#     with open(USER_FILE, 'w') as f:
#         json.dump(users, f)

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
# @eel.expose
# def login(username, password):
#     users = read_users()
#     for user in users:
#         if user['username'] == username and user['password'] == password:
#             return {"success": True, "message": "Đăng nhập thành công!"}
#     return {"success": False, "message": "Sai tên người dùng hoặc mật khẩu!"}

# API lấy danh sách người dùng đã sắp xếp
@eel.expose
def get_sorted_users():
    users = read_users()
    sorted_users = sorted(users, key=lambda x: x['username'])
    return sorted_users

# Chạy ứng dụng
eel.start('html/index.html',size=(1280,800))
