import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import euclidean_distances
from sklearn.ensemble import RandomForestClassifier
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from tienxuly import tien_xu_ly
import random
import math

from xgboost import XGBRegressor
from sklearn.model_selection import GridSearchCV
from collections import Counter

import json

# Hàm tạo nhóm dựa trên khoảng cách
def create_groups(df,label_gioi,label_khonggioi,gioi, khong_gioi, threshold=1.5):
    loop = 0
    n = math.ceil(df.shape[0]/4)
    thres_hold = threshold
    while True:  # Vòng lặp tổng quát để chạy lại từ đầu nếu cần
        groups = []
        used_indices = set()  # Theo dõi các đối tượng đã được chọn
        remaining_gioi = gioi.copy()  # Khởi tạo lại danh sách "giỏi"
        remaining_khong_gioi = khong_gioi.copy()  # Khởi tạo lại danh sách "không giỏi"

        all_data = df.iloc[:, 5:-1].values  # Dữ liệu để tính khoảng cách
        sufficient_groups = True  # Biến theo dõi xem quá trình có thành công không

        while len(remaining_gioi) + len(remaining_khong_gioi) >= n:
            # Chọn ngẫu nhiên 1 "gioi" để bắt đầu nhóm
            start_member = remaining_gioi.sample(1, random_state=None)
            start_index = start_member.index[0]

            # Tìm khoảng cách từ người này tới tất cả những người khác
            distances = euclidean_distances([all_data[start_index]], all_data)[0]

            # Lấy top 4 người gần nhất chưa được sử dụng
            sorted_indices = np.argsort(distances)
            selected_indices = [idx for idx in sorted_indices if idx not in used_indices][:int(n)]

            # Kiểm tra điều kiện (3 gioi + 2 khong gioi)
            selected_group = df.iloc[selected_indices]

            if (
                (selected_group['Skill'] == label_gioi).sum() >= 0 and 
                (selected_group['Skill'] == label_khonggioi).sum() >= 0 and
                ((selected_group['Skill'] == label_gioi).sum() + (selected_group['Skill'] == label_khonggioi).sum()) >= n
            ):
                # Kiểm tra khoảng cách trung bình trong nhóm
                group_data = selected_group.iloc[:, 5:-1].values
                avg_distance = np.mean(euclidean_distances(group_data))

                if avg_distance < thres_hold:
                    groups.append(selected_group)
                    used_indices.update(selected_indices)

                    # Loại bỏ các thành viên đã chọn khỏi danh sách
                    remaining_gioi = remaining_gioi.drop(selected_group[selected_group['Skill'] == label_gioi].index)
                    remaining_khong_gioi = remaining_khong_gioi.drop(selected_group[selected_group['Skill'] == label_khonggioi].index)

                    thres_hold = thres_hold
                else:
                    # Không thỏa mãn khoảng cách -> chạy lại từ đầu
                    sufficient_groups = False
                    break
            else:
                # Không thể tạo nhóm -> chạy lại từ đầu
                sufficient_groups = False
                break

        loop+=1
        if loop == 100:
            thres_hold+=0.1
            loop=0

        # Nếu toàn bộ vòng lặp thành công, thoát khỏi vòng lặp lớn
        if sufficient_groups:
            return groups
        
def suggest_topic(data_test):
    # Đọc dữ liệu từ CSV
    data = pd.read_csv('data/train_processed.csv', header=0)

    # Chia tập dữ liệu
    X = data.drop("topic", axis=1)
    y = data["topic"]

    # Huấn luyện mô hình XGBoost
    model = XGBRegressor(n_estimators=100, learning_rate=0.1, max_depth=6, random_state=42)
    model.fit(X, y)

    # Dự đoán 100 lần
    y_pred_labels = []
    for _ in range(100):
        y_pred = model.predict(data_test)
        y_pred_labels.extend(np.round(y_pred))  # Thêm tất cả nhãn dự đoán vào danh sách

    # Đếm số lần xuất hiện của các nhãn
    counter = Counter(y_pred_labels)

    # Lấy 2 nhãn xuất hiện nhiều nhất
    most_common_labels = counter.most_common(1)[0][0]

    return most_common_labels

