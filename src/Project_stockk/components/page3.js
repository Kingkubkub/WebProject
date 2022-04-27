
import React, { Component } from 'react';
import { Tabs, Tab } from 'react-mdl';
import A2 from './imstock';
import News from './newspage';
import Exchange from './exchange';
import Policy from './policy'
import Mutualfund from './mutualfund'
import Stock2 from './stock'
import World from './world'
import Mainstock from './mainstock'

class Projects extends Component {
  
  render() {
    return (
      <div>
        <div class="col-6">
          <select className="browser-default custom-select">
            <option>Choose your option</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </select>
        </div>
      </div>
    )
  }
}

export default Projects;

