from flask import Flask, request, jsonify, render_template
import joblib
import pandas as pd
import cohere
import numpy as np

app = Flask(__name__)

# Tải mô hình đã huấn luyện KMeans
kmeans = joblib.load('kmeans_model.pkl')

# Đọc dữ liệu đã phân cụm (giả sử bạn có một file CSV với các cụm đã phân loại)
data = pd.read_csv('data_with_adjusted_clusters.csv')

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

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    input_data = request.get_json()

    # Kiểm tra input
    if not input_data or 'question' not in input_data:
        return jsonify({"error": "Câu hỏi không hợp lệ"}), 400
    
    user_question = input_data['question']

    # Kiểm tra nếu 'question' là một danh sách, lấy phần tử đầu tiên
    if isinstance(user_question, list):
        user_question = user_question[0]  # Lấy câu hỏi đầu tiên trong danh sách

    # Kiểm tra nếu 'user_question' không phải là chuỗi
    if not isinstance(user_question, str):
        return jsonify({"error": "Câu hỏi phải là một chuỗi văn bản"}), 400

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

            return jsonify({'answer': answer})

        except Exception as e:
            cohere_error = str(e)
            print(cohere_error)
            return jsonify({"error": f"Đã xảy ra lỗi: {str(e)}"}), 500
    
    # Nếu có từ khóa liên quan đến lĩnh vực, trả lời theo cụm
    else:
        return jsonify({
            'answer': f"Bạn nên vào {cluster_info}."
        })


@app.route('/get_chart_data', methods=['GET'])
def get_chart_data():
    chart_data = data.to_dict(orient='records')
    return jsonify(chart_data)

if __name__ == '__main__':
    app.run(debug=True)
