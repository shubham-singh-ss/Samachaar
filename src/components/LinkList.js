//Importing Dependencies
import React from 'react';
import Links from './Links';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

//Class initialization
class LinkList extends React.Component{
  //method to update cache memory after voting
    updateCacheAfterVote = (store, createVote, linkId) => {
      const data = store.readQuery({query: ALL_LINKS_QUERY})
      const votedLink = data.allLinks.find(link => link.id === linkId)
      votedLink.votes = createVote.link.votes
      store.writeQuery({query: ALL_LINKS_QUERY, data})
    }

//Rendering
  render(){
    if (this.props.allLinksQuery && this.props.allLinksQuery.loading) {
      return(
        <div>Loading...</div>
      )
    }
    if (this.props.allLinksQuery && this.props.allLinksQuery.error) {
      return <div>Error</div>
    }

    const linksToRender = this.props.allLinksQuery.allLinks;

    return (
      <div>
        {linksToRender.map((link, index) => (
          <Links
            key={link.id}
            updateStoreAfterVote={this.updateCacheAfterVote}
            index={index}
            link={link}
          />
        ))}
      </div>
    )
  }//render ends
} //class ends


//Fetching all links in database
export const ALL_LINKS_QUERY = gql`
  query AllLinksQuery {
    allLinks {
      id
      title
      createdAt
      url
      description
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
        }
      }
    }
  }
`


export default graphql(ALL_LINKS_QUERY, { name: 'allLinksQuery'})(LinkList);
