# Assessment ABN Amro Chak Shun Yu

## Project Setup

- For running the project, do a `yarn install` and run the development script using `yarn dev` (or NPM equivalents).
- To run the unit tests with Vitest, use the `yarn test:unit` command.

## Process

In this part I'll describe the process at which I approached this assignment, the timeline, and the decisions that I made.


### VueJS
My first encounter with VueJS was during this assignment. I decided to do this assignment in VueJS instead of ReactJS to display my adaptability and speed of picking things up. In the end, using VueJS did slow down the development process and lowered the code-quality slightly. But I think that they were not too significantly influenced if you look at the end result, especially if you take into account I picked up VueJS while doing this assignment.

### Timeline (28/10 - 04/12)

#### Day 1

- Goal is to figure out the assignment and requirements.
- Figuring out all the details, like should I use VueJS or ReactJS?
    - Communicate to recruiter and to clarify everything before I start.
- Read through the assigments, specify requirements, and rank by importance.
    - Retrieve TV shows [1]
    - Show the TV shows per genre in multiple (horizontal) lists [1]
    - Users should be able to view the show's details by clicking on them [2]
    - Have a search screen for users to search for shows [2]
    - Mobile and responsive UI [3]
    - Unit tests [4]
    - Sort TV shows by rating [5]
    - Extra features [6]
- Sketched some simple designs (can show during call).

#### Day 2
- Confirming the details with recruiter.
- Read up and look into VueJS, particularly things like file setups, styling, and data fetching as those are crucial for this assignment.
- Should I use VueJS? Boils down to: can I produce something worthwhile in VueJS in a few days compared to ReactJS to show my adaptablity? End result is that I will try.

#### Day 3

- Scaffolding of the project.
- Start with implementing the 'foundation' of the app: data fetching, navbar, show lists per genre (random), simple UI and scrollbars.

#### Day 4

-  Implemented the search screen and the show details. It works (main focus), but could look better (improve later).

#### Day 6

- Sync some of the UI flows (minor cleanup). In particular I moved the ShowDetails component into the ShowCard and made it a modal. This made it easier to reuse for the search screen.
- Implemented responsive and mobile designs.
- Improved UX and UI at various locations.
- Sort home lists using rating.

#### Day 7 & 8

- Extra feature: the genres that are displayed on the home screen are based on the incoming genres from the API. Instead of randomly picking them or having them hardcoded, I added the feature to see all the genres and toggle them for the user.
- Add some unit tests.
- Implement a11y features, like keyboard controls and tab-indices.
- Write out this document.

### Comments

1. For the app, I decided to do a general fetch of the shows from the API and store them in state. For the home screen, this meant that the rest of the components could make use of this data without having to perform additional requests to the API anymore. This would increase the initial loadup time, but would make proceeding actions or user interactions perform way better. As users could browse through a lot of shows and toggle their details, I think smoothening these flows is worth the hit on initial loadup.
2. For the search screen, I decided to query the search endpoint of the API. While I could've certainly used the stored data from the previous point, I think it makes more sense to leave the filtering to the API. It already includes fuzzy comparison of the query and can work with the entire database instead what I only have available locally. Unfortunately, the endpoint only returns 10 shows. But I think it still makes sense.
3. Unfortunately, I don't have any placeholders or loading UI implemented. This could've been especially useful for the search screen and the homescreen when it's still loading all the shows. For the sake of time, I had to leave this out. But on a basic level, some dummy cards could've been placed on the search screen before the user inputs any query so it doesn't look empty and a loading spinner could be placed on the home screen while the initial data is loading.
4. For the `ShowDetails` component, I decided to make this into a modal and embed it into the `ShowCard` component. This allowed me to reuse them between the home and search screen.
5. The cards are fixed in height and width. This was done for the sake of time. To make it more responsive, I would make them dynamically scale with the parent container (which scales with the screen's width) and used the margin-top trick to enforce a certain aspect ratio.
6. For the extra feature: the genres that are displayed on the home screen are based on the incoming genres from the API. Instead of randomly picking them or having them hardcoded, I added the feature to see all the genres and ability to toggle them for the user.