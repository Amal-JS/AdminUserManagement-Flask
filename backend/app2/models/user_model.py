import uuid
from app2 import db,app

def generate_uuid():
    return str(uuid.uuid4())

class User(db.Model):
    id = db.Column(db.String(150), primary_key=True, default=generate_uuid)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(10),unique = True, nullable = False)
    password = db.Column(db.String(150),nullable = False)
    image = db.Column(db.String(200),default = '')
    isSuperUser = db.Column(db.Boolean(),default=False)

    def __repr__(self):
        return f"User('{self.username}', '{self.email}')"
    


with app.app_context():
    db.create_all()

