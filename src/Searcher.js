import React from 'react';
import SearchForm from './SearchForm.js';
import SearchResults from './SearchResults.js';
import axios from 'axios';

class Searcher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            neuralSearchResults: [], 
            defaultSearchResults: [],
            query: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.neuralSearchUri = "https://neuralsearch.azurewebsites.net/neuralSearch"; // TODO: Get from environment variables instead
        this.defaultSearchUri = "https://neuralsearch.azurewebsites.net/defaultConfluence";
        this.confluenceBaseUri = 'https://confluence.braincourt.net';
        this.savesearchUri = "http://localhost:5000/savedata";
    }
   
    componentDidMount() {
        var baseTag = document.createElement("base");
        baseTag.setAttribute("target", "_parent");
        document.head.appendChild(baseTag);
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

    documentClickHandler = (docId, docTitle, redirectUrl) => {
        axios.get(this.savesearchUri, {
            params: {
                query: this.state.query,
                documentId: docId,
                documentTitle: docTitle
            }
        })
        .then(res => {
            window.location.replace(redirectUrl);
        })
    }

    handleChange = (event) => {    
        this.setState({query: event.target.value});  
    }

    render() {
        return (
            <div>
                <SearchForm handleChange={this.handleChange} query={this.state.query} handleSubmit={this.handleSubmit}/>
                <SearchResults documentClickHandler={this.documentClickHandler} neuralSearchResults={this.state.neuralSearchResults} defaultSearchResults={this.state.defaultSearchResults} confluenceBaseUri={this.confluenceBaseUri}/>
            </div>
        )
    }
}

export default Searcher;