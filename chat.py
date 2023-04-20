#!/usr/bin/python3
import flask
# create a flask app
app = flask.Flask(__name__)

@app.route('/chat')
def chat():
    return flask.render_template('chat.html')

@app.route('/messages', methods=['POST'])
def query_messages():
    msg = flask.request.get_json().get('message')
    print (msg)
    return {'message': msg}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)