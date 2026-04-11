# WebReloader


## Introduction
This project can be used to hot-reload any non static web application during the development stage. For example applications written with HTML, CSS & JS.
The hot-reload is inspired by [vite](https://vite.dev/) and implemented thanks to [BrowserSync](https://browsersync.io/).


## Requirements
You need to have [Node.js and NPM](https://nodejs.org/) installed on your pc. To make sure they are available run the following commands:
```ps
$ node --version
$ npm --version
```
Once done navigate to the directory containing the project and install the remaining modules with the following commands:
```ps
$ cd __PATH_TO_PROJECT__
$ npm install
```


## Installation
First some definitions.
1. **root**: The root directory of the web application locally.
2. **webreloader**: The directory containing the code in charge of the hot-reload. Aka this project.

### Using Git (recommended)
1. Open your console.
2. Navigate to the **root**.
	 ```shell
	 cd $root
	 ```
4. Download the repository by running the following commands:
	 ```shell
	 git clone https://github.com/tapmeppe/webreloader.git webreloader
   cd webreloader
   npm install
	 ```

### Manually
1. [Download the webreloader project as a .zip file](https://github.com/tapmeppe/webreloader/archive/refs/heads/main.zip).
2. Extract the .zip file. The result will be a single **non-empty** folder.
3. Rename the newly created folder to '**webreloader**'.
4. Move the folder *webreloader/* to the **root**. Meaning place it directly under the **root**.
5. Run the following commands:
	 ```shell
	 cd $root/webreloader
	 npm install
	 ```


## Architecture of `$root/webreloader/`
- `public/`: The directory where publicly available resourcess should reside: documents, fonts, images, videos, etc.
- `src/css`: The directory where the style should reside: *.css, *.less, *.sass, etc.
- `src/js`: The directory where the logic should reside: *.js, *.ts, etc.
- `src/pages`: The directory where the stucture should reside: *.htm, *.html, etc.


## Start
To start the application, run the following command:
```ps
cd $root/webreloader
npm start
```
The application will then open in your default web browser.