def suggest_topic2(data_test):
    # Đọc dữ liệu từ CSV
    data = pd.read_csv('../data/train_processed.csv', header=0)

    # Chia tập dữ liệu
    X = data.drop("topic", axis=1)
    y = data["topic"]

    # Huấn luyện mô hình XGBoost
    model = XGBRegressor(n_estimators=100, learning_rate=0.1, max_depth=6, random_state=42)
    model.fit(X, y)

    # Dự đoán 100 lần
    y_pred_labels = []
    for _ in range(100):
        y_pred = model.predict(data_test)
        y_pred_labels.extend(np.round(y_pred))  # Thêm tất cả nhãn dự đoán vào danh sách

    # Đếm số lần xuất hiện của các nhãn
    counter = Counter(y_pred_labels)

    # Lấy 2 nhãn xuất hiện nhiều nhất
    most_common_labels = counter.most_common(1)[0][0]

    return most_common_labels

def backend2():
    tien_xu_ly()

    # 1. Đọc dữ liệu từ CSV
    df = pd.read_csv('data/data_processed.csv', header=0)

    # 2. Lấy toàn bộ dữ liệu và tráo thứ tự dòng ngẫu nhiên
    data_shuffled = df.sample(frac=1).reset_index(drop=True)

    # 3. Lấy dữ liệu từ cột 1 trở đi (bỏ cột đầu tiên nếu cần)
    data = data_shuffled.iloc[:, 2:5].values

    # 4. Đặt trọng số cho từng thuộc tính
    weights = np.array([2, 2,0.5,0.5])  # Tùy chỉnh trọng số

    # 5. Chuẩn hóa dữ liệu và áp dụng trọng số
    scaler = StandardScaler()
    data_normalized = scaler.fit_transform(data)
    weighted_data = data_normalized * weights

    Chenh_lech=0
    while Chenh_lech < 6:
        # 6. Phân cụm để chia "gioi" và "khong gioi"
        kmeans = KMeans(n_clusters=2)
        kmeans.fit(weighted_data)

        # Gán nhãn "gioi" (1) và "khong gioi" (0)
        labels = kmeans.labels_
        df['Skill'] = labels

        if(len(df[df['Skill'] == 1])>len(df[df['Skill'] == 0])):
            Chenh_lech = len(df[df['Skill'] == 1]) - len(df[df['Skill'] == 0])
        else:
            Chenh_lech = len(df[df['Skill'] == 0]) - len(df[df['Skill'] == 1])

    # 7. Chia "gioi" và "khong gioi"
    if(len(df[df['Skill'] == 1])>len(df[df['Skill'] == 0])):
        label_gioi = 1
        label_khonggioi = 0
        gioi = df[df['Skill'] == label_gioi]
        khong_gioi = df[df['Skill'] == label_khonggioi]
    else:
        label_gioi = 0
        label_khonggioi = 1
        gioi = df[df['Skill'] == label_gioi]
        khong_gioi = df[df['Skill'] == label_khonggioi]

    # 8. Tạo nhóm
    groups = create_groups(df,label_gioi,label_khonggioi,gioi, khong_gioi, threshold=1.5)

    # 9. Tạo nhóm và gán nhãn nhóm vào từng thành viên
    group_labels = []
    group_number = 1

    for group in groups:
        group_indices = group.index
        group_labels.extend([(idx, group_number) for idx in group_indices])
        group_number += 1

    # Thêm cột 'Group' vào DataFrame gốc
    group_dict = dict(group_labels)
    df2 = pd.read_csv('data/data_standard.csv', header=0)
    df2['Nhóm'] = df.index.map(group_dict)  # Nhóm không thuộc nhóm nào sẽ có giá trị 0

    data_suggest = df.iloc[:, 6:9].values  # Trích xuất giá trị từ các cột

    label_suggest = []
    for _, row in data_suggest.iterrows():  # Duyệt qua từng hàng của DataFrame
        # Chuyển mỗi hàng thành DataFrame 1 dòng với cùng tên cột
        row_df = row.to_frame().T  # .T chuyển từ Series thành DataFrame
        label_suggest.append(suggest_topic(row_df))

    df2['Gợi ý'] = label_suggest  # Nhóm không thuộc nhóm nào sẽ có giá trị 0

    # 10. Xuất DataFrame thành file JSON
    output_file = 'data/thongtincanhan_with_groups.json'
    df2.to_json(output_file, orient='records', force_ascii=False, indent=4)

    print(f"Kết quả đã được lưu tại '{output_file}'.")

def backend():
    tien_xu_ly()
    
    # Đọc dữ liệu từ CSV
    df = pd.read_csv('data/data_processed.csv', header=0)

    # Lấy dữ liệu từ cột cuối cùng
    data = df.iloc[:, 10].values

    labels = []
    students = True
    for label in data:
        if label == 1000:
            labels.append(1)
            students = False
        elif label == 100:
            labels.append(4)
            students = False
        elif label == 10:
            labels.append(3)
            students = False
        elif label == 1:
            labels.append(2)
            students = False

    if students == True:
        data_shuffled = df.sample(frac=1).reset_index(drop=True)

        data = data_shuffled.iloc[:, 2:5].values

        weights = np.array([2, 2,2])

        scaler = StandardScaler()
        data_normalized = scaler.fit_transform(data)
        weighted_data = data_normalized * weights

        Chenh_lech=0
        while Chenh_lech < df.shape[0]/4:
            kmeans = KMeans(n_clusters=2)
            kmeans.fit(weighted_data)

            labels = kmeans.labels_
            df['Skill'] = labels

            if(len(df[df['Skill'] == 1])>len(df[df['Skill'] == 0])):
                Chenh_lech = len(df[df['Skill'] == 1]) - len(df[df['Skill'] == 0])
            else:
                Chenh_lech = len(df[df['Skill'] == 0]) - len(df[df['Skill'] == 1])

        if(len(df[df['Skill'] == 1])>len(df[df['Skill'] == 0])):
            label_gioi = 1
            label_khonggioi = 0
            gioi = df[df['Skill'] == label_gioi]
            khong_gioi = df[df['Skill'] == label_khonggioi]
        else:
            label_gioi = 0
            label_khonggioi = 1
            gioi = df[df['Skill'] == label_gioi]
            khong_gioi = df[df['Skill'] == label_khonggioi]

        groups = create_groups(df,label_gioi,label_khonggioi,gioi, khong_gioi, threshold=1.5)

        group_labels = []
        group_number = 1

        for group in groups:
            group_indices = group.index
            group_labels.extend([(idx, group_number) for idx in group_indices])
            group_number += 1

        group_dict = dict(group_labels)
        df2 = pd.read_csv('data/data_standard.csv', header=0)
        df2['Nhóm'] = df.index.map(group_dict)

        # Tìm giá trị lớn nhất trong group_dict
        max_group = max(group_dict.values()) if group_dict else 0

        # Thay thế các giá trị null bằng max_group + 1
        df2['Nhóm'] = df2['Nhóm'].fillna(max_group + 1).astype(int)
    else:
        # Đọc dữ liệu khác từ file CSV và xóa cột không cần thiết
        df2 = pd.read_csv('data/data_standard.csv', header=0)
        df2 = df2.drop(columns=['Mức độ'])
        df2['Nhóm'] = labels

    data_shuffled = df2.sample(frac=1).reset_index(drop=True)

    # Xuất dữ liệu ra file JSON
    output_file = 'data/thongtincanhan_with_groups.json'
    data_shuffled.to_json(output_file, orient='records', force_ascii=False, indent=4)

    # Đường dẫn đến file JSON
    json_file = 'server/public/history.json'

    # Đọc dữ liệu từ file JSON
    with open(json_file, 'r', encoding='utf-8') as f:
        data_history = json.load(f)

    with open(output_file, "r", encoding="utf-8") as file:
        data_jsons = json.load(file)

    def insert_to_group(value_to_insert):
        last_key = max(map(int, data_history[0].keys()))  # Lấy key lớn nhất (chuyển về số nguyên để so sánh)
        new_key = str(last_key)  # Tăng giá trị và chuyển lại thành chuỗi
        if len(data_history[0][new_key]) >= 20:
            new_key = str(last_key+1)
            data_history[0][new_key] = []
            
        data_history[0][new_key].append(value_to_insert)
    if(len(data_history[0])>=6):
        data_history = [{"1":[]}]
        with open(json_file, 'w', encoding='utf-8') as f:
            json.dump(data_history, f, ensure_ascii=False, indent=4)
    for value in data_jsons:
        insert_to_group(value)

    # Ghi lại file JSON sau khi chỉnh sửa
    with open(json_file, 'w', encoding='utf-8') as f:
        json.dump(data_history, f, ensure_ascii=False, indent=4)

