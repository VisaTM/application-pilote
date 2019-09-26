import os
import logging
from flask_cors import CORS

from flask import (
    Blueprint, jsonify, current_app, abort, send_file, render_template
)



bp = Blueprint('corpus', __name__, url_prefix='/corpus')
CORS(bp)

###########################
# CORPUS QUERY
###########################
@bp.route('/',methods=['GET'])
def list_corpus():
    BASE_DIR = './corpus'

    # Joining the base and the requested path
    abs_path = os.path.join(BASE_DIR)
    # Return 404 if path doesn't exist
    if not os.path.exists(abs_path):
        return abort(404)

    # Check if path is a file and serve
    if os.path.isfile(abs_path):
        return send_file(abs_path)
    # Show directory contents
    files = os.listdir(abs_path)
    logging.info(abs_path)
    return render_template('corpus.html', files=files)


@bp.route('/<corpusid>/',methods=['GET'])
def list_files(corpusid):
    BASE_DIR = './corpus/'

    # Joining the base and the requested path
    abs_path = os.path.join(BASE_DIR,corpusid)
    # Return 404 if path doesn't exist
    if not os.path.exists(abs_path):
        return abort(404)

    # Check if path is a file and serve
    if os.path.isfile(abs_path):
        return send_file(abs_path)
    # Show directory contents
    corpus = corpusid
    files = os.listdir(abs_path)
    logging.info(files)
    return render_template('files.html', files=files,corpus = corpus)


@bp.route('/<corpusid>/<fileid>',methods=['GET'])
def download_files(corpusid,fileid):
    BASE_DIR = './corpus/'

    # Joining the base and the requested path
    abs_path = os.path.join(BASE_DIR,corpusid,fileid)
    # Return 404 if path doesn't exist
    if not os.path.exists(abs_path):
        return abort(404)

    # Check if path is a file and serve
    if os.path.isfile(abs_path):
        return send_file(abs_path)
    else:
        return abort(404)
