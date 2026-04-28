# WebReloader


## Introduction
This project can be used to hot-reload any static web application during the development stage. 
For example applications written with HTML, CSS & JS.
The hot-reload is inspired by [vite](https://vite.dev/) and implemented thanks to [BrowserSync](https://browsersync.io/).


## Requirements
You need to have [Node.js and NPM](https://nodejs.org/) installed on your pc. 
To make sure they are available run the following commands:
```shell
node --version
npm --version
```


## Installation
First some definitions.
1. **webreloader**: The directory containing the code in charge of the hot-reload locally. Aka this project.
2. **root**: The parent directory of the *webreloader* project locally.

### Using Git (recommended)
1. Open your console.
2. Navigate to the **root**.
	 ```shell
	 cd $root
	 ```
4. Download the repository by running the following commands:
	 ```shell
	 git clone https://github.com/tapmeppework/webreloader.git webreloader
   cd webreloader
   npm install
	 ```

### Manually
1. [Download the webreloader project as a .zip file](https://github.com/tapmeppework/webreloader/archive/refs/heads/main.zip).
2. Extract the .zip file. The result will be a single **non-empty** folder.
3. Rename the newly created folder to '**webreloader**'.
4. Move the folder *webreloader/* to the **root**. Meaning place it directly under the **root**.
5. Run the following commands:
	 ```shell
	 cd $root/webreloader
	 npm install
	 ```


## Architecture 

### $root/webreloader/template/
- `public/`: The directory where publicly available resources should reside: documents, fonts, images, videos, etc.
- `src/css`: The directory where the style should reside: *.css, *.less, *.sass, etc.
- `src/js`: The directory where the logic should reside: *.js, *.ts, etc.
- `src/pages`: The directory where the structure should reside: *.htm, *.html, etc.
- `src/pages/index.html`: The main page of the template.
- `src/pages/*.html`: Additional pages of the template.
- `src/pages/:language/`: The directory representing the various language of the template.
- `src/pages/en/`: The directory of default language.
- `favicon.(ico|png)`: The icon of the template.

### $root/webreloader/application/
This directory is made to contain your application to hot-reload. Its structure should be the same as the *template* directory.


## Start

### Default
To start the application, run the following command:
```shell
cd $root/webreloader
npm start
```
The webreloader will then open in your default web browser. As long as the main page is missing in the *application* directory (`src/pages/index.html`), the webreloader will open the *template* directory.

### Template
To explicitly start the template, run the following command:
```shell
cd $root/webreloader
npm start template
```

### Multilingualism
By default all changes of the files `src/pages/*.html` are copied to the English language folder `src/pages/en/*.html`. Also known as the **fallback folder**. 
To start the application with another fallback folder, run the following command:
```shell
cd $root/webreloader
npm start application :language
```
