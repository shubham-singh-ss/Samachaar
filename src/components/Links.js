//Importing Dependencies
import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { GC_USER_ID } from '../constants';
import { timeDifferenceForDate } from '../utils';
import '../styles/List.css';

//Class initialization
class Links extends React.Component {
//Rendering
  render(){
    const userId = localStorage.getItem(GC_USER_ID) //Storing user id from local storage in userId
    return(
      <div>
        <div className="wrapper">
      		<div className="card radius shadowDepth1">
        			<div className="card__image border-tlr-radius">
        				<img src={this.props.link.url} alt="img" className="border-tlr-radius" />
              </div>
              <div className="card__content card__padding">
                <div className="card__share" style={{color:'gray'}}>
                  {userId && <div onClick={ () => this.voteForLink()}>
                    <i className="fas fa-heart" style={{fontSize:'3em', color:'red'}}></i>
                  </div>}
                  {this.props.link.votes.length} likes
                </div>
      				  <div className="card__meta">
                  <time>{timeDifferenceForDate(this.props.link.createdAt)}</time>
      				  </div>
      				  <article className="card__article">
  	    				  <h2>{this.props.link.title}</h2>
  	    				  {this.props.link.description}
  	    			  </article>
      			  </div>
      			  <div className="card__action">
      				  <div className="card__author">
      					  <div className="card__author-content">
      						  By {' '}{this.props.link.postedBy
                      ? this.props.link.postedBy.name
                      : 'unknown'}{' '}
      					  </div>
      				  </div>
        		  </div>
        	 	</div>
        	</div>
        </div>
    )
  }//Remder emds

  //to trigger an upvote
  voteForLink = async() => {
    const userId = localStorage.getItem(GC_USER_ID)
    const voterIds = this.props.link.votes.map(vote => vote.user.id)
    if(voterIds.includes(userId)){
      console.log(`User (${userId}) already voted for this link.`)
      return
    }
    const linkId = this.props.link.id
    await this.props.createVoteMutation({
      variables: {
        userId,
        linkId
      },
      update: (store, { data: { createVote } }) => {
        this.props.updateStoreAfterVote(store, createVote, linkId)
      }
    })
      window.location.reload()
  }
}



//Creating vote
const CREATE_VOTE_MUTATION = gql`
  mutation CreateVoteMutation($userId: ID!, $linkId: ID!) {
    createVote(userId: $userId, linkId: $linkId) {
      id
      link {
        votes {
          id
          user {
            id
          }
        }
      } user {
        id
      }
    }
  }
`

//Exporting to the calls
export default graphql(CREATE_VOTE_MUTATION, {name: 'createVoteMutation'})(Links)
