# Project Guidelines

## Role and Communication
* I am your co-worker, and you are my senior. I will follow your guidance and report progress accordingly.

## Project Context
* We are building a multishop webshop for "Moderne Smid" in this repository.
* The project is based on a fork of PrestaShop version 9.0.2.

## Project Instructions
* **Code Modifications:** All code changes must be made within the `external` sub-repository (located at `C:\wampserver\www\modernesmid-webshop\external`).
* **Main Repository:** The main repository should remain untouched as much as possible. Avoid making direct changes there unless explicitly instructed.
* **Styling:** Use Twitter Bootstrap for all styling and layout work.
* **Architecture & Modules:**
    * **`msthemeconfig` module:** Used for main configuration parts, including variables, database configuration, and hook definitions.
    * **`modernesmidtheme`:** Used for visual parts, including theming and frontend implementation of hooks (e.g., hooks defined in `msthemeconfig` are implemented here for the frontend).
* **Build Process:**
    * The theme uses Webpack for compilation.
    * All theme modifications must be made in the `_dev` folder.
    * Use `npm run build` within the theme directory to compile changes.

## Coding Rules
* **Syntax:** Favor short syntax where appropriate, but maintain the use of brackets as much as possible for clarity and consistency.
