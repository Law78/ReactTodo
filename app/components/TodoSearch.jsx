var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

export const TodoSearch = React.createClass({
  /*propTypes: {
    onSearchText: React.PropTypes.func.isRequired
  },
  handleSearch: function(){
    var showCompleted = this.refs.showCompleted.checked;
    var searchText = this.refs.searchText.value;
    this.props.onSearchText(showCompleted, searchText);
    

  },*/
  render: function(){
    console.log(this.props);
    var {dispatch, showCompleted, searchText} = this.props;
    return(
      <div className="container__header">
        <div>
          <input type="search" ref="searchText" placeholder="Cerca nei ToDo"
             onChange={ () =>{
              var searchText = this.refs.searchText.value;
              dispatch(actions.setSearchText(searchText));
            } } />
        </div>
        <div>
          <input type="checkbox" id="showCompleted" ref="showCompleted" checked={showCompleted} onChange={ () => {
            dispatch(actions.toggleShowCompleted());
          }}/>
          <label htmlFor="showCompleted">Visualizzi i task completi</label>
        </div>

      </div>
    );
  }
});

export default connect( (state) => {
  return {
    showCompleted: state.showCompleted,
    searchText: state.searchText
  }
})(TodoSearch);
