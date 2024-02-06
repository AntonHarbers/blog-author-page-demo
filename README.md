# Blog Api - The Odin Project - Author Front end

Welcome to the Blog Author Page Demo, a comprehensive front-end solution designed to interface seamlessly with the Blog API for a complete blogging platform. This project, built using TypeScript, Vite, and React, showcases my approach to creating dynamic web applications that are both efficient and user-friendly.

[Live Link]()

[Frontend App Repo](https://github.com/AntonHarbers/blog-frontend-demo)

[Frontend App](https://famous-dolphin-e32fb4.netlify.app/)

[Rest-API Repo](https://github.com/AntonHarbers/Blog-Api-Demo)

[Rest-API Enpoint](https://cerulean-diagnostic-watercress.glitch.me/)

## Project Features

The Blog Author Page Demo introduces a range of functionalities aimed at providing a smooth experience for both blog authors and readers:

- **Dynamic Post Management**: Authors can create, edit, and delete their blog posts directly from the web interface.
- **Session Management**: Utilizes JWT from the Blog API for authentication, maintaining session states for users.
- **Interactive UI for Blog Interaction**: Readers can view posts, with future enhancements planned to include commenting and post interaction.

## Getting Started

To run this project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/AntonHarbers/blog-author-page-demo.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

Ensure the Blog API is running and accessible for backend functionality.

## Built With

- **React**: For building the user interface with a component-based architecture.
- **TypeScript**: Used for adding static type definitions to enhance code quality and understandability.
- **Vite**: As a build tool for fast development and bundling.
- **Tailwind CSS**: For styling the application with a utility-first CSS framework.

## Component Overview

- **`App.tsx`**: The root component managing application state, including user authentication and post creation flow.
- **`LogIn.tsx` & `LogOut.tsx`**: Handle user authentication, allowing users to log in and out.
- **`Posts.tsx` & `Post.tsx`**: Responsible for displaying posts and individual post details.
- **`NewPostForm.tsx`**: Provides an interface for authors to create new posts.
- **`Comment.tsx`**: (Future implementation) Will handle displaying and managing comments on posts.

## Configuration Files

- **`package.json`**: Lists project dependencies and scripts for running the application.
- **`vite.config.ts`**: Configures Vite for project-specific needs.
- **`tailwind.config.js`**: Tailwind CSS configuration for customizing styles.
- **`.eslintrc.cjs` & `postcss.config.js`**: Configurations for ESLint and PostCSS to ensure code quality and process CSS.

## Lessons Learned

This project has been instrumental in honing my skills in several key areas:

- **React and TypeScript Integration**: Developing a deeper understanding of using TypeScript in React applications for better state management and prop definitions.
- **API Integration**: Connecting a React front-end to a RESTful API securely and efficiently.
- **Modern JavaScript Tooling**: Leveraging tools like Vite and Tailwind CSS for faster development cycles and responsive design.

## Future Directions

- **Enhanced Authentication**: Implementing more robust authentication features, including OAuth.
- **Interactive Comments**: Allowing users to add, edit, and delete comments on posts.
- **User Profiles**: Enabling users to create and manage their profiles.

Your feedback is welcome as I continue to improve this project.
