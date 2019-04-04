//Importing Dependencies
import React from "react";
import CreateLink from './CreateLink'
import { withRouter } from 'react-router';
import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants';
import { Tabs, Tab, Grid, Cell } from "react-mdl";

//Class initialization
class Tabss extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeTab: 0 };
  }

  //What to display
  toggleCategories() {
    if (this.state.activeTab === 0) {
      return <CreateLink />
    }
  }

  //Rendering
  render() {
    return (
      <div style={{backgroundColor:'transparent'}}>
        <Tabs
          activeTab={this.state.activeTab}
          onChange={tabId => this.setState({ activeTab: tabId })}
          ripple
        >
          <Tab style={{color:'white'}}>Post</Tab>
          <Tab style={{color:'white'}} onClick={() => {
            localStorage.removeItem(GC_USER_ID)
            localStorage.removeItem(GC_AUTH_TOKEN)
            this.props.history.push(`/`)
          }}>Logout</Tab>
        </Tabs>
        <Grid>
          <Cell col={12}>
            <div className="content">{this.toggleCategories()}</div>
          </Cell>
        </Grid>
      </div>
    )
  }//Rendering ends
} //Class ends

//Exporting to the calls
export default withRouter(Tabss);
