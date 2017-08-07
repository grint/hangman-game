// This is the entry point for angular tests

import 'angular';
import 'angular-mocks/angular-mocks';

const context = require.context('./hangman', true, /\.js$/);

context.keys().forEach(context);