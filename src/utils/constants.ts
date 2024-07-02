export const PRIMARY_COLOR = '#6466E9';

export type SCREENS = {
  HOME: string;
  USER_SEARCH: string;
  REPOSITORY_SEARCH: string;
}

export const SCREEN_TITLES: SCREENS = {
  HOME: 'Inicio',
  USER_SEARCH: 'Búsqueda por usuario',
  REPOSITORY_SEARCH: 'Búsqueda por repositorio',
};
Object.freeze(SCREEN_TITLES);

export const GITHUB_API_BASE_URL = 'https://api.github.com/';

export type InputSearchType = 'users' | 'repositories';

type SearchType = {
  USER: InputSearchType;
  REPOSITORY: InputSearchType;
}

export const SEARCH_TYPES: SearchType = {
  USER: 'users',
  REPOSITORY: 'repositories',
};
