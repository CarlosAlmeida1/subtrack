import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { expect, test, vi } from 'vitest';
import '@testing-library/jest-dom'; 
import { Home } from '../pages/Home';
import { generateRandomSubscription } from '../utils/generateMockData';
import userEvent from '@testing-library/user-event';

const renderHome = () => {
  const minhaLista = Array.from({ length: 10 }, generateRandomSubscription);
  const onDeleteMock = vi.fn();
  
  render(
    <BrowserRouter>
      <Home subscriptions={minhaLista} onDelete={onDeleteMock} />
    </BrowserRouter>
  );

  return {
    minhaLista,
    onDeleteMock,
  }
}


test('deve renderizar uma lista dinâmica gerada pelo Faker', () => {
  const { minhaLista } = renderHome();
  expect(screen.getByText(minhaLista[0].name)).toBeInTheDocument();

  const cards = screen.getAllByRole('heading', { level: 3 });   
  expect(cards).toHaveLength(10);
});

test("deve chamar onDelete com o id correto", async () => {
   const { minhaLista, onDeleteMock } = renderHome();

   const buttons = screen.getAllByRole('button', { name: /Excluir/i });

   await userEvent.click(buttons[0]);

   expect(onDeleteMock).toHaveBeenCalledWith(minhaLista[0].id);
   expect(onDeleteMock).toHaveBeenCalledTimes(1);
});

