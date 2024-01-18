import os
from flask import request, jsonify, url_for

from app2 import db,app
from app2.models.user_model import User


@app.route('/userDelete/',methods=['DELETE'])
def delete_user():
    username = request.args.get('username', None)
    print(username)
    if not username:
        return jsonify({'error': 'Username not provided in the  data'}), 400
    user = db.session.query(User).filter(User.username == username).first()
    if not user:
        jsonify({'error': "User doesn't exist"}), 400

    db.session.delete(user)
    db.session.commit()
    return jsonify({'userDeletionSuccessfull':True})


