# Development

### Link to Deployed Website
https://lazydog222.github.io/dev/

### Goal and Value of the Application
The goal of the application is to sort and favorite images that I took on my trip to Spain last May.  
The user is able to use several parameters to find the photos that they like and then can easily
save them to their favorites to look back at later.

### Usability Principles Considered
I used a simple and minimalstic layout to focus the attention on the photographs rather than the UI.  
The black and white color scheme with arial font is a blank slate that does not distract from the photographs.
I added splashes of red and green to make it more clear (and enjoyable) for the user to like and view their favorite photos.
I also used several flexboxes and media queries to ensure that every device can view the website with ease.

### Organization of Components
I only set up one main component - the photo component.  The photo component has one state (click) which controls whether
it is zoomed in or not. Clicking on the photo when on a laptop or larger screen causes the photo component to get bigger
for better viewing.

In my App.js page I used several different states for the checkboxes, switches, and buttons.  These were all very simple
true and false states that controlled whether a filter was on or not.  My most complicated states were the filters state (an
array of pairs with the filter and true false for whether it is active) and the favorites state list which contains a tuple with
the agregations(total number of animals in the favorited photos) and a list with the image id's that are in the favorites list.  

### How Data is Passed Down Through Components
The only data passed down into the Photo component is the favorites list.  This ensures that when a photo is favorited (or unfavorited)
that the favorites list is updated in the App.js page and causes the whole page to refresh with the new updates.  I only made
one component because there was only one reused item - the photo. It was easy enough to make the filter page without using a different
component file.

### How the User Triggers State Changes
The user triggers state changes in several different ways.  The reset all button simply sets all of the states back to their initial value.
The favorites heart updates the favorites state with the image id.  The checkboxes alter the filters array state so that the items are filtered correctly on the rerender.  The drop down menu changes the sort state between 0 and 1 (for time and animal sorting) just like the favorites switch, which turns on and off the favorites filter, which is its own state variable.  

