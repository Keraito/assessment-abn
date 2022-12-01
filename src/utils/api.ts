import type { Show } from './shows.store';

export const fetchShows = (): Promise<Show[]> =>
  fetch('https://api.tvmaze.com/shows').then((response) => response.json());

type ShowImage = {
  id: number;
  type: 'poster' | 'banner' | 'background' | 'typography' | 'NULL';
  resolutions: {
    original: {
      url: string;
    };
  };
};

export const fetchShowCover = (showId: number): Promise<string | undefined> =>
  fetch(`https://api.tvmaze.com/shows/${showId}/images`)
    .then((response) => response.json())
    .then(
      (images: ShowImage[]) =>
        images.find((image) => image.type === 'background')?.resolutions
          .original.url
    );

type SearchResult = {
  score: number;
  show: Show;
};

export const searchShow = (query: string): Promise<SearchResult[]> =>
  fetch(`https://api.tvmaze.com/search/shows?q=${query}`).then((response) =>
    response.json()
  );
