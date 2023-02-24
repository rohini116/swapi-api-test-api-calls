import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';


test('render page heading', () => {
  render(<App/>);
  const headerElement = screen.getByText(/Starwar/i);
  expect(headerElement).toBeInTheDocument();
});
