# Color Game

This project was created as part of learning JavaScript.
A simple game based on the principle of finding the extra color.

Game rules:
Choose elements that differ in color from the rest in a limited time. You have 3 lives, losing which the game will end.

[Open the game](https://darmush.github.io/color-game/)

**Tasks:**
* writing [technical specifications](https://easy-frill-c84.notion.site/Color-Game-4854f3ae7aa4473c885d26b878eaadce?pvs=4),
* generation of playing field elements with random fill color,
* creating a countdown timer with the ability to pause it,
* limiting the number of unsuccessful attempts to select the correct element,
* implement an increase in game difficulty,
* saving and displaying achievements,
* dark and light themes.

**Tech Stack:**
* HTML/CSS
* JavaScript
* [TailWind CSS](https://tailwindcss.com/)
* [Webpack](https://webpack.js.org/)
* [Yarn](https://yarnpkg.com/)

## How to Install
You need to install **Node JS** and **Yarn** to run building the project.
You can download pre-built packages from the [Node.js](https://nodejs.org/en/) website for your operating system. Then you need to install Yarn

Install Yarn:
```sh
npm install -g yarn
```

Install dependencies:
```sh
yarn
```

## How to Run
Start server:
```sh
yarn run start
```

Run building the project:
```sh
yarn run build-dev
```
or
```sh
yarn run build-prod
```

Clean the project build folder:
```sh
yarn run clear
```
