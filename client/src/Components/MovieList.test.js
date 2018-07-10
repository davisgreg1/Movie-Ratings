import React from 'react';
import MovieList from './MovieList';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const data = {
        data = {
            results: ["thing one", "thing two"]
        }
    }
    const currentUser = {
        name: "Greg",
        age: "85"
    }
    const tree = renderer
      .create(<MovieList data={data} loggedIn = "true" currentUser={currentUser}>{props.children}</MovieList>)
      .toJSON();
    expect(tree).toMatchSnapshot();

    tree.props.data()
    tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  });