import re

def is_valid_email(email):
    pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return re.match(pattern, email) is not None

def validate_register_data(data):
    if not data:
        return False, "No data provided"
    
    required_fields = ['full_name', 'email', 'password']
    for field in required_fields:
        if field not in data or not data[field]:
            return False, f"Missing required field: {field}"
            
    if not is_valid_email(data['email']):
        return False, "Invalid email format"
        
    if len(data['password']) < 6:
        return False, "Password must be at least 6 characters"
        
    return True, ""
