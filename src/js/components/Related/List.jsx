import React from 'react';

export default class List extends React.Component {
  render() {
    return (
      <div>
        <h2 style={{ marginBottom: '2%' }}>{this.props.title}</h2>
        <ul style={{ textAlign: 'center', margin: '0', padding: '0' }}>
          {this.props.children}
        </ul>
      </div>
    );
  }
}
