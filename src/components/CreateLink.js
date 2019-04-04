//Importing Dependencies
import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { GC_USER_ID } from '../constants';
import { ALL_LINKS_QUERY } from './LinkList';

//Class initialization
class CreateLink extends React.Component{
  //Defining initial states
  state = {
    title:"",
    description: "",
    url: ""
  }

//Rendering
  render(){
    return(
      <div>
        <div style={{padding:'10px', marginTop:'7%', textAlign:'center', color:'white'}}>
          <div className="FormField">
          <input
            value={this.state.title}
            onChange={(e) => this.setState({ title: e.target.value })}
            type='text'
            className='FormField__Input'
            placeholder='Enter Title'
          />
      </div>
      <div className="FormField">
          <input
            value={this.state.description}
            onChange={(e) => this.setState({ description: e.target.value })}
            type='text'
            className='FormField__Input'
            placeholder='Enter Description'
          />
      </div>
      <div className="FormField">
          <input
            value={this.state.url}
            onChange={(e) => this.setState({ url: e.target.value })}
            type='text'
            className='FormField__Input'
            placeholder='Enter URL'
          />
      </div>
        </div>
        <button onClick={() => this.createLink()} className="Create__Button1">
          Submit
        </button>
      </div>
    )
  }

  //function to execute button tag- to create a post
  createLink = async() => {
    const postedById = localStorage.getItem(GC_USER_ID)
    if(!postedById) {
      console.error('No user logged in')
      return
    } else {
    const { title, description, url } = this.state
    await this.props.createLinkMutation({
      variables: {
        title,
        description,
        url,
        postedById
      },
      update: (store, { data: { createLink } }) => {
        const data = store.readQuery({ query: ALL_LINKS_QUERY })
        data.push(createLink)
        data.writeQuery({
          query: ALL_LINKS_QUERY,
          data
        })
      }
    })
    window.location.reload()
  }
}

}// Class ends

//Creating posts
const CREATE_LINK_MUTATION = gql`
  mutation CreateLinkMutation($title: String, $description: String!, $ url: String!, $postedById: ID!) {
    createLink(
      title: $title,
      description: $description,
      url: $url,
      postedById: $postedById
    ) {
      id
      createdAt
      url
      title
      description
      postedBy{
        id
        name
      }
    }
  }
`
//Exporting to the calls
export default graphql(CREATE_LINK_MUTATION, {name: 'createLinkMutation'})(withRouter(CreateLink));
