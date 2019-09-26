import os
import shutil
import subprocess
import datetime
from flask_cors import CORS
from .utils import get_folder_with_name

from flask import (
    Blueprint, jsonify, request, current_app
)

bp = Blueprint('istex', __name__, url_prefix='/istex')
CORS(bp)
###########################
# ISTEX QUERY
###########################
@bp.route('/',methods=['POST'])
def harvestCorpus():
    p=subprocess.run(["./galaxy/scripts/harvestCorpus.pl", "-o", request.form['query']],stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)
    if p.returncode == 0:
        nbdoc = jsonify(p.stdout),200
        return nbdoc
    else:
        if p.stderr:
            return jsonify(p.stderr), 400

    return jsonify("Erreur back"), 500

@bp.route('/download',methods=['POST'])
def downloadcorpus():
    gi = current_app.config["GALAXY_INSTANCE"]
    file_library = gi.libraries.list(name=current_app.config["library_name"])[0]
    corpus_folder = get_folder_with_name(file_library, current_app.config["LIBRARY_CORPUS_FOLDER"])

    date = datetime.datetime.now()
    now = date.strftime("%Y_%m_%d_%H_%M_%S")
    directory = os.path.join(current_app.config['CORPUS_FOLDER'], now)
    os.makedirs(directory)
    p = subprocess.run(["./galaxy/scripts/harvestCorpus.pl", "-q", request.form['query'], "-d", directory],stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)
    if p.returncode == 0:
        if file_library:
            shutil.move(directory + "/id.corpus", directory + "/" + now + ".corpus")
            file = open(directory + "/" + now + ".corpus", 'r')
            filepath = os.path.join(directory, now + ".corpus")
            if file and corpus_folder:
                try:
                    uploaded = file_library.upload_from_local(filepath, corpus_folder)
                    uploaded.wait(1, True)
                    file.close()
                    shutil.rmtree(directory)
                    return jsonify("ok"), 200
                except Exception:
                    file.close()
                    return jsonify("Erreur lors de l'upload du fichier"), 500
            else:
                return jsonify("Veuillez créer une librairie de données dans Galaxy"), 500
        else:
            if p.stderr:
                return jsonify(p.stderr), 400

    return jsonify("Erreur back"), 500

