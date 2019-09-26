import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


import { GalaxyWorkflowParameters } from '../../components/GalaxyWorkflowManager/GalaxyWorkflowParameters.jsx';

Enzyme.configure({ adapter: new Adapter() });
function setup() {
  const props = {
    selectedWorkflowId: "selected_w_id",
    selectedWorkflowInputs: [
    {
      label: "Matrice Doc/Term",
      name: "docterm",
      optional: true,
      type: "file",
      value: ""
    },
    {
      label: "Nombre de clusters",
      max: 200,
      min: 2,
      name: "clusters",
      optional: false,
      type: "integer",
      value: ""
    },
    {
      label: "Fréquence",
      min: 1,
      name: "frequence",
      optional: false,
      type: "integer",
      value: ""
    }],
    selectedWorkflowParameters: {
      clusters: 20
    },
    uploadedFiles: [{
      id: "33b43b4e7093c91f",
      name: "/ndocDocsMots.txt"
    },
    {
      id: "ebfb8f50c6abde6d",
      name: "/ndocMetadata.txt"
    }],

    selectUploadedFile: jest.fn(),
    requestWorkflowParameterChange: jest.fn(),
    requestUploadedFilesList: jest.fn(),

  }

  const enzymeWrapper = mount(<GalaxyWorkflowParameters {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

describe('components', () => {
  describe('GalaxyWorkflowParameters', () => {


    // Strangely, all the form is not rendered because the component calls external functions
    it('should render self and subcomponents', () => {
      const { enzymeWrapper, props } = setup()
      const frequenceInputProps = props.selectedWorkflowInputs[2];
      const clustersInputProps = props.selectedWorkflowInputs[1];


      // classes
      expect(enzymeWrapper.find('section').hasClass('workflow-parameters')).toBe(true);
      expect(enzymeWrapper.find('.workflow-parameter input[name="clusters"]').hasClass('range-selector')).toBe(true);
      // CONTENT
      expect(enzymeWrapper.find('.workflow-parameter')).toHaveLength(props.selectedWorkflowInputs.length);
      expect(enzymeWrapper.find('label').first().text()).toBe(props.selectedWorkflowInputs[0].label);
      expect(enzymeWrapper.find('label').at(1).text()).toBe(clustersInputProps.label);
      // CONTENT => FILE SELECTOR
      expect(enzymeWrapper.find('.file-selector option')).toHaveLength(props.uploadedFiles.length + 1);
      expect(enzymeWrapper.find('.file-selector option').first().prop("value")).toBe("none");
      expect(enzymeWrapper.find('.file-selector option').first().prop("disabled")).toBe(true);
      expect(enzymeWrapper.find('.file-selector option').first().prop("children")).toBe("--Veuillez choisir un fichier--");
      expect(enzymeWrapper.find('.file-selector option').at(1).prop("value")).toBe(props.uploadedFiles[0].id);
      expect(enzymeWrapper.find('.file-selector option').at(1).prop("children")).toBe(props.uploadedFiles[0].name);

      // CONTENT => WORKFLOW PARAMETERS
      expect(enzymeWrapper.find('.workflow-parameter input[name="frequence"]').prop("type")).toBe("number");
      expect(enzymeWrapper.find('.workflow-parameter input[name="frequence"]').prop("required")).toBe(!frequenceInputProps.optional);
      expect(enzymeWrapper.find('.workflow-parameter input[name="frequence"]').prop("min")).toBe(frequenceInputProps.min);
      expect(enzymeWrapper.find('.workflow-parameter input[name="clusters"]').prop("type")).toBe("range");
      expect(enzymeWrapper.find('.workflow-parameter input[name="clusters"]').prop("required")).toBe(!clustersInputProps.optional);
      expect(enzymeWrapper.find('.workflow-parameter input[name="clusters"]').prop("min")).toBe(clustersInputProps.min);
      expect(enzymeWrapper.find('.workflow-parameter input[name="clusters"]').prop("max")).toBe(clustersInputProps.max);
    });




    it('should call requestUploadedFilesList when component has mounted', () => {
      const { props } = setup()
      expect(props.requestUploadedFilesList).toHaveBeenCalledTimes(1);

    });


    it('should call selectUploadedFile when onChange on file-selector is triggered', () => {
      const { enzymeWrapper, props } = setup();
      const fileProps = props.selectedWorkflowInputs[0];
      const event = {target: { name: fileProps["name"], value: fileProps["id"]}};


      enzymeWrapper.find('.file-selector').first().simulate('change', event);
      expect(props.selectUploadedFile).toHaveBeenCalledTimes(1);
      expect(props.selectUploadedFile).toHaveBeenCalledWith(fileProps["name"], fileProps["id"]);

    });


    it('should call requestWorkflowParameterChange when onChange on workflow parameter input is triggered', () => {
      const { enzymeWrapper, props } = setup();
      const clustersInputProps = props.selectedWorkflowInputs[1];
      const event = {target: { name: clustersInputProps["name"], value: clustersInputProps["id"]}};


      enzymeWrapper.find('.workflow-parameter input[name="clusters"]').simulate('change', event);
      expect(props.requestWorkflowParameterChange).toHaveBeenCalledTimes(1);
      expect(props.requestWorkflowParameterChange).toHaveBeenCalledWith(clustersInputProps["name"], clustersInputProps["id"]);

    });

  });
});


