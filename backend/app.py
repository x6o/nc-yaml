from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/config', methods=['GET'])
def get_config():
    """
    Get config from fs
    """
    return jsonify({
        "success": True,
        "data": {}
    }), 200

@app.route('/api/config', methods=['PUT'])
def update_config():
    """
    PUT config from FS
    """
    return jsonify({
        "success": True,
        "message": "Configuration updated successfully"
    }), 200


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
