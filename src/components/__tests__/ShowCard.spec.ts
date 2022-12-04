import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/vue';
import { mount } from '@vue/test-utils';
import ShowCard from '../ShowCard.vue';
import ShowDetails from '../ShowDetails.vue';
import type { Show } from '../../utils/shows.store';

const dummyShow: Show = {
  id: 1,
  name: 'Under the Dome',
  language: 'English',
  genres: ['Drama', 'Science-Fiction', 'Thriller'],
  premiered: '2013-06-24',
  rating: {
    average: 6.5,
  },
  image: {
    medium:
      'https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg',
    original:
      'https://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg',
  },
  summary:
    "<p><b>Under the Dome</b> is the story of a small town that is suddenly and inexplicably sealed off from the rest of the world by an enormous transparent dome. The town's inhabitants must deal with surviving the post-apocalyptic conditions while searching for answers about the dome, where it came from and if and when it will go away.</p>",
};

describe('The ShowCard', () => {
  /**
   * The first 2 tests were made using @testing-library/vue, which is the library I would normally
   * use to unit test the most important aspects of components based on user value and not implementation
   * details. While I would normally combine it with Jest, I used vitest here as it holds similar
   * functionalities and is already installed in the default VueJS template.
   */
  it('shows the appropriate information for the user', () => {
    const { queryByText, queryByAltText } = render(ShowCard, {
      props: {
        coverImageSrc: 'https://some-image.com/cover',
        title: 'Awesome show #1',
        show: dummyShow,
      },
    });
    expect(queryByText('Awesome show #1')).toBeDefined();
    expect(queryByAltText('Cover image of Awesome show #1')).toBeDefined();
  });

  it('shows a placeholder image if the show doesnt have a cover image', () => {
    const { queryByAltText, queryByTestId } = render(ShowCard, {
      props: {
        coverImageSrc: null,
        title: 'Awesome show #2',
        show: dummyShow,
      },
    });
    expect(queryByAltText('Cover image of Awesome show #2')).toBeNull();
    expect(queryByTestId('cover-image-placeholder')).toBeDefined();
  });

  /**
   * In this test I used the `mount` rendering function of vitest instead of @testing-library/vue
   * to more easily verify the user interaction flow of clicking the card. For the sake of keeping
   * this unit test contained, I mocked out my fetch function and only cared about whether the
   * ShowDetails component was rendered as an assertion for the flow. One could argue about mocking
   * the entire `ShowDetails` component or basing the assertion on other unique details if present. 
   */
  it('open the show details when the user clicks on the card', async () => {
    vi.mock('../../utils/api', () => ({
      fetchShowCover: vi
        .fn()
        .mockReturnValue(
          new Promise((res) => res('https://some-image.com/banner'))
        ),
    }));

    const wrapper = mount(ShowCard, {
      props: {
        coverImageSrc: 'https://some-image.com/cover',
        title: 'Awesome show #1',
        show: dummyShow,
      },
    });

    expect(wrapper.findComponent(ShowDetails).exists()).toBe(false);
    await wrapper.find('.container').trigger('click');
    expect(wrapper.findComponent(ShowDetails).exists()).toBe(true);
  });
});
