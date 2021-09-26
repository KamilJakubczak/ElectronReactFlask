import json
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello():
    return json.dumps({"data": [1,2,3]})

if __name__ == '__main__':
    app.run()
