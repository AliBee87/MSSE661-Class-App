import React from 'react';
import { Adapter, shallow, configure } from 'enzyme';
import { UsersTest } from "./Users";

configure({adapter: new Adapter()});

describe("UsersTest", () => {

  it("should render initial layout", () => {
    const component = shallow(<UsersTest />);
    expect(component.getElements()).toMatchSnapshot();

  });
  
  it("should create an entry in component state", () => {
    const component = shallow(<UsersTest />);
    const form = component.find('input');
    form.props().onChange({target: {
      name: 'myName',
      value: 'myValue'
    }});
   
    expect(component.state('input')).toBeDefined();
  });

  it("should create an entry in component state with the event value", () => {
    const component = shallow(<UsersTest />);
    const form = component.find('input');
    form.props().onChange({target: {
      name: 'myName',
      value: 'myValue'
    }});
    
    expect(component.state('input')).toEqual('myValue');
  });
});