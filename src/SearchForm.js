import React from 'react';

class SearchForm extends React.Component {
    render() {
      return (
        <form onSubmit={(event) => this.props.handleSubmit(event, this.props.query)}>
          <input type="text" value={this.props.query} onChange={this.props.handleChange} />
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

  export default SearchForm;