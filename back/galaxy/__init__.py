import os
from flask import (
    Flask
)
from bioblend.galaxy.objects import GalaxyInstance
from dotenv import load_dotenv

UPLOAD_FOLDER = '/app/uploaded'
CORPUS_FOLDER = '/app/corpus'
OUTPUTS_FOLDER = '/app/outputs'


def create_app(test_config=None):
    # create and configure the app
    # Galaxy Config
    load_dotenv()
    GALAXY_INSTANCE_URL = os.getenv("GALAXY_INSTANCE_URL")
    GALAXY_INSTANCE_API_KEY = os.getenv("GALAXY_INSTANCE_API_KEY")
    gi = GalaxyInstance(GALAXY_INSTANCE_URL, GALAXY_INSTANCE_API_KEY)
    file_library = gi.libraries.list(name="VisaTMPiloteData")[0]

    app = Flask(__name__, instance_relative_config=True)

    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
    app.config['CORPUS_FOLDER'] = CORPUS_FOLDER
    app.config['OUTPUTS_FOLDER'] = OUTPUTS_FOLDER
    app.config['history_id'] = os.getenv("GALAXY_HISTORY_ID") 
    app.config['library_name'] = "VisaTMPiloteData"
    app.config['GALAXY_INSTANCE'] = gi

    app.config['LIBRARY_CORPUS_FOLDER'] = "corpus"
    app.config['LIBRARY_EXTRACTION_FOLDER'] = "extraction"
    app.config['LIBRARY_CLUSTERING_FOLDER'] = "clustering"

    from . import clusters
    app.register_blueprint(clusters.bp)
    from . import corpus
    app.register_blueprint(corpus.bp)
    from . import files
    app.register_blueprint(files.bp)
    from . import istex
    app.register_blueprint(istex.bp)
    from . import workflows
    app.register_blueprint(workflows.bp)

    return app
