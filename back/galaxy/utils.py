import json

def o_to_json(object_to_convert):
    return json.dumps([ob.__dict__ for ob in object_to_convert])

def get_folder_with_name(galaxy_lib, folder_name):
    folder_list = [ 
        f for f in galaxy_lib.content_infos 
        if f.type == "folder" and f.name == folder_name
    ]
    if len(folder_list) > 0 :
        return galaxy_lib.get_folder(folder_list[0].id)
    else :
        return galaxy_lib.create_folder(folder_name)
