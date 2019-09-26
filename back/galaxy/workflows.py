import os
import json
import sys
from .utils import o_to_json
from flask_cors import CORS
from flask import (
    Blueprint, jsonify, request, current_app, Response
)

bp = Blueprint('workflows', __name__, url_prefix='/workflows')

CORS(bp)
###########################
# WORKFLOWS LIST ROUTE
###########################
@bp.route('/', methods=['GET'])
@bp.route('/<workflow_type>', methods=['GET'])
def get_workflows(workflow_type=None):
    """
     Get the workflow list from Galaxy. 
    Then for each workflow, fetch the complete information associated to this workflow.
    The complete information contains :
    - The workflow's name & id
    - The inputs name
    - The workflow's steps with outputs
    """
    gi = current_app.config["GALAXY_INSTANCE"]
    workflows = gi.workflows.list()
    workflows_complete = []

    for w in workflows:
        wi = w.export()
        wi['id'] = wi['uuid']
        if workflow_type and "type:" + workflow_type in wi["tags"]:
            workflows_complete.append(wi)
        if workflow_type == None:
            workflows_complete.append(wi)

    return jsonify(workflows_complete), 200

@bp.route('/<workflow_id>/inputs', methods=['GET'])
def get_workflow_inputs(workflow_id):
    """
    Get the workflow inputs from the given workflow_id 
    This function suppose that, if the workflow has steps, the 
    last step is the tool that need inputs, the other steps being file inputs.
    First, we get the tool_id from the last step and then we get the detailed info
    on the tool such as the inputs name, label min/max values...
    """
    gi = current_app.config["GALAXY_INSTANCE"]
    workflow = gi.workflows.get(workflow_id)
    inputs = []

    # Other parameters
    if workflow.steps:
        for index in workflow.steps:
            step = workflow.steps[index]
            if step.tool_id:
                detailed_tool = gi.tools.get(step.tool_id, io_details=True)
                
                if detailed_tool.wrapped["inputs"]:
                    for inp in detailed_tool.wrapped["inputs"]:
                        #if inp['type'] != 'data': 
                        keys = ['name', 'label', 'optional', 'value', 'type']
                        tool_input = {x:inp[x] for x in keys}
                        tool_input["type"] = 'file' if inp['type'] == 'data' else inp['type']
                        tool_input["min"] = inp['min'] if "min" in inp else None
                        tool_input["max"] = inp['max'] if "max" in inp else None
                        tool_input["tool_id"] = step.tool_id
                        if inp["type"] == "select" and "options" in inp:
                            tool_input["options"] = format_input_options(inp["options"])
                        inputs.append(tool_input)
    return jsonify(inputs), 200


def format_input_options(options):
    formatted = []
    for opt in options:
        formatted.append(
            {
                "label": opt[0],
                "value": opt[1],
                "selected": opt[2]
            }
        )
    return formatted
        

###########################
# WORKFLOW EXECUTION ROUTE
###########################
@bp.route('/execute',  methods=['POST'])
def execute_workflow():
    gi = current_app.config["GALAXY_INSTANCE"]
    filesData = json.loads(request.form['files'])
    paramsData = json.loads(request.form['params'])
    wf = gi.workflows.get(request.form['workflow_id'])
    exec_history = gi.histories.get(current_app.config["history_id"])
    file_library = gi.libraries.list(name=current_app.config["library_name"])[0]

    inputs = []
    formattedParams = dict()

    # For each params in paramsData, 
    # Look for the corresponding step, get the step id and assign the params value
    for step_id in wf.steps:
        tool_id = wf.steps[step_id].tool_id
        if tool_id and tool_id in paramsData:
            formattedParams[step_id] = paramsData[tool_id]
    # For each files in fileData, create a new input for Galaxy
    for key in sorted(filesData):
        inputs.append(file_library.get_dataset(filesData[key]))
    invoked = wf.run(history=exec_history,
                     input_map=dict(zip(wf.input_labels, inputs)),
                     import_inputs=False,
                     params=formattedParams
                    )
    results = []    
    for hda in invoked[0]:
        results.append({ "id" : hda.id, "state": hda.state})

    return jsonify(results), 200



###########################
# JOB RESULT ROUTE
###########################
@bp.route('/results/<result_id>',  methods=['GET'])
def show_job(result_id):
    gi = current_app.config["GALAXY_INSTANCE"]
    exec_history = gi.histories.get(current_app.config["history_id"])

    result_dataset_content = exec_history.get_dataset(result_id).get_contents().decode('utf-8')
    
    return jsonify(result_dataset_content)

###########################
# GET JOBS RELATED TO ONE OR ALL WORKFLOWs
###########################
@bp.route('/jobs',  methods=['GET'])
def workflow_invocations():
    """
    Requests workflow invocations, with the state of the invocation
    If a workflow_id is provided, get only the invocations of the workflow
    Else get all the invocations
    GET Parameters:
    - workflow_id: the id of the workflow
    """
    gi = current_app.config["GALAXY_INSTANCE"]
    exec_history = gi.histories.get(current_app.config["history_id"])
    jobs = exec_history.content_infos
    #Purged error filtered_jobs = [j for j in jobs if j.wrapped["hid"] != None and j.wrapped["purged"] != True  and j.wrapped["deleted"] != True]
    filtered_jobs = [j for j in jobs if j.wrapped["hid"] != None and j.wrapped["deleted"] != True]
    return o_to_json(filtered_jobs), 200
