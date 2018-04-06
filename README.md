# Thomas Laird - Campspot Code Challenge

## Setting Up
1. `cd campspot_challenge`
2. `npm install` or `yarn install`
3. `npm run dev` or `yarn dev`

## Testing
1. `npm test` or `yarn test`

## Approach to the Problem
Each campsite starts with an initial status of `Available`. Reservations are iterated over and are checked against both ends of the search as follows:
1. Logical check to see whether reservation meets all 3 of the following criteria against search as follows:
  * Reservation start is not adjacent to search end (adjacent items will not cause gap problems at any size gap).
  * Reservation start is less than the gap + 1 away from the search end
  * Reservation start is not < 0 from the search end (indicates that reservation should not be considered)

Any reservation meeting all 3 of these criteria indicates that the campsite in question should not be available for the search period.

This process is repeated in checking the reservation end vs the search start and following the same set of principles.

There is an additional check to see whether the search lies within a reservation in which case that campsite will be marked as unavailable as well.

## Assumptions
I assumed for the purposes of this exercise that campsite and reservation data was in good standing and does not have repeated campsites, already overlapping reservations, invalid reservation or searches (end occurs before start) or other forms of corruption.

