# Configuration schema definition

# Allowed ports range as mentioned here: 
# https://arubanetworking.hpe.com/techdocs/AOS-S/16.10/ATMG/KB/content/kb/tcp-por-num-ran.htm

CONFIG_SCHEMA = {
    "type": "object",
    "required": ["server", "logging"],
    "additionalProperties": False,
    "properties": {
        "server": {
            "type": "object",
            "required": ["host", "port", "use_ssl"],
            "additionalProperties": False,
            "properties": {
                "host": {
                    "type": "string",
                    "minLength": 1
                },
                "port": {
                    "type": "integer",
                    "minimum": 1,
                    "maximum": 65535
                },
                "use_ssl": {
                    "type": "boolean"
                }
            }
        },
        "logging": {
            "type": "object",
            "required": ["level", "file"],
            "additionalProperties": False,
            "properties": {
                "level": {
                    "type": "string",
                    "enum": ["debug", "info", "error"]
                },
                "file": {
                    "type": "string",
                    "minLength": 1
                }
            }
        }
    }
}

# Default configuration
DEFAULT_CONFIG = {
    "server": {
        "host": "127.0.0.1",
        "port": 3000,
        "use_ssl": True
    },
    "logging": {
        "level": "debug",
        "file": "./debug.log"
    }
}
