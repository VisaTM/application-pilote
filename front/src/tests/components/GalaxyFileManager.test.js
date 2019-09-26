import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {
  Button,
} from 'react-bootstrap';
import ReactTable from "react-table";


import { GalaxyFileManager } from '../../components/GalaxyFileManager/GalaxyFileManager.jsx';
import GalaxyFileUpload from '../../components/GalaxyFileUpload/GalaxyFileUpload.jsx';


Enzyme.configure({ adapter: new Adapter() });
function setup() {
  const props = {
    requestUploadedFilesList: jest.fn()
  };
  const enzymeWrapper = shallow(<GalaxyFileManager {...props} />)


  return {
    props,
    enzymeWrapper
  }
}



describe('components', () => {
  describe('GalaxyFileManager', () => {

    it('should render self and subcomponents', () => {
      const { enzymeWrapper } = setup();


      // classes
      expect(enzymeWrapper.hasClass('galaxy')).toBe(true);
      expect(enzymeWrapper.find('section').hasClass('files-list')).toBe(true);

      // Sub components
      expect(enzymeWrapper.find(Button).exists()).toBe(true);
      expect(enzymeWrapper.find(ReactTable).exists()).toBe(true);
      expect(enzymeWrapper.find(GalaxyFileUpload).exists()).toBe(true);

    });


    it('should call requestUploadedFilesList when component is mounted', () => {
      const { props } = setup();

      expect(props.requestUploadedFilesList).toHaveBeenCalledTimes(1);

    });

    it('should call requestUploadedFilesList when button is clicked', () => {
      const { enzymeWrapper, props } = setup();

      enzymeWrapper.find(Button).simulate('click');
      // called when the component is mounted & button clicked
      expect(props.requestUploadedFilesList).toHaveBeenCalledTimes(2);

    });

  });
});
