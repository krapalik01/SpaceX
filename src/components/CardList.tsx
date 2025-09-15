import { Flex, Group, MantineProvider } from '@mantine/core';
import CardItem from './CardItem';
import { useReducer, useEffect } from 'react';
import getData from '../api/getData';
import '@mantine/core/styles.css';
import type { State, Action } from '../type';

function cardsReducer(state: State, action: Action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, cards: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function CardList() {
  const initialState = { cards: [], loading: false, error: null };
  const [state, dispatch] = useReducer(cardsReducer, initialState);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchData() {
      dispatch({ type: 'FETCH_START' });
      try {
        const data = await getData(abortController.signal);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        const err = error as Error;
        if (err.name !== 'AbortError') {
          // игнорируем отмену
          dispatch({ type: 'FETCH_ERROR', payload: err.message });
        }
      }
    }
    fetchData();

    return () => {
      abortController.abort('abort was called');
    };
  }, []);

  return (
    <>
      <MantineProvider>
        <Group mr={80} ml={80}>
          {state.loading && <div>Загрузка...</div>}
          {state.error && <div>Ошибка: {state.error}</div>}
          <Flex wrap="wrap" rowGap={28} columnGap={24}>
            {state.cards.map((card) => (
              <CardItem
                key={card.mission_name}
                missionName={card.mission_name}
                rocketName={card.rocket?.rocket_name}
                image={card.links?.mission_patch_small}
                details={card.details}
              />
            ))}
          </Flex>
        </Group>
      </MantineProvider>
    </>
  );
}

export default CardList;
