import React, { Component } from 'react';

class Repo extends Component {
    render () {
        const repo = this.props.repo
        return (
            <li 
                className={repo.fork? 'forked': ''} 
                onClick={() => {this.props.deleteRepo(repo.id)}}
            >{repo.name}</li>
        )
    }
}

class MyRepo extends Component {
    render() {
        const repoElements = this.props.myReposProps.map((repo,index) => {
            return (
                <Repo 
                    key={repo.id} 
                    deleteRepo={this.props.deleteRepo} 
                    repo={repo}
                />
            )
        })

        return (
            <ul>
                {repoElements}
            </ul>
        )
    }
}

export default MyRepo;