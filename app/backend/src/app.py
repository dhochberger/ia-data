from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os
from src.routes.dashboard import dashboard_route
from src.routes.movies import movies_route

from src.database import db

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


user = os.getenv('MONGODB_USER')
password = os.getenv('MONGODB_PASSWORD')
uri = os.getenv('MONGODB_URI')

app.config['MONGODB_SETTINGS'] = {
    'host': f"mongodb+srv://{user}:{password}@{uri}/database?retryWrites=true&w=majority"
}

db.init_app(app)


app.register_blueprint(movies_route)
app.register_blueprint(dashboard_route)

@app.route('/')
def home():
  return 'Nostradamovies Home route'

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
