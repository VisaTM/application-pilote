import os
import json
from .utils import o_to_json
from flask_cors import CORS

from flask import (
    Blueprint, jsonify, request, current_app
)
from bioblend import galaxy
from werkzeug.utils import secure_filename


bp = Blueprint('files', __name__, url_prefix='/files')
CORS(bp)
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'csv', 'tsv'])


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


###########################
# UPLOADED FILES ROUTE
###########################
@bp.route('/', methods=['GET'])
@bp.route('/folder/<folder_name>', methods=['GET'])
def get_uploaded_files(folder_name=None):
    gi = current_app.config["GALAXY_INSTANCE"]
    file_library = gi.libraries.list(name=current_app.config["library_name"])[0]

    if folder_name: 
        files_list = [
            f for f in file_library.content_infos
            if f.type != "folder" and folder_name in f.name
        ]
        return o_to_json(files_list), 200
    else :
        files_list = [
            f for f in file_library.content_infos
            if f.type != "folder"
        ]
        return o_to_json(files_list), 200

###########################
# FILE UPLOAD ROUTE
###########################
@bp.route('/upload', methods=['POST'])
def upload_file():
    gi = current_app.config["GALAXY_INSTANCE"]
    file_library = gi.libraries.list(name=current_app.config["library_name"])[0]
    # check if the post request has the file part
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 500
    file = request.files['file']
    # if user does not select file, browser also
    # submit an empty part without filename
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 500
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(
            current_app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        try:
            uploaded = file_library.upload_from_local(filepath)
            uploaded.wait(1, True)
            return jsonify({ 'id': uploaded.id, 'name': uploaded.name, 'file_size': uploaded.file_size }), 200
        except Exception as e:
            return jsonify("Erreur lors de l'upload du fichier : " + str(e)), 500




###########################
# TEST ROUTE
###########################
@bp.route('/',  methods=['GET'])
def test():
    gi = current_app.config["GALAXY_INSTANCE"]
    return jsonify(gi.workflows.show_invocation('f2db41e1fa331b3e', '5969b1f7201f12ae')), 200
