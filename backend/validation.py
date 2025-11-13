import yaml
from jsonschema import validate, ValidationError
from config_schema import CONFIG_SCHEMA

def validate_yaml_syntax(yaml_string):
    try:
        data = yaml.safe_load(yaml_string)
        return data
    except yaml.YAMLError as e:
        raise ValidationError(f"YAML syntax error: {str(e)}")


def validate_config_schema(config_data):
    try:
        validate(instance=config_data, schema=CONFIG_SCHEMA)
    except ValidationError as e:
        raise ValidationError(f"Schema validation error: {e.message}")

def validate_config(config_data):
    """
    Checks both YAML syntax and schema.
    """
    # If string, validate YAML syntax first
    if isinstance(config_data, str):
        config_data = validate_yaml_syntax(config_data)

    # Validate schema
    validate_config_schema(config_data)

    return config_data
