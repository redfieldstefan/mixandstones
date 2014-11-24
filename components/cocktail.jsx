/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="myClass"> {/* Important that what's returned be a single element! */}
        <h1>{this.props.name}</h1>
        <p>{this.props.description}</p>
        <h2>Ingredients:</h2>
        <ul>
          {this.props.ingredients.map(function(ingredient) {
            return <li>{ingredient}</li>
          })}
        </ul>
      </div>
    );
  }
});