import { reactive } from 'vue';

export type Show = {
  id: number;
  name: string;
  language: string;
  genres: string[];
  rating: { average: number };
  premiered: string;
  image: {
    medium: string;
    original: string;
  };
  summary: string;
};

export const showsStore = reactive({
  shows: [] as Show[],
  genres: [] as string[],
});
