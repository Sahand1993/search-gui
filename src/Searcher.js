import React from 'react';
import SearchForm from './SearchForm.js';
import SearchResults from './SearchResults.js';
import axios from 'axios';

class Searcher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            neuralSearchResults: [], 
            defaultSearchResults: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.neuralSearchUri = "https://neuralsearch.azurewebsites.net/neuralSearch"; // TODO: Get from environment variables instead
        this.defaultSearchUri = "https://neuralsearch.azurewebsites.net/defaultConfluence";
        this.confluenceBaseUri = 'http://confluence.braincourt.net';
    }
   
    handleSubmit = (event, query) => {
        this.search(query);
        event.preventDefault();
    }

    search = (query) => {
        this.searchNeural(query);
        this.searchDefault(query);
    }

    searchNeural = (query) => {
        axios.get(this.neuralSearchUri, {
            params: {
                query: query
            }
        }).then(res => {
            this.setState({neuralSearchResults: res.data.results.map((item) => {
                item.key = item.id;
                return item;
            })});
        })
    }

    searchDefault = (query) => {
        axios.get(this.defaultSearchUri, {
            params: {
                query: query
            }
        })
        .then(res => {
            this.setState({defaultSearchResults: res.data.results.map((item) => {
                item.key = item.id;
                return item;
            })});
        })
    }

    render() {
        return (
            <div>
                <SearchForm handleSubmit={this.handleSubmit}/>
                <SearchResults neuralSearchResults={this.state.neuralSearchResults} defaultSearchResults={this.state.defaultSearchResults} confluenceBaseUri={this.confluenceBaseUri}/>
            </div>
        )
    }
}

export default Searcher;