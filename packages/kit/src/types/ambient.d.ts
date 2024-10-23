/**
 * It's possible to tell SvelteKit how to type objects inside your app by declaring the `App` namespace. By default, a new project will have a file called `src/app.d.ts` containing the following:
 *
 * ```ts
 * declare global {
 * 	namespace App {
 * 		// interface Error {}
 * 		// interface Locals {}
 * 		// interface PageData {}
 * 		// interface PageState {}
 * 		// interface Platform {}
 * 	}
 * }
 *
 * export {};
 * ```
 *
 * The `export {}` line exists because without it, the file would be treated as an _ambient module_ which prevents you from adding `import` declarations.
 * If you need to add ambient `declare module` declarations, do so in a separate file like `src/ambient.d.ts`.
 *
 * By populating these interfaces, you will gain type safety when using `event.locals`, `event.platform`, and `data` from `load` functions.
 */
declare namespace App {
	/**
	 * Defines the common shape of expected and unexpected errors. Expected errors are thrown using the `error` function. Unexpected errors are handled by the `handleError` hooks which should return this shape.
	 */
	export interface Error {
		message: string;
	}

	/**
	 * The interface that defines `event.locals`, which can be accessed in [hooks](https://svelte.dev/docs/kit/hooks) (`handle`, and `handleError`), server-only `load` functions, and `+server.js` files.
	 */
	export interface Locals {}

	/**
	 * Defines the common shape of the [$page.data store](https://svelte.dev/docs/kit/$app-stores#page) - that is, the data that is shared between all pages.
	 * The `Load` and `ServerLoad` functions in `./$types` will be narrowed accordingly.
	 * Use optional properties for data that is only present on specific pages. Do not add an index signature (`[key: string]: any`).
	 */
	export interface PageData {}

	/**
	 * The shape of the `$page.state` object, which can be manipulated using the [`pushState`](https://svelte.dev/docs/kit/$app-navigation#pushState) and [`replaceState`](https://svelte.dev/docs/kit/$app-navigation#replaceState) functions from `$app/navigation`.
	 */
	export interface PageState {}

	/**
	 * If your adapter provides [platform-specific context](https://svelte.dev/docs/kit/adapters#platform-specific-context) via `event.platform`, you can specify it here.
	 */
	export interface Platform {}
}

/**
 * This module is only available to [service workers](https://svelte.dev/docs/kit/service-workers).
 */
declare module '$service-worker' {
	/**
	 * The `base` path of the deployment. Typically this is equivalent to `config.kit.paths.base`, but it is calculated from `location.pathname` meaning that it will continue to work correctly if the site is deployed to a subdirectory.
	 * Note that there is a `base` but no `assets`, since service workers cannot be used if `config.kit.paths.assets` is specified.
	 */
	export const base: string;
	/**
	 * An array of URL strings representing the files generated by Vite, suitable for caching with `cache.addAll(build)`.
	 * During development, this is an empty array.
	 */
	export const build: string[];
	/**
	 * An array of URL strings representing the files in your static directory, or whatever directory is specified by `config.kit.files.assets`. You can customize which files are included from `static` directory using [`config.kit.serviceWorker.files`](https://svelte.dev/docs/kit/configuration)
	 */
	export const files: string[];
	/**
	 * An array of pathnames corresponding to prerendered pages and endpoints.
	 * During development, this is an empty array.
	 */
	export const prerendered: string[];
	/**
	 * See [`config.kit.version`](https://svelte.dev/docs/kit/configuration#version). It's useful for generating unique cache names inside your service worker, so that a later deployment of your app can invalidate old caches.
	 */
	export const version: string;
}
