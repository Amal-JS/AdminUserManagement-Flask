
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager

app = Flask(__name__)


jwt = JWTManager(app)

app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+mysqlconnector://root:mysql@localhost/user_management_flask2"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your-secret-key'

db = SQLAlchemy(app)
CORS(app)
# , origins=[ 'http://localhost:5173']
UPLOAD_FOLDER = 'app/static/user_images'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER 


from . views import userviews , adminviews 