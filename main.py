import pandas as pd

# Đọc file CSV
data = pd.read_csv('data/data_standard.csv')

# Xem các cột hiện có
# print(data.columns)

# Tạo các dictionary để mapping dữ liệu -> số
mapping_so_truong = {'Nội dung': 0, 'Kỹ thuật': 1, 'Công nghệ': 2}
mapping_ky_nang_mem = {'Trung bình': 0, 'Khá': 1, 'Tốt': 2}

# Áp dụng mapping vào các cột tương ứng
data['Sở trường'] = data['Sở trường'].map(mapping_so_truong)
data['Kỹ năng mềm'] = data['Kỹ năng mềm'].map(mapping_ky_nang_mem)
data['Khả năng sử dụng công nghệ'] = data['Khả năng sử dụng công nghệ'].map(mapping_ky_nang_mem)

# Áp dụng kỹ thuật min - max lên các cột ngoài trừ cột đầu
columns_to_normalize = data.columns[1:]  

for col in columns_to_normalize:
    min_val = data[col].min()
    max_val = data[col].max()
    data[col] = (data[col] - min_val) / (max_val - min_val)

# Hiển thị dữ liệu tiền xử lý
print(data)