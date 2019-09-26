import React from 'react';
import {
  FormControl,
  FormGroup,
  Radio,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap';


export const workflowFileSelectorGenerator = (inputInformations, files, onChange) => {
  const filesList = files.map((file) => (
    <option key={file["id"]} value={file['id']}>{file['name']}</option>
  ))
  filesList.unshift(<option key="0" value="none" disabled>--Veuillez choisir un fichier--</option>)

  return (
    <article className="workflow-parameter" key={inputInformations["name"]} >
      <label htmlFor={inputInformations["name"]} >{inputInformations["label"]}</label>
      <FormControl
        className="file-selector"
        componentClass="select"
        placeholder="select"
        required={true}
        name={inputInformations["name"]}
        defaultValue="none"
        onChange={onChange}>
        {filesList}
      </FormControl>
    </article>
  )
};

export const workflowParameterGenerator = (inputInformations, onChange, currentParameter) => {
  let inputParams = {
    name: inputInformations["name"],
    required: !inputInformations["optional"],
    placeholder: "-- Please enter a value --"
  };
  switch (inputInformations["type"]) {
    case "integer":
      inputParams["type"] = "number";
      inputParams["step"] = 1;
      break;
    case "float":
      inputParams["type"] = "number";
      inputParams["step"] = 0.1;
      break;
    case "select":
      inputParams["type"] = "radio";
      inputParams["defaultValue"] = inputInformations["value"];
      break;
    default:
      inputParams["type"] = "text"
  }

  if (inputInformations["value"]) {
    inputParams["defaultValue"] = inputInformations["value"]
  }
  if (inputInformations["min"]) {
    inputParams["min"] = inputInformations["min"];
  }
  if (inputInformations["max"]) {
    inputParams["max"] = inputInformations["max"];
  }


  if (inputInformations["min"] && inputInformations["max"]) {
    inputParams["className"] = "range-selector";
    inputParams["type"] = "range";
    inputParams["defaultValue"] = 0;
    return (
      <article className="workflow-parameter" key={inputInformations["name"]} >
        <label htmlFor={inputInformations["name"]} >{inputInformations["label"]}</label>
        <OverlayTrigger
          placement="right"
          overlay={
            <Tooltip id="overlay-example">
              {currentParameter && currentParameter.value ? currentParameter.value : inputParams["defaultValue"]}
            </Tooltip>
          }>
          <FormControl
            componentClass="input"
            onChange={onChange}
            {...inputParams} />
        </OverlayTrigger>
      </article>
    )
  } else if (inputParams["type"] === "radio") {
    let radioOptions = []
    inputInformations["options"].forEach((option, idx) => {
      radioOptions.push(
        <Radio name={inputParams["name"]}
          key={idx}
          value={option.value}
          onChange={onChange}
          inline>
          {option.label.charAt(0).toUpperCase() + option.label.slice(1)}
        </Radio>
      )
    })
    return (
      <article className="workflow-parameter" key={inputInformations["name"]} >
        <label htmlFor={inputInformations["name"]} >{inputInformations["label"]}</label>
        <FormGroup>
          {radioOptions}
        </FormGroup>
      </article>
    )
  } else {
    return (
      <article className="workflow-parameter" key={inputInformations["name"]} >
        <label htmlFor={inputInformations["name"]} >{inputInformations["label"]}</label>
        <FormControl
          componentClass="input"
          onChange={onChange}
          {...inputParams} />
      </article>
    )

  }


}


