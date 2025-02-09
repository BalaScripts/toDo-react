# To-Do App

## Description

This is a React-based To-Do application that allows users to efficiently manage their tasks by providing features to create, read, update, and delete tasks. Users can organize their tasks by marking them as completed, filtering based on different criteria, and prioritizing them with due dates. The app enhances user experience through features like authentication, dark mode, drag-and-drop task reordering, and debounced search for optimized task lookup.

## Features

- **CRUD Operations:**
  - Create, read, update, and delete tasks.
- **Task Management:**
  - Mark tasks as completed.
  - Filter tasks based on their status (completed, pending, urgent).
  - Support for due dates and task prioritization.
- **Persistent Storage:**
  - Store tasks persistently using `localStorage`.
- **Authentication:**
  - JWT-based authentication system (using a mock API).
- **Drag & Drop:**
  - Enable task reordering using @hello-pangea/dnd.
- **Dark Mode:**
  - Toggle between light and dark themes.
- **Debounced Search:**
  - Optimize search functionality with debouncing to reduce API calls.

## Technologies Used

- React
- Material UI
- Bootstrap
- Tailwind CSS
- Axios
- DnD Kit(@hello-pangea/dnd)
- JWT for authentication (mock API)
- Lodash
- React Hot Toast
- React Router DOM

## Getting Started

To run this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone <https://github.com/BalaScripts/toDo-react>
   ```

2. **Navigate to the project directory:**

   ```bash
   cd todo-app
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Install Tailwind CSS with Vite:**

   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init
   ```

5. **Configure Tailwind CSS:** Add the following content configuration in `tailwind.config.js`:

   ```javascript
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"]
   ```

6. **Set up the mock API for JWT authentication:**

   - Ensure the API endpoints in your code point to the mock API.

7. **Run the application:**

   ```bash
   npm run dev
   ```

8. **Open the app:**
   Open your web browser and go to [http://localhost:5173](http://localhost:5173/toDo-react/) to view the app.

9. **Deploy to GitHub Pages:**

   ```bash
   npm run deploy
   ```

## Usage

- **Create a task:** Enter task details, set a due date, and click the "Add Task" button.
- **Update a task:** Click the edit button to modify task details.
- **Delete a task:** Click the delete button to remove a task.
- **Mark a task as completed:** Toggle the task status by clicking the checkbox.
- **Filter tasks:** Use filter options to view completed, pending, or urgent tasks.
- **Search tasks:** Enter keywords in the search bar (with debouncing optimization).
- **Drag & drop:** Reorder tasks using the drag-and-drop feature.
- **Toggle Dark Mode:** Switch between light and dark themes.

## Live Demo

Access the live version of the application: [[https://balascripts.github.io/toDo-react/](https://balascripts.github.io/toDo-react/)]

## Folder Structure

```
src/
├── assets/         // images
├── components/     // Reuble components
└── css/            // Custom styles
```

## Future Enhancements

- Integration with a real backend API for task management.
- Notification system for task reminders.
- Role-based access control.
- Enhanced UI/UX features.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contributions

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## Contact

For any queries or suggestions, please contact Balamurugan from Chennai.

