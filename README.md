# jason-stankevich-bookmarks-app
A client-side bookmarking application that utilizes a RESTful Web API on the backend.

#### User Story Requirements
- [x] Users can add bookmarks to my bookmark list. Bookmarks contain:
  - title
  - url link
  - description
  - rating (1-5)
- [x] Users can see a list of my bookmarks when I first open the app
- [x] All bookmarks in the list default to a "condensed" view showing only title and rating
- [x] Users can click on a bookmark to display the "detailed" view
  - Detailed view expands to additionally display description and a "Visit Site" link
- [x] Users can remove bookmarks from my bookmark list
- [x] Users receive appropriate feedback when I cannot submit a bookmark
- [x] Users can select from a dropdown (a `<select>` element) a "minimum rating" to filter the list by all bookmarks rated at or above the chosen selection
- [x] Users can edit the rating and description of a bookmark in my list

##### Technical Requirements
- [x] Use fetch for AJAX calls and jQuery for DOM manipulation
- [x] Use namespacing to adhere to good architecture practices
- [x] Minimal global variables
- [x] Create modules in separate files to organize your code
- [x] Logically group your functions (e.g. API methods, store methods...)
- [x] Keep your Data out of the DOM
- [x] No direct DOM manipulation in your event handlers!
- [x] Follow the React-ful design pattern - change your state, re-render your component
- [x] Use semantic HTML
- [x] Use a responsive and mobile-first design
  - Visually and functionally solid in viewports for mobile and desktop
- [x] Follow a11y best practices