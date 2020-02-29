import React, { Component } from 'react';
import { Comment, Icon } from 'semantic-ui-react';

export default class SingleComment extends Component {
  state = {
    index: this.props.index,
    name: this.props.comment.name,
    text: this.props.comment.text,
    score: this.props.comment.score,
  };

  changeScore = num => {
    this.setState({ score: this.state.score + num });
  };

  render() {
    const { index, name, text, score } = this.state;

    console.log(this.state);
    return (
      <Comment key={index}>
        <Comment.Avatar className="dot" />

        <Comment.Content>
          <Comment.Author className="commentColorWhite">{name}</Comment.Author>
          <Comment.Text className="commentColorWhite">{text}</Comment.Text>
          <Comment.Actions>
            <Comment.Action className="commentColorBlue">
              {score} <Icon name="star" color="yellow" />
            </Comment.Action>

            <Comment.Action className="commentColorBlue">
              <Icon
                name="arrow alternate circle down outline"
                onClick={() => this.changeScore(-1)}
              />
            </Comment.Action>
            <Comment.Action className="commentColorBlue">
              <Icon
                name="arrow alternate circle up outline"
                onClick={() => this.changeScore(1)}
              />
            </Comment.Action>
          </Comment.Actions>
        </Comment.Content>
      </Comment>
    );
  }
}
