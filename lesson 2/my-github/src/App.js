import React, { Component } from 'react';
import MyRepo from './MyRepo.js'
import './App.css';
import myRepos from './myrepos.json'

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			myRepos : [
				{id: '23452',
				name: 'teste'}
			],
			loading : false,
			searchString : ''
		}
	}

	getData = () => {
		this.setState({loading:true})

		fetch('https://api.github.com/users/cinezaster/repos')
			.then((response) => {
				return response.json();
			})
			.then((myJson) => {
				this.setState({
					myRepos: myRepos, 
					loading: false
				})
			})
	}

	deleteRepo = (repoID) => {
		const myNewListOfRepos = this.state.myRepos.filter((repo)=> {
			return repoID !== repo.id
		})

		this.setState({
			myRepos: myNewListOfRepos
		})
	}

	searchRepo = (event) => {
		const searchString = event.target.value
		this.setState({searchString : searchString})
	}

	render() {
		const myFilteredRepos = this.state.myRepos.filter((repo) => {
			const regex = new RegExp(this.state.searchString, 'g')
			return regex.test(repo.name)
		})
		return (
			<div>
				{this.state.loading? 'loading':''}
				<button onClick={this.getData} >Refresh</button>
				<input type='text' onChange={this.searchRepo}></input>
				<MyRepo myReposProps={myFilteredRepos} deleteRepo={this.deleteRepo} />
			</div>
		);
	}
}

export default App;
