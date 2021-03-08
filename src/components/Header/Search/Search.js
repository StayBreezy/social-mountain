import React, { Component } from 'react';

import './Search.css';

import SearchIcon from 'react-icons/lib/md/search';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      userInput: ''
    }
  }
  handleChange = (input) => {
    this.setState({userInput: input})

  }
  render() {
    return (
      <section className="Search__parent">

        <div className="Search__content">
          <input onChange={(e) => this.handleChange(e.target.value)} value={this.state.userInput}placeholder="Search Your Feed" />

          <SearchIcon onClick={() => this.props.filterPosts(this.state.userInput)} id="Search__icon" />
        </div>

      </section>
    )
  }
}
