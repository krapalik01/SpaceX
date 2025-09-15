import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { MantineProvider } from '@mantine/core';

import CardList from '../components/CardList';

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

const mockCards = [
  {
    missionName: 'Mission 1',
    rocketName: 'Rocket 1',
    image: 'img1.png',
    details: 'Details 1',
  },
  {
    missionName: 'Mission 2',
    rocketName: 'Rocket 2',
    image: 'img2.png',
    details: 'Details 2',
  },
  {
    missionName: 'Mission 3',
    rocketName: 'Rocket 3',
    image: 'img3.png',
    details: 'Details 3',
  },
];

// Мок fetch глобально, до рендера компонента
vi.stubGlobal(
  'fetch',
  vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockCards),
    })
  )
);

describe('CardList', () => {
  it('рендерит правильное количество карточек', async () => {
    render(
      <MantineProvider>
        <CardList />
      </MantineProvider>
    );

    const items = await screen.findAllByTestId('card-item');
    expect(items).toHaveLength(mockCards.length);
  });
});
