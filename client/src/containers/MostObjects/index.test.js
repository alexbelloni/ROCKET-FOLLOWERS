import React from 'react';
import { shallow } from 'enzyme';
import MostObjects from './index';

it('renders welcome message', () => {
    const wrapper = shallow(<MostObjects />);
    const loading = <p>Loading</p>;
    // expect(wrapper.contains(loading)).toBe(true);
    //expect(wrapper.contains(loading)).toEqual(true);
    expect(wrapper).toContainReact(loading);
  });