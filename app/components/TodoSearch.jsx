var React = require('react');

const TodoSearch = React.createClass({
  propTypes: {
    onSearchText: React.PropTypes.func.isRequired
  },
  handleSearch: function(){
    var showCompleted = this.refs.showCompleted.checked;
    var searchText = this.refs.searchText.value;
    this.props.onSearchText(showCompleted, searchText);

  },
  render: function(){
    return(
      <div>
        <div>
          <input type="text" ref="searchText" placeholder="Cerca nei ToDo"
            onChange={this.handleSearch} />
        </div>
        <div>
          <input type="checkbox" id="showCompleted" ref="showCompleted" onChange={this.handleSearch} />
          <label htmlFor="showCompleted">Visualizzi i task completi</label>
        </div>

      </div>
    );
  }
});

module.exports = TodoSearch;
