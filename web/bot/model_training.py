import pandas as pd
from sklearn.cluster import KMeans
import joblib
import numpy as np

# Đọc dữ liệu
data = pd.read_csv('data_processed.csv')

# Chọn các cột cần thiết
features = ['DiemTB_MIS','DiemTB_BigData', 'Sotruong']
X = data[features]

# Huấn luyện mô hình KMeans với số cụm là 4
kmeans = KMeans(n_clusters=4, random_state=42)
data['cluster'] = kmeans.fit_predict(X)

# Kiểm tra số lượng người trong mỗi cụm
cluster_counts = data['cluster'].value_counts()
print("So luong nguoi trong moi cum ban dau:\n", cluster_counts)

# Kiểm tra nếu số lượng trong các cụm không đều
# Tạo một danh sách để lưu các chỉ số phân loại
adjusted_clusters = []

# Điều chỉnh phân bổ sao cho mỗi cụm có 5 người
desired_cluster_size = 5
for cluster_id in range(4):
    cluster_data = data[data['cluster'] == cluster_id]
    cluster_size = len(cluster_data)
    
    if cluster_size > desired_cluster_size:
        # Lọc bỏ các người thừa từ cụm này
        excess = cluster_data.iloc[desired_cluster_size:]
        data.loc[excess.index, 'cluster'] = (cluster_id + 1) % 4
    elif cluster_size < desired_cluster_size:
        # Cần thêm người vào cụm này
        deficit = data[data['cluster'] != cluster_id]
        data.loc[deficit.index[:(desired_cluster_size - cluster_size)], 'cluster'] = cluster_id

# Kiểm tra lại số lượng người trong mỗi cụm
cluster_counts_adjusted = data['cluster'].value_counts()
print("So luong nguoi trong moi cum cuoi cung:\n", cluster_counts_adjusted)

# Lưu mô hình để sử dụng sau
joblib.dump(kmeans, 'kmeans_model.pkl')

# Lưu dữ liệu với nhãn cụm vào file mới
data.to_csv('data_with_adjusted_clusters.csv', index=False)

print("Mo hinh duoc huan luyen va luu thanh cong.")
