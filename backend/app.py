import os
import yaml
from flask import Flask, request, jsonify
from flask_cors import CORS
from validation import validate_config
from config_schema import DEFAULT_CONFIG

app = Flask(__name__)
CORS(app)

CONFIG_FILE = 'config.yaml'

def ensure_config_file_exists():
    """Create default config.yamlif it doesn't exist"""
    if not os.path.exists(CONFIG_FILE):
        write_config(DEFAULT_CONFIG)

def read_config():
    """Read configuration from YAML file."""
    ensure_config_file_exists()
    with open(CONFIG_FILE, 'r') as f:
        config = yaml.safe_load(f)
    return config

def write_config(config_data):
    """Write configuration to YAML file."""
    with open(CONFIG_FILE, 'w') as f:
        yaml.dump(config_data, f, default_flow_style=False, sort_keys=False)

@app.route('/api/config', methods=['GET'])
def get_config():
    """Get config from filesystem"""
    try:
        config = read_config()
        return jsonify({
            "success": True,
            "data": config
            }), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


@app.route('/api/config', methods=['PUT'])
def update_config():
    """PUT config to filesystem"""
    try:
        new_config = request.get_json()

        if not new_config:
            return jsonify({"success": False, "error": "No data provided"}), 400

        validated_config = validate_config(new_config)
        write_config(validated_config)

        return jsonify({
            "success": True,
            "message": "Configuration updated successfully"
        }), 200
    except Exception as e:
        return jsonify({"success": False, "error": f"Server error: {str(e)}"}), 500


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
