import { reactive } from 'vue';

export type Show = {
  id: number;
  name: string;
  genres: string[];
  rating: { average: number };
  image: {
    medium: string;
    orginal: string;
  };
  summary: string;
};

export const showsStore = reactive({
  shows: [] as Show[],
  genres: [] as string[],
});
