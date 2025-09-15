export default async function getVegetables(signal?: AbortSignal) {
  const response = await fetch(
    'https://api.spacexdata.com/v3/launches?launch_year=2020',
    { signal }
  );
  if (!response.ok) {
    throw new Error('Ошибка загрузки');
  }
  const data = await response.json();
  return data;
}
