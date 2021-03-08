import React, { Component } from 'react';
import axios from 'axios'
import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post';

// base url: practiceapi.devmountain.com/api

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }

  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts')
      .then(res => {
        this.setState({posts: res.data})
      });
  }

  updatePost(id, text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}` , {text})
      .then(res => {
        this.setState({ posts: res.data})
      });
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
      .then(res => this.setState({ posts: res.data}))
  }

  createPost(text) {
    axios.post(`https://practiceapi.devmountain.com/api/posts` , {text})
      .then(res => this.setState({ posts: res.data}))
  }

  filterPosts = (input)=> {
    let filteredPosts = this.state.posts.filter(e => {
      if(e.text.includes(input)){
        return e
      }
    })
    this.setState({posts: filteredPosts})
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header filterPosts={this.filterPosts}/>

        <section className="App__content">

          <Compose createPost={this.createPost}/>

          {
            posts.map(post => (
              <Post key={post.id}
                text={post.text}
                date={post.date}
                id={post.id}
                updatePostFn={this.updatePost}
                deletePostFn={this.deletePost}/>
            ))
          }


        </section>
      </div>
    );
  }
}

export default App;
