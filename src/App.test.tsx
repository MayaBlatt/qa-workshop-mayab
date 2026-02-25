import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import App from './App';

const mockTodos = [
  { userId: 1, id: 1, title: 'Buy groceries', completed: false },
  { userId: 1, id: 2, title: 'Walk the dog', completed: true },
  { userId: 1, id: 3, title: 'Read a book', completed: false },
];

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockTodos),
    })
  ) as unknown as typeof fetch;
});

afterEach(() => {
  vi.restoreAllMocks();
});

test('shows loading state initially', () => {
  render(<App />);
  expect(screen.getByTestId('loading-indicator')).toHaveTextContent('Loading...');
});

test('renders a checkbox for each todo using data-testid', async () => {
  render(<App />);

  await waitFor(() => {
    expect(screen.getByTestId('todo-list')).toBeInTheDocument();
  });

  for (const todo of mockTodos) {
    const checkbox = screen.getByTestId(`todo-checkbox-${todo.id}`);
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('type', 'checkbox');
  }
});

test('checkboxes reflect the completed state from the API', async () => {
  render(<App />);

  await waitFor(() => {
    expect(screen.getByTestId('todo-list')).toBeInTheDocument();
  });

  expect(screen.getByTestId('todo-checkbox-1')).not.toBeChecked();
  expect(screen.getByTestId('todo-checkbox-2')).toBeChecked();
  expect(screen.getByTestId('todo-checkbox-3')).not.toBeChecked();
});
