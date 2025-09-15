import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  describe,
  it,
  expect,
  vi,
  beforeAll,
  beforeEach,
  afterEach,
} from 'vitest';
import { MantineProvider } from '@mantine/core';

import CardItem from '../components/CardItem';

// Мок window.matchMedia для корректной работы MantineProvider в тестах
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
});

describe('CardItem', () => {
  const mockOnAddToCard = vi.fn();

  const defaultProps = {
    missionName: 'Demo Mission',
    rocketName: 'Demo Rocket',
    image: 'starlink.png',
    details: 'Demo details',
  };

  beforeEach(() => {
    mockOnAddToCard.mockClear();
    render(
      <MantineProvider>
        <CardItem {...defaultProps} />
      </MantineProvider>
    );
  });

  beforeEach(() => {
    // Создаем контейнер для портала модалки
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);
  });

  afterEach(() => {
    const modalRoot = document.getElementById('modal-root');
    if (modalRoot) modalRoot.remove();
  });

  it('рендерит переданные пропсы', () => {
    expect(screen.getByText('Demo Mission')).toBeInTheDocument(); // берем любой проп
  });

  it('Проверка на рендер всех данных переданых в пропсах', () => {
    expect(screen.getByText(/Demo Mission/i)).toBeInTheDocument();
    expect(screen.getByText(/Demo Rocket/i)).toBeInTheDocument();
    // expect(screen.getByText(/details/i)).toBeInTheDocument(); ой он в модалке же))
  });

  it('рендерит переданной картинки', () => {
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'starlink.png');
  });

  it('Рендер кнопки, клик по ней и должно появиться модальное окно', async () => {
    const user = userEvent.setup();

    // Ищем кнопку по aria-label
    const button = screen.getByLabelText(/buttonMore/i);
    expect(button).toBeInTheDocument();

    await user.click(button);

    expect(await screen.findByRole('dialog')).toBeVisible();
    expect(screen.getByText(/Demo details/i)).toBeInTheDocument();
  });

  it('Проверка всех пропсов в модалке', async () => {
    const user = userEvent.setup();

    const button = screen.getByLabelText(/buttonMore/i);
    expect(button).toBeInTheDocument();

    await user.click(button);

    expect(screen.getByTestId('mission-name')).toHaveTextContent(
      /Demo Mission/i
    );
    expect(screen.getByTestId('rocket-name')).toHaveTextContent(/Demo Rocket/i);
    expect(screen.getByText(/Demo details/i)).toBeInTheDocument();
    const img = screen.getAllByRole('img');
    expect(img[0]).toHaveAttribute('src', 'starlink.png');
  });
});