def backend3():
    data = pd.read_csv('../data/data_standard.csv')

    # Tạo các dictionary để mapping dữ liệu -> số
    mapping_so_truong = {'Nội dung': 0, 'Kỹ thuật': 1, 'Công nghệ': 2}
    mapping_ky_nang_mem = {'Trung bình': 0, 'Khá': 1, 'Tốt': 2}

    # Áp dụng mapping vào các cột tương ứng
    data['Sở trường'] = data['Sở trường'].map(mapping_so_truong)
    data['Kỹ năng mềm'] = data['Kỹ năng mềm'].map(mapping_ky_nang_mem)
    data['Khả năng sử dụng công nghệ'] = data['Khả năng sử dụng công nghệ'].map(mapping_ky_nang_mem)

    data.to_csv('../data/data_processed.csv', index=False, encoding='utf-8-sig')
    
    # Đọc dữ liệu từ CSV
    df = pd.read_csv('../data/data_processed.csv', header=0)

    # Lấy dữ liệu từ cột cuối cùng
    data = df.iloc[:, 10].values

    # array = [1, 2, 3, 4]
    # random.shuffle(array)

    labels = []
    students = True
    for label in data:
        if label == 1000:
            labels.append(1)
            students = False
        elif label == 100:
            labels.append(4)
            students = False
        elif label == 10:
            labels.append(3)
            students = False
        elif label == 1:
            labels.append(2)
            students = False

    if students == True:
        data_shuffled = df.sample(frac=1).reset_index(drop=True)

        data = data_shuffled.iloc[:, 2:5].values

        weights = np.array([1, 1,2])

        scaler = StandardScaler()
        data_normalized = scaler.fit_transform(data)
        weighted_data = data_normalized * weights

        Chenh_lech=0
        while Chenh_lech < df.shape[0]/4:
            kmeans = KMeans(n_clusters=2)
            kmeans.fit(weighted_data)

            labels = kmeans.labels_
            df['Skill'] = labels

            if(len(df[df['Skill'] == 1])>len(df[df['Skill'] == 0])):
                Chenh_lech = len(df[df['Skill'] == 1]) - len(df[df['Skill'] == 0])
            else:
                Chenh_lech = len(df[df['Skill'] == 0]) - len(df[df['Skill'] == 1])

        if(len(df[df['Skill'] == 1])>len(df[df['Skill'] == 0])):
            label_gioi = 1
            label_khonggioi = 0
            gioi = df[df['Skill'] == label_gioi]
            khong_gioi = df[df['Skill'] == label_khonggioi]
        else:
            label_gioi = 0
            label_khonggioi = 1
            gioi = df[df['Skill'] == label_gioi]
            khong_gioi = df[df['Skill'] == label_khonggioi]

        groups = create_groups(df,label_gioi,label_khonggioi,gioi, khong_gioi, threshold=1.5)

        group_labels = []
        group_number = 1

        for group in groups:
            group_indices = group.index
            group_labels.extend([(idx, group_number) for idx in group_indices])
            group_number += 1

        group_dict = dict(group_labels)
        df2 = pd.read_csv('../data/data_standard.csv', header=0)
        df2['Nhóm'] = df.index.map(group_dict)

        # Tìm giá trị lớn nhất trong group_dict
        max_group = max(group_dict.values()) if group_dict else 0

        # Thay thế các giá trị null bằng max_group + 1
        df2['Nhóm'] = df2['Nhóm'].fillna(max_group + 1).astype(int)
    else:
        # Đọc dữ liệu khác từ file CSV và xóa cột không cần thiết
        df2 = pd.read_csv('../data/data_standard.csv', header=0)
        df2 = df2.drop(columns=['Mức độ'])
        df2['Nhóm'] = labels

    data_shuffled = df2.sample(frac=1).reset_index(drop=True)

    # Xuất dữ liệu ra file JSON
    output_file = '../data/thongtincanhan_with_groups.json'
    data_shuffled.to_json(output_file, orient='records', force_ascii=False, indent=4)

    # Đường dẫn đến file JSON
    json_file = '../server/public/history.json'

    # Đọc dữ liệu từ file JSON
    with open(json_file, 'r', encoding='utf-8') as f:
        data_history = json.load(f)

    with open(output_file, "r", encoding="utf-8") as file:
        data_jsons = json.load(file)

    def insert_to_group(value_to_insert):
        last_key = max(map(int, data_history[0].keys()))  # Lấy key lớn nhất (chuyển về số nguyên để so sánh)
        new_key = str(last_key)  # Tăng giá trị và chuyển lại thành chuỗi
        if len(data_history[0][new_key]) >= 20:
            new_key = str(last_key+1)
            data_history[0][new_key] = []
            
        data_history[0][new_key].append(value_to_insert)
    if(len(data_history[0])>=6):
        data_history = [{"1":[]}]
        with open(json_file, 'w', encoding='utf-8') as f:
            json.dump(data_history, f, ensure_ascii=False, indent=4)
    for value in data_jsons:
        insert_to_group(value)

    # Ghi lại file JSON sau khi chỉnh sửa
    with open(json_file, 'w', encoding='utf-8') as f:
        json.dump(data_history, f, ensure_ascii=False, indent=4)

backend3()