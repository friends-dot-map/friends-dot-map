# Friends Dot Map!

Y'all the styling on this is slick. I love the overlays on top of the maps and the color choices are lovely. Great work integrating map box -- that is NO easy feat and y'all did it in a few days under the pressure of a project. Overall awesome work - you should be proud of yourselves.

- I tried testing this out with a different user but at the same location and it seemed to not work? I could get my first emoji to show up but not the second? Probably a total edge case but maybe worth investigating...
- Might be fun to try to add in an emoji picker like https://www.npmjs.com/package/emoji-picker-react or https://github.com/missive/emoji-mart
- Great use of tailwind! Love the navbar and the floating button
- You may want to create the profile row automatically when the user signs up -- right now the ProfileContext throws an error immediately on sign up because the profile row doesn't exist yet -- if you created the profile row immediately after creating a user (or even added it as a database trigger) then you wouldn't have that problem
- This would be a really good candidate for using supabase realtime -- its not nearly as hard as you may think - you would essentially subscribe to any updates to the profiles table
- I'm not seeing a way to update my own coordinates? is that a future feature? if so, you should remove it from the updateProfile call because its unecessary
