import json
from flask_cors import CORS

from flask import (
    Blueprint, jsonify, current_app
)



bp = Blueprint('clusters', __name__, url_prefix='/clusters')
CORS(bp)
###########################
# CLUSTER FILES
###########################
@bp.route('/')
def clusters():
    with current_app.open_resource('data/data.json') as f:
        data = json.load(f)
        return jsonify(data), 200


@bp.route('/<cluster_id>')
def cluster_data(cluster_id):
    with current_app.open_resource('data/cluster' + cluster_id + '.json') as f:
        data = json.load(f)
        return jsonify(data), 200
