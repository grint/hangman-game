
## Hangman game

Hangman is a classic paper and pencil game.  One player thinks of a word or phrase; the others try to guess what it is one letter at a time.


### Game rules

If a player suggests a letter that occurs in the word, it will be filled in the blanks in the right places.

If the word does not contain the suggested letter, the number of user's lives will be descreased by 1 from 5 to 0 for each wrong choice. Also each wrong choice will be animated with drawing of body parts to the gallows.

The game continues until:
* the word/phrase is guessed (all letters are revealed) – WINNER or,
* all the parts of the hangman are displayed – LOSER

The final score will be calculated based on the rest user's lives: 10 * lives, and added to the total user's score.

![Game Screenshot](https://github.com/grint/hangman-game/blob/master/src/img/game_screenshot.png)

### Usage

**Make sure you have Node version >= 5.0 and NPM >= 3**

```bash
# Clone repository
git clone https://github.com/grint/hangman-game.git hangman-game
cd hangman-game

# Install the dependencies with npm
npm install

# Run server
npm start
```

**Go to [`http://localhost:8080`](http://localhost:8080) in your browser.**

### Development

```bash
# Build files
npm run build

# Generate static documentation
npm docs
```

## File Structure

```
hangman-game/
 ├──src/                           * Source files that will be compiled to javascript
 |   ├──app.js                     * Main entry file for the application
 │   │
 |   ├──index.html                 * Where index page and main HTML wrapper will be generated
 │   │
 |   ├──app.html                   * Placeholder for the content to load by UI-Router
 │   │
 │   components/                   * All components of the application
 │   │   ├──components.js          * Loads all needed components
 │   │   ├──component-name/        * Stores all files of a component
 │   │   ├────name.component.js    * Binds template and controller
 │   │   ├────name.controller.js   * Controller with constructor and methods of the component
 │   │   ├────name.pug             * Pug template of the component
 │   │   ├────name.js              * Generates module
 │   │   └────name.scss            * Component's specific stylesheets
 │   │
 │   common/                       * Shared parts used in multiple components
 │   │   common.js                 * Loads all parts
 │   │   └──component-name/        * Same components structure as in "components/"
 │   │
 │   ├──css/                       * All global stylesheets are served here
 │   ├──img/                       * Static images are served here
 │   └──scripts/                   * Static scripts are served here
 │
 ├──.babelrc                       * Version of JS to generate with Babel
 ├──postcss.config.js              * Settings for PostCSS package
 ├──package.json                   * What npm uses to manage it's dependencies
 └──webpack.config.js              * Webpack main configuration file
```

# Tech Stack

### Packaging & development

**Webpack 2**  
Module bundler  
Reference: [https://www.npmjs.com/package/webpack](https://www.npmjs.com/package/webpack)

**webpack-dev-server**  
Development server that provides live reloading.  
References:  
[https://www.npmjs.com/package/webpack-dev-server](https://www.npmjs.com/package/webpack-dev-server)  
[http://webpack.github.io/docs/configuration.html#devserver](http://webpack.github.io/docs/configuration.html#devserver)  
[http://webpack.github.io/docs/webpack-dev-server.html](http://webpack.github.io/docs/webpack-dev-server.html)


### JS

**Babel**  
Compiles ES6 and ES7 into ES5 code.  
References:  
[https://www.npmjs.com/package/babel-core](https://www.npmjs.com/package/babel-core)  
[https://www.npmjs.com/package/babel-loader](https://www.npmjs.com/package/babel-loader)  
[https://www.npmjs.com/package/babel-preset-es2015](https://www.npmjs.com/package/babel-preset-es2015)


### HTML

**raw-loader**  
Lets you import HTML as a string through JS.  
[https://github.com/webpack-contrib/raw-loader](https://github.com/webpack-contrib/raw-loader)  

**html-webpack-plugin**  
Renders index.html and injects all assets to it.  
Reference: [https://github.com/jantimon/html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)

**pug-html-loader**  
Renders html templates from pug  
Reference: [https://www.npmjs.com/package/pug-html-loader](https://www.npmjs.com/package/pug-html-loader)

**ngTable**  
Pagination, search and sorting for tables.  
Reference: [http://ng-table.com](http://ng-table.com)


### CSS

**node-sass + sass-loader**  
Loads a SASS/SCSS file and compiles it to CSS.  
Reference: [https://www.npmjs.com/package/node-sass](https://www.npmjs.com/package/node-sass)  
Reference: [https://www.npmjs.com/package/sass-loader](https://www.npmjs.com/package/sass-loader)

**css-loader**  
Allow loading css through JS.  
Reference: [https://www.npmjs.com/package/css-loader](https://www.npmjs.com/package/css-loader)

**autoprefixer**  
PostCSS plugin to parse CSS and add vendor prefixes to CSS rules using values from "Can I Use".  
Reference: [https://github.com/postcss/autoprefixer](https://github.com/postcss/autoprefixer)

**postcss-loader**  
Postprocess CSS with PostCSS plugins.  
Reference: [https://github.com/postcss/postcss-loader](https://github.com/postcss/postcss-loader)

**extract-text-webpack-plugin**  
Extracts CSS files in production builds.  
Reference: [https://github.com/webpack-contrib/extract-text-webpack-plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin)

**style-loader**  
Takes CSS and inserts it into the page via <style> tag.  
Reference: [https://github.com/webpack/style-loader](https://github.com/webpack/style-loader)


### Database

**LocalForage**  
Fast and simple storage library that lets to store data in asynchronous IndexedDB and WebSQL.  
References:  
[https://localforage.github.io/localForage](https://localforage.github.io/localForage)  
[https://github.com/ocombe/angular-localForage](https://github.com/ocombe/angular-localForage)



### Build

**Copy Webpack Plugin**  
Copies individual files or entire directories to the build directory.  
Reference: [https://github.com/kevlened/copy-webpack-plugin](https://github.com/kevlened/copy-webpack-plugin)

**file-loader**  
Copy assets files to output.  
Reference: [https://github.com/webpack/file-loader](https://github.com/webpack/file-loader)


### Documentation

**Markdown**  
Javascript Markdown to HTML converter  
Reference: [http://showdownjs.github.io/showdown](http://showdownjs.github.io/showdown)


## ToDo

* Add tests
* Words with dashed and phrases
* Hints
* Securely sign up and log in with password
* User account page with individual scores and data
* Include JS functions documentation to component docs
* Bug fixing
