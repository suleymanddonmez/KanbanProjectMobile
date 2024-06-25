## Kanban Task Mobile App

This project is a Kanban Task mobile application developed using Expo and React Native, leveraging the backend of an existing Next.js and MongoDB-based [Kanban Task Project]((https://github.com/suleymanddonmez/KanbanProject) application. The project is designed to provide a seamless and efficient Kanban task management experience on mobile devices..

### Technologies Used

- **Expo:** The mobile application is built using Expo, a framework and platform for universal React applications. Expo provides a streamlined development workflow and a wide range of tools and services.
- **React Native:** React Native is used to create a native mobile application for both iOS and Android platforms. It allows the use of React components to build a mobile UI.
- **TypeScript:** TypeScript is used to enhance the development experience by providing static type checking, which helps in catching errors early and improves code quality and maintainability.
- **NativeWind v4 CSS:** NativeWind is utilized for styling the application. It combines the utility-first approach of Tailwind CSS with React Native's styling system, allowing for rapid and consistent UI development.

You can access the live version of the project through the following link:
- [Kanban Task Project Mobile App](https://expo.dev/preview/update?slug=exp&projectId=e7f479c3-e2fa-4e29-aa4d-34b50727d9c9&group=4fa1b28a-3a70-4b4e-af58-de7761c4ac6e) 

### Features

- **Integrated with Existing Backend:** The mobile application connects to the existing Next.js and MongoDB-based backend to fetch and manage project, task list, and task data.
- **3 Main Models:** Consists of 3 main models: Project, TaskList, and Task.
- **Jira-Like Kanban Task Management:** Provides a Jira-like Kanban task management system where you can view and manage tasks and task lists within projects.
- **Connected Data Structure:** Task lists are associated with projects, and tasks are associated with task lists.
- **Project List Page:** All projects are listed on the project homepage with their names.
- **Project Pages:** Separate pages are available for each project. These pages list the task lists belonging to the project, and each task list can display its own tasks.
- **Dynamic Task Management:** You can edit, delete all tasks.
- **Responsive Design:** The application features a responsive design that adapts to various mobile screen sizes.

### Getting Started

To run the project, follow these steps:

1. **Clone the repository:**
   
   ```
   git clone https://github.com/suleymanddonmez/KanbanProjectMobile.git
   ```

2. **Install dependencies:**
   
   ```
   npm install
   ```

3. **Start the development server:**

    ```bash
    expo start
    ```

5. Open the Expo Go app on your mobile device and scan the QR code to see the result.

### API Integration

The mobile application communicates with the backend API to perform CRUD operations on projects, task lists, and tasks. The API endpoints and details can be found in the web project's API documentation.

### Resources

To learn more about the technologies used in this project, you can explore the following resources:

- [Expo Documentation](https://docs.expo.dev/) - Learn about Expo and its features.
- [React Native Documentation](https://reactnative.dev/docs/getting-started) - Learn about React Native for building native mobile applications.
- [TypeScript Documentation](https://www.typescriptlang.org/docs/) - Learn about TypeScript, the superset of JavaScript that adds static types.
- [NativeWind Documentation](https://www.nativewind.dev/v4/overview) - Learn about NativeWind, the utility-first CSS framework for React Native.
- [Next.js Documentation](https://nextjs.org/docs) - Learn about the backend framework used in the web project.
- [MongoDB Documentation](https://www.mongodb.com/docs) - Learn about MongoDB features and connections.

### Deploy on Expo

The easiest way to share your Expo app is to use the [Expo Go](https://expo.dev/client) app for development and testing. For production deployment, you can use [Expo's build and submit services](https://docs.expo.dev/distribution/introduction/).

### Contributing

If you'd like to contribute to this project, please fork the repository and use a feature branch. Pull requests are warmly welcome.

1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes.
4. Push to the branch.
5. Create a new pull request.
