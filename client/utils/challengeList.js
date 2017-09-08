import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

class ChallengeList extends React.Component {
  render() {
    return (
      <div className="challenge-list-container">
        <table className="table table-bordered text-centered">
          <thead>
            <tr className="thead-row">
              <th className="text-centered challenge-name">Challenge Name</th>
              <th className="text-centered challenge-info">Author</th>
              <th className="text-centered challenge-info">Difficulty*</th>
            </tr>
          </thead>
          <tbody>
            {this.props.challenges.map((challenge, index) => {
              return (
                <tr key={index}>
                  <ChallengeName>
                    <ChallengeLink href={challenge.url}>
                      {challenge.name}
                    </ChallengeLink>
                  </ChallengeName>
                  <ChallengeAuthor>
                    <ChallengeLink href={challenge.authorUrl}>
                      {challenge.author}
                    </ChallengeLink>
                  </ChallengeAuthor>
                  <ChallengeDifficulty>{challenge.difficulty}</ChallengeDifficulty>
                </tr>
              )
            })}
          </tbody>
        </table>
        <p className="text-centered">*Difficulty increases at lower Kyu ratings</p>
      </div>
    )
  }
}

const ChallengeName = styled.td`
  width: 65%;
`

const ChallengeLink = styled.a`
  text-decoration: none;
  color: black;
`

const ChallengeAuthor = styled.td`
  width: 20%;
`

const ChallengeDifficulty = styled.td`
  width: 15%;
`

function mapStateToProps(state) {
  return {
    challenges: state.challenges
  }
}

const Connected = connect(mapStateToProps)(ChallengeList)
export default Connected
