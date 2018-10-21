import React from 'react';
import { shallow } from 'enzyme';
import Country from './index';

it('renders a specific country', () => {
    const wrapper = shallow(<Country threeLetterCode="US" text={()=>{ return '123' }}/>);
    //const usa = <span class="country-name">United States of America</span>;
    const usa = <span className="country-name" />;
    // expect(wrapper.contains(loading)).toBe(true);
    //expect(wrapper.contains(loading)).toEqual(true);
    expect(wrapper).toContainReact(usa);
    //United States of America12581
  });