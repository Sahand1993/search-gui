import React from 'react';
import { Column, Row } from 'simple-flexbox';

class SearchResults extends React.Component {

    render() {
        return (
        <Row>
            <Column flexGrow={1}>
                <Column horizontal="center">
                    <Column horizontal="center">
                        <h3>Neural Search Results</h3>
                    </Column>
                </Column>
                <Column vertical='center'>
                    <Column horizontal='center' vertical='start'>
                        {this.props.neuralSearchResults.map((result) => (<a href={this.props.confluenceBaseUri + result.webUi} onClick={() => this.props.documentClickHandler(result.id, result.title, this.props.confluenceBaseUri + result.webUi)} key={result.key}>{result.title}</a>))}
                    </Column>
                </Column>
            </Column>
            <Column flexGrow={1}>
                <Column horizontal="center">
                    <h3>Default Search Results</h3>
                </Column>
                <Column vertical='center'>
                    <Column horizontal='center' vertical='start'>
                        {this.props.defaultSearchResults.map((result) => (<a href={this.props.confluenceBaseUri + result.webUi} onClick={() => this.props.documentClickHandler(result.id, result.title, this.props.confluenceBaseUri + result.webUi)} key={result.key}>{result.title}</a>))}
                    </Column>
                </Column>
            </Column>
        </Row>
        )
    }
}

export default SearchResults;