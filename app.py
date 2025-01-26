from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

# In a real application, this would be stored in a database
# This is just for demonstration
users = {
    'admin': generate_password_hash('password123')
}

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    if username not in users:
        return jsonify({'success': False, 'message': 'Invalid credentials'}), 401
    
    if check_password_hash(users[username], password):
        return jsonify({'success': True, 'message': 'Login successful'})
    
    return jsonify({'success': False, 'message': 'Invalid credentials'}), 401

if __name__ == '__main__':
    app.run(port=5000)
