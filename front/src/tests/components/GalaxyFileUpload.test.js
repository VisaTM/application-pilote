import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {
  Button,
} from 'react-bootstrap';
import Dropzone from 'react-dropzone';


import { GalaxyFileUpload } from '../../components/GalaxyFileUpload/GalaxyFileUpload.jsx';


Enzyme.configure({ adapter: new Adapter() });
function setup() {
  const props = {
    requestFilesUpload: jest.fn()
  };
  const enzymeWrapper = shallow(<GalaxyFileUpload {...props} />)

  enzymeWrapper.setState(
    {
      files: [
        {
          name: "file.txt",
          size: 20000
        },
        {
          name: "file2.txt",
          size: 10000
        }
      ]
    }
    );

  return {
    props,
    enzymeWrapper
  }
}



describe('components', () => {
  describe('GalaxyFileUpload', () => {

    it('should render self and subcomponents', () => {
      const { enzymeWrapper } = setup();

      // Sub components
      expect(enzymeWrapper.find(Button).exists()).toBe(true);
      expect(enzymeWrapper.find(Dropzone).exists()).toBe(true);


      expect(enzymeWrapper.find(Button).prop("disabled")).toBe(false)


    });

    it('should call requestFilesUpload when button is clicked', () => {
      const { enzymeWrapper, props } = setup();

      enzymeWrapper.find(Button).simulate('click');
      expect(props.requestFilesUpload).toHaveBeenCalledTimes(1);

    });

    it('should disable the upload button if the file list is empty', () => {
      const { props } = setup();
      const wrapper = shallow(<GalaxyFileUpload {...props} />)
      wrapper.setState({})

      expect(wrapper.find(Button).prop("disabled")).toBe(true)
      wrapper.find(Button).simulate('click');
      expect(props.requestFilesUpload).toHaveBeenCalledTimes(0);

    });
  });
});
