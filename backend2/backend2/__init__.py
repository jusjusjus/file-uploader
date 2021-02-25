from typing import Dict, Any
from random import randint
from glob import glob
from os.path import join
from os import environ as env
import json
from os import makedirs
from flask import Flask
from flask_cors import CORS
from werkzeug.utils import secure_filename
from flask import request

dropzone = './uploads'
makedirs(dropzone, exist_ok=True)

def create_app(**config: bool) -> Flask:
    app = Flask(__name__, instance_relative_config=True)
    CORS(app)

    @app.route('/api/upload', methods=['POST'])
    def upload():
        if request.method == 'POST':
            payload = request.files['file']
            filename = f"{randint(0, 9999):04}"
            payload.save(join(dropzone, filename))

        return 'OK'

    @app.route('/api/files', methods=['GET'])
    def files():
        filenames = glob(join(dropzone, '*'))
        megabytes = [1024 * 1024 for filename in filenames]
        return json.dumps([
            {
                'filename': filename,
                'megabytes': megabyte
            } for filename, megabyte in zip(filenames, megabytes)
        ])

    return app
