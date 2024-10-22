## sveltekit-jsonserver-crud

## Pico CSS

### The Basics

The official Pico docs are not super clear on how to use it with SvelteKit. Here are the steps I took:

1. Install Pico via npm:

``` bash
npm i @picocss/pico
```

2. Add the main Pico stylesheet to `+layout.svelte`:

``` svelte
// +layout.svelte
<script lang=ts>
	import '@picocss/pico';
</script>

<slot />
```

3. Now, anytime you want to import another Pico stylesheet, you can do it in the `+layout.svelte` file via `@picocss`.

- `@picocss` is actually just the name of the folder in `node_modules`
- For example, the Pico docs [here](https://picocss.com/docs/version-picker) show how to change the theme color by importing a stylesheet via a normal link tag. But in SvelteKit, we instead do it in the `+layout.svelte`. 
- So `<link rel="stylesheet" href="css/pico.amber.min.css" />` would instead be the below:

``` svelte
// +layout.svelte
<script lang=ts>
	...
	import '@picocss/pico/css/pico.amber.min.css';
	...
</script>
```

### Customising Pico

You may want to customise Pico to get the most out of it (and the official docs actually recommend this - [Customization - Sass](https://picocss.com/docs/sass)).

In my case, I needed to adjust the `$semantic-root-element` SASS variable. This is because Pico automatically applies vertical padding to `header`, `main`, and `footer` elements, but only if they are direct children of the `body` element.

With SvelteKit, everything is contained in a `div` inside a `body` (in `app.html`), and SvelteKit recommends to keep it this way. This means we need to change the `$semantic-root-element` to this `div`. I have applied an id of `pico-root` to this `div` in `app.html`. Then took the following extra steps to override the default value of `$semantic-root-element`:

1. Created a new file `custom_pico.scss` in the `src/styles` folder with the following:

``` scss
// Using this file to override Pico's default $semantic-root-element
@use "../../node_modules/@picocss/pico/scss/index" with ($semantic-root-element: "div#pico-root"
)
```

2. Compiled the SCSS to CSS using the command `npm run build-css`. This is a custom script added to the `package.json` file.

``` json
//package.json
...
"scripts": {
	...
	"build-css": "sass src/styles/custom_pico.scss:src/styles/custom_pico.css --style compressed"
	...
}
...
```

3. Now we can run `npm run build-css` to compile the SCSS to CSS. This will create a new file in the `src/styles` folder called `custom_pico.css`. This file can now be imported into `+layout.svelte`. This will apply all the default Pico styles BUT will include our customisations. When you compile the `scss` file there will be a lot of deprecation warnings, but I have not encountered any issues due to these yet.
