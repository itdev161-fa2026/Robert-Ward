# Robert-Ward

Fa26 Web Programming 1

## Final Project Enhancement

### Enhancement(s) Implemented

- Toast notifications using react-hot-toast
- Improved Date Formatting using date-fns (format with "PP pp" and formatDistanceToNow)

### Video Demonstration

[https://drive.google.com/file/d/17Ffl0G8pc8R1ixOqFEXqz5IYZ7ooqBSi/view?usp=vids_web]

### Features Added

- Modern toast notifications instead of alerts
- success and error toasts for:
- login
- logout
- register
- post:
- create
- delete
- edit
- toast appears in the top center of the screen and and auto-dismiss after a short duration.

- Improved date display for posts
- post dates are formatted with date-fns for a more readable format.
- The post detail page shows a friendly date (e.g. "December 8, 2025, 5:13 PM")
- A relative time using formatDistanceToNow(date, {addSuffix: true}) (e.g. "5 minutes ago")
- this gives a modern blog-style timestamp instead of ISO strings.

### Technical Implementation

- Toast Notifications
   Installed and imported react-hot-toast
- Added the global <Toaster /> in the main client entry (main.jsx or App.jsx)
- Replaced alert() calls with:
- toast.success("Message")
- toast.error("Message")
- used inside:
- Login component
- Register component
- Logout handler
- Post delete confirmation
- Error states in API failures

- Date Formatting
  Using date-fns:
- import { format, formatDistanceToNow } from "date-fns";
- const formatted = format(new Date(post.createDate), "PP pp");
- const relative = formatDistanceToNow(new Date(post.createDate), { addSuffix: true });
  Then displayed both:
- Dec 12, 2025 at 4:32 PM • 5 minutes ago
  This required updates to the PostDetail page only.
 

### New Dependencies

- react-hot-toast  - For displaying non-blocking toast notifications.
- date-fns  - For formatting dates with "PP pp" and generating relative timestamps like “5 minutes ago”.

### Setup Instructions

1. Install dependencies: `npm install` `npm install react-hot-toast date-fns`
2. Environment variables:  No new variables required for the enhancements. Existing API keys / server configs remain unchanged.
3. Run the Project
   - Backend: npm run server
   - Frontend: npm run dev
4. Testing the enhancements
   - Log in / Log out: Toast appears
   - Register: Toast appears
   - Delete a post: Toast appears
   - Visit a post: formatted date + "how long ago" line is visible
  
  ### Key Challenges Solved
  During the development of this project, the most significant challenges I faced were related to debugging and managing shared logic across multiple components. As features were added, especially form validation, toast notifications, and CRUD operations, I encountered issues where logic was duplicated or unintentionally triggered more than once. This resulted in behaviors such as actions firing twice, success and error messages appearing simultaneously, or forms failing silently.

A major lesson from this process was the importance of clearly separating responsibilities between components. For example, form validation and submission logic needed to live in a single, well-defined place to avoid conflicting side effects. Moving logic to the correct component and ensuring each action occurred exactly once resolved many of these issues.

This project reinforced the value of incremental testing, console logging, and isolating changes when debugging. Rather than rewriting large sections of code, I learned to trace issues step by step, verify assumptions, and confirm how data and events flowed through the application. Overall, these challenges improved my understanding of React component structure, state management, and real-world debugging practices. (With all that being said i still can't figure out why my registration continues to send a success message on failure. It doesn't actually save it just sends the success message at the top but it's still frustrating..yet motivating for the future.)