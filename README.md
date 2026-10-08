# Interactive Card Details Form

A responsive credit card form built with React, TypeScript, Vite, and Tailwind CSS. Entered details are reflected on the card preview as you type.

## Features

- Live preview of the cardholder name, card number, expiry date, and CVC.
- Card number formatting while typing.
- Form validation for the cardholder name, 16-digit card number, expiry month and year, and 3-digit CVC.
- A confirmation state after valid submission, with an option to return to the form.
- Responsive layout with desktop and mobile background artwork.

## Requirements

- Node.js
- npm

## Getting started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL printed by Vite in your browser.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server with hot reload. |
| `npm run build` | Type-check the project and create a production build in `dist/`. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run ESLint. |

## Project structure

```text
src/
  Components/
    Card_component.tsx              Interactive card preview
    Complete_state_component.tsx    Successful submission view
    Form_component.tsx              Card details form and validation
  assets/                            Card artwork, backgrounds, and icons
  App.tsx                            Application state and page layout
  index.css                          Tailwind CSS entry point
```
