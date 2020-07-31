import React from 'react';

class SearchForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {query: ''};
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {    this.setState({query: event.target.value});  }
  
    render() {
      return (
        <form onSubmit={(event) => this.props.handleSubmit(event, this.state.query)}>
          <input type="text" value={this.state.query} onChange={this.handleChange} />
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

  export default SearchForm;