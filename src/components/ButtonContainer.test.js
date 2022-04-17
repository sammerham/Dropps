import { render, screen, fireEvent } from '@testing-library/react';
import ButtonContainer from './ButtonContainer'


test('It renders without crashing', () => {
  render(<ButtonContainer />)
});

test('It matches snapshot', () => {
  const { container } = render(<ButtonContainer />);
  expect(container).toMatchSnapshot();
});


test('It should show disabled cancel button', () => {
  render(<ButtonContainer />);
  let cancelButton = screen.getByText('Cancel');
  expect(cancelButton).toBeInTheDocument();
  expect(cancelButton).toBeDisabled()
});


test('It should show enabled Click Me button', () => {
  render(<ButtonContainer />);
  let clickMeButton = screen.getByText('Click Me');
  expect(clickMeButton).toBeInTheDocument();
  expect(clickMeButton).toBeEnabled()
});

test('It should show cancel btn enabled and clicked me disabled when Clicked me is clicked', () => {
  render(<ButtonContainer />);
  let cancelButton = screen.getByText('Cancel');
  let clickMeButton = screen.getByText('Click Me');
  fireEvent.click(clickMeButton);
  expect(cancelButton).toBeEnabled()
  expect(clickMeButton).toBeDisabled()
});


test('It should show loading and be disabled when Clicked me is clicked', () => {
  render(<ButtonContainer />);
  let clickMeButton = screen.getByText('Click Me');
  fireEvent.click(clickMeButton);
  expect(clickMeButton).toHaveTextContent("Click Me (loading)")
  expect(clickMeButton).toBeDisabled()
});
