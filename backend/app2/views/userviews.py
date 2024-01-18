import os
from flask import request, jsonify, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import uuid
from flask_jwt_extended import  create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from app2 import app, db
from app2.models.user_model import User



# User signup route
@app.route('/userSignUp/', methods=['POST'])
def user_sign_up():
    data = request.json

    # Extract data from the request
    username = data.get('username')
    email = data.get('email')
    phone = data.get('phone')
    password = data.get('password')
    image = data.get('image','')
    hashed_password = generate_password_hash(password,method='pbkdf2:sha256')
    # Create a new user
    new_user = User(username=username, email=email, phone=phone, image=image,password = hashed_password)

    # Add the user to the database
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'userCreationSuccessfull': True})



@app.route('/userLogin/', methods=['POST'])
def user_login():
    data = request.json
    username = data.get('username', '')
    password = data.get('password', '')

    if username and password:
        try:
            user = db.session.query(User).filter(User.username == username).first()
            if user and check_password_hash(user.password, password):
                access_token = create_access_token(identity=username)
                refresh_token = create_refresh_token(identity=username)
                return jsonify({
                    'msg': 'Login Successful',
                    'username': user.username,
                    'access': access_token,
                    'refresh': refresh_token,
                    'isSuperUser':user.isSuperUser
                })
            else:
                return jsonify({'msg': 'Invalid Credentials'})
        except Exception as e:
            print(e)
            return jsonify({'msg': 'Error occurred during login'})



@app.route('/user/',methods=['GET'])
def user():
    if request.method == 'GET':
        
        username = request.args.get('username', '')  # Retrieve the username from the URL parameters
        print('username :',username)
        if  username:
            
            user = db.session.query(User).filter(User.username == username).first()
            return jsonify({
                'username':user.username,
                'email':user.email,
                'phone':user.phone,
                'image':user.image[6:]
                            })
        else:
            users = db.session.query(User).filter(User.isSuperUser == False)
            list_of_users = [{'username':user.username,'email':user.email,'phone':user.phone} for user in users ]
            return jsonify(list_of_users)
    

@app.route('/userUpdate/', methods=['PUT'])
def update_user():
    print(request.form)
    username = request.form.get('username', None)
    image_file = request.files.get('image',None)
    
    if not username:
        return jsonify({'error': 'Username not provided in the form data'}), 400

    # Update the user's image path in the database
    user = db.session.query(User).filter(User.username == username).first()
    print(username,request.form.get('email', ''),user,'3    ')
    if user:

         if username and image_file:
        
            # Generate a unique filename using username and UUID
            filename = f"{username}_{uuid.uuid4().hex}.png"
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)

            # Save the image file to the specified folder
            image_file.save(file_path)
            user.image = f"/{app.config['UPLOAD_FOLDER']}/{filename}"
            db.session.commit()

            return jsonify({
                    'msg': 'User image updated successfully',
                    'image_url': url_for('static', filename=user.image)
                })
         
         else:
            user.username = request.form.get('username', user.username)
            user.email = request.form.get('email', user.email)
            user.phone = request.form.get('phone', user.phone)
            password = request.form.get('password',None)
            if password :
                 user.password = generate_password_hash(password,method='pbkdf2:sha256')
            
            db.session.commit()
            return jsonify({'userUpdated':True})
             
            
    else:
            return jsonify({'error': 'User not found'}), 404
    


