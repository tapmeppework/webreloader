// @ts-check
process.argv.shift() // Remove the node executable file path.
process.argv.shift() // Remove the script file path.

const
	browserSync = require('browser-sync').create(),
	fs = require('fs'),
	path = require('path'),
	// ...
	base = process.argv.shift() || (fs.existsSync(`${__dirname}/src/application/pages/index.html`) ? 'application' : 'template'),
	language = process.argv.shift() || 'en',
	root = path.resolve(__dirname, base).replace(/\\/g, '/'),
	src = 'src',
	pages = `${src}/pages`,
	fallback = `${pages}/${language}`,
	start = `${pages}/index.html`

/**
 * This function is used to copy a file from the page folder to the fallback folder.
 * @param {string} filename
 * @returns 
 */
const copy = (filename) => {
	const
		source = `${pages}/${filename}`,
		target = `${fallback}/${filename}`
	return fs.copyFile(`${root}/${source}`, `${root}/${target}`, error => {
		if (error) console.error(
			`ERROR: '${base}/${source}' could not be copied to '${base}/${target}'.`,
			error instanceof Error ? error.message : error
		); else console.log(`'${base}/${source}' was copied to '${base}/${target}'.`)
	})
}

// Create the fallback directory if necessary
if (fs.existsSync(`${root}/${fallback}`)) console.log(`The fallback directory '${base}/${fallback}/' already exists.`)
else fs.mkdir(
	`${root}/${fallback}`,
	{ recursive: true }, error => {
		if (error) console.error(
			`ERROR: The fallback directory '${base}/${fallback}/' could not be created.`,
			error instanceof Error ? error.message : error
		); else console.log(`The fallback directory '${base}/${fallback}/' has been created.`)
	}
)

// Synchronise the main folder with the fallback folder. Meaning the folder representing the default language.
const resources = {
	pages: fs.readdirSync(`${root}/${pages}`, { withFileTypes: true }),
	fallback: fs.readdirSync(`${root}/${fallback}`, { withFileTypes: true }),
}
for (const resource of resources.pages) if (resource.isFile()) copy(resource.name)
for (const resource of resources.fallback) if (resource.isFile() && !fs.existsSync(`${root}/${pages}/${resource.name}`)) {
	fs.unlinkSync(`${root}/${fallback}/${resource.name}`) // delete phantom files
	console.log(`The fallback file '${base}/${fallback}/${resource.name}' was deleted.`)
}

/**
 * Watch the pages/ folder for changes to synchronise with the fallback/ folder.
 * @see https://nodejs.org/docs/latest/api/fs.html#fswatchfilename-options-listener
 * 
 * @type {NodeJS.Timeout | undefined} Property used to throttle the number of changes.
 */
let timeout = undefined
fs.watch(
	`${root}/${pages}`,
	(event, filename) => {
		if (filename && fs.lstatSync(`${root}/${pages}/${filename}`).isFile()) {
			clearTimeout(timeout)	// Reset the timeout to prevent unnecessary changes.
			timeout = setTimeout(
				(event, filename) => {
					if (event == 'change' || fs.existsSync(`${root}/${pages}/${filename}`)) copy(filename) // existing or new file
					else if (fs.existsSync(`${root}/${fallback}/${filename}`)) {
						fs.unlinkSync(`${root}/${fallback}/${filename}`) // deleted file
						console.log(`The fallback file '${base}/${fallback}/${filename}' was deleted.`)
					}
				},
				1000,
				event, filename
			)
		}
	}
)

/**
 * Serve files from the $base folder and automatically watch for html/css/js changes.
 * @see https://browsersync.io/
 * @see https://browsersync.io/docs
 * @see https://browsersync.io/docs/options
 */
browserSync.init({
	watch: true,
	serveStatic: [base, `${base}/public`, `${base}/${src}`, `${base}/${pages}`],
	server: {
		baseDir: base,
		index: start,
	},
	// files: [
	// 	// '**/*.*',
	// 	'**/*.css',
	// 	'**/*.gif',
	// 	'**/*.htm',
	// 	'**/*.html',
	// 	'**/*.inc',
	// 	'**/*.jpeg',
	// 	'**/*.jpg',
	// 	'**/*.js',
	// 	'**/*.json',
	// 	'**/*.mp3',
	// 	'**/*.mp4',
	// 	'**/*.php',
	// 	'**/*.png',
	// 	'**/*.svg',
	// 	'**/*.webp',
	// 	// '!*.css.map',
	// 	// '!*.less',
	// 	// '!*.log',
	// 	// '!*.sass',
	// 	// '!*.scss',
	// 	// '!*.sql',
	// 	// '!*.ts',
	// ],
	ignore: [
		'.vscode/**',
		'builds/**',
		'node_modules/**',
		'package.*json',
		'starter*.js',
		'*.md',
		'*.less',
		'*.css.map',
	],
	// port: 9013, // Using a custom port leads to an unpleasant delay between switches
	// cwd: '.',
	logPrefix: 'WebReloader',
	// reloadDelay: delay * 2,
	// startPath: ''
	// localOnly: true,
})
// browserSync.watch(['**/*.*'], { ignored: '*.less' })