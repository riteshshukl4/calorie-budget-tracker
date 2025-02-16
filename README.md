# Calorie Tracker

Calorie Tracker is a React Native application built with Expo that lets you track your daily food intake. It provides a simple interface to add, view, and manage food items while keeping track of nutritional information like calories, protein, and cost.

## Features

- Add new food items with nutritional details.
- View a list of added food items.
- Remove food items.
- Data persistence using AsyncStorage.
- Context API for efficient state management.
- Cross-platform support (iOS, Android, and Web via Expo).

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/)
- A mobile device or emulator (iOS/Android) or a web browser

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/calorie-tracker.git
   cd calorie-tracker
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**

   ```bash
   expo start
   ```

   This will open the Expo developer tools in your browser. From there, you can run the app on a simulator/emulator or on your physical device using the Expo Go app.

## Project Structure

- [App.tsx](http://_vscodecontentref_/0): The main React component that sets up navigation and wraps the app in the FoodProvider context.
- [context](http://_vscodecontentref_/1): Contains the FoodContext implementation for state management, including actions like adding and removing food items.
- [screens](http://_vscodecontentref_/2): Contains various screen components such as HomeScreen, DailyIntakeScreen, and AddFoodItemScreen.
- `__tests__/` or similar: Contains tests (e.g., FoodContext.test.tsx) for context and component functionality.
- Other configuration files: [package.json](http://_vscodecontentref_/3), [app.json](http://_vscodecontentref_/4), etc.

## Running Tests

This project uses Jest along with `@testing-library/react-hooks` for testing.

To run the tests, use:

```bash
npm test
# or
yarn test
```

## Changing the Entry Point

By default, the Expo project uses the entry point specified in [package.json](http://_vscodecontentref_/5) (`node_modules/expo/AppEntry.js`). If you wish to use a custom entry point (e.g., [App.tsx](http://_vscodecontentref_/6)), update the `"main"` field in [package.json](http://_vscodecontentref_/7) accordingly.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/my-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/my-feature`).
5. Open a pull request.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Your Name – [your.email@example.com](mailto:your.email@example.com)

Project Link: [https://github.com/yourusername/calorie-tracker](https://github.com/yourusername/calorie-tracker)


