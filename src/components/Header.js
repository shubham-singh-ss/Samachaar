//Importing Dependencies
import React from 'react';
import LinkList from './LinkList';
import Tabss from './Tabss';
import { withRouter } from 'react-router';

//Class initialization
class Header extends React.Component{
  //Rendering
  render(){
    return(
      <div>
        <div className="App">
            <div className="App__Aside">
              <div className="App__Aside__text">SAMACHAAR</div>
              <Tabss />
            </div>
            <div className="App__Form">
              <LinkList />
            </div>
        </div>
    </div>
    )
  } //Rendering ends
} //Class ends

//Exporting to the calls
export default withRouter(Header);
