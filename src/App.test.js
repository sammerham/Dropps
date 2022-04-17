import { render, screen, fireEvent} from '@testing-library/react';
import App from './App';


test('It renders without crashing', () => {
  render(<App />)
});

test('It matches snapshot', () => {
  const { container } = render(<App />);
  expect(container).toMatchSnapshot();
});

// {exact:false}

test('It should show label', () => {
  render(<App />);
  let label = screen.getByText('Render button');
  expect(label).toBeInTheDocument();
});

test('It should show checked checkBox and button container', () => {
  render(<App />);
  let checkBox = screen.getByLabelText('Render button');
  expect(checkBox).toHaveClass('checked');
  let clickMeButton = screen.getByText('Click Me');
  expect(clickMeButton).toBeInTheDocument()
  let cancelButton = screen.getByText('Cancel');
  expect(cancelButton).toBeInTheDocument();
});



test('It should not show button container when checkbox is unchecked', () => {
  render(<App />);
  let checkBox = screen.getByLabelText('Render button');
  expect(checkBox).toHaveClass('checked');
  let clickMeButton = screen.getByText('Click Me');
  expect(clickMeButton).toBeInTheDocument()
  let cancelButton = screen.getByText('Cancel');
  expect(cancelButton).toBeInTheDocument();
  fireEvent.click(checkBox);
  expect(clickMeButton).not.toBeInTheDocument()
  expect(cancelButton).not.toBeInTheDocument();
});

