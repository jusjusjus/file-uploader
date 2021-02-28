from typing import Dict, Any
from random import randint
from glob import glob
from os.path import join, getsize, basename, splitext, exists
from os import environ as env
import json
from os import makedirs
from flask import Flask
from flask_cors import CORS
from werkzeug.utils import secure_filename
from flask import request

def getmegabytes(filepath):
    return getsize(filepath) / (1024 * 1024)

dropzone = './uploads'
makedirs(dropzone, exist_ok=True)

def create_app(**config: bool) -> Flask:
    app = Flask(__name__, instance_relative_config=True)
    CORS(app)

    @app.route('/api/upload', methods=['POST'])
    def upload():
        if request.method == 'POST':
            payload = request.files['file']
            bname, ext = splitext(payload.filename)
            filepath = dropzone
            while exists(filepath):
                filename = f"{bname}-{randint(0, 99999):05}{ext}"
                filepath = join(dropzone, filename)

            payload.save(filepath)

        return 'OK'

    @app.route('/api/files', methods=['GET'])
    def files():
        filepaths = glob(join(dropzone, '*'))
        bytesizes = map(getmegabytes, filepaths)
        filenames = map(basename, filepaths)
        return json.dumps([
            {
                'filename': filename,
                'megabytes': megabytes
            } for filename, megabytes in zip(filenames, bytesizes)
        ])

    return app
