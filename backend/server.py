from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello():
    response.headers.add("Access-Control-Allow-Origin", "*")
    print(response.headers)
    return {"data": [1,2,3]}

if __name__ == '__main__':
    app.run()
