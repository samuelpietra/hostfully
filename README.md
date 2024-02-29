<p align="center">
<img src="src/assets/full-logo.svg" width="400">
</p>

<p align="center">
Hostfully products give property managers the tools they need to automate operations, reach more customers, and deliver a 5-star guest experience.
</p>

---

<p align="center">
  <img alt="Yarn" src="https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white">
  &nbsp;
  <img alt="Node JS" src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white">
  &nbsp;
  <img alt="TypeScript" src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white">
  &nbsp;
  <img alt="React JS" src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB">
  &nbsp;
  <img alt="Vite JS" src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white">
</p>

## Table of Contents

- [Getting started](#getting-started)
- [Responsive design](#responsive-design)
- [File structure](#file-structure)
- [Contributors](#contributors)

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Cloning this repo

```bash
git clone https://github.com/samuelpietra/hostfully.git
```

### Prerequisites

- This project needs to run a local mock API with [Mockoon](https://mockoon.com/)
- A `.env.local` file is needed at root. Simply duplicate and rename `.env.example`
- Make sure to use at least **Node 18** and **Yarn 1.22.1** before proceeding

### Installing and running Mockoon

1. Download Mockoon ([here](https://mockoon.com/download/#download-section))
2. Install and open program
3. File -> Open environment
4. Choose `mockoon.json` at project's root
5. Click on Play icon to start server
   > It will be acessible via [localhost:3456](http://localhost:3123) or any other chosen port at .env.local file and Mockoon settings.

### Installing dependencies

```bash
yarn install
```

### Running this project

```bash
yarn dev
```

> It will be accessible via [localhost:3123](http://localhost:3123) as long as this port is available locally.

## Responsive design

This project works perfectly for both web and mobile uses. The layout is automatically defined according to the available screen width (minimum of `1110px` for web viewing).

## File structure

### Root files

Configuration contents such as dotfiles, plugins, scripts and some utils must be accessible from the project root.

```
├──📁 src
├──👾 .eslintrc
├──👾 package.json
```

### Source files

Our main divisions, separated by responsibilities within the project. May contain global files, like `testUtils.tsx`, that are used by different project resources.

```
├──📁 components
├──📁 pages
├──👾 testUtils.tsx
```

### Resources files

Each resource must contain a unique structure that brings together everything necessary for its correct functioning.

```
├──📁 components
│  ├──📁 Button
│  │  ├──📁 __tests__
│  │  │  └──👾 Button.test.tsx
│  │  ├──👾 Button.styles.ts
│  │  ├──👾 Button.tsx
│  │  └──👾 index.ts
├──📁 pages
```

### Shared files

Some files may share common content. To avoid repetitions in both uses, we declare the file globally within the parent directory.

```
├──📁 components
│  ├──📁 modals
│  │  ├──👾 success.ts
│  │  └──👾 failure.ts
│  ├──📁 AwesomeCustomModal
│  ├──📁 AnotherRandomModal
```

## Contributors

<table>
  <tr>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/samuelpietra" width="100px;" />
    </td>
  </tr>

  <td align="center">
    <a href="https://github.com/samuelpietra">
      <b>Samuel Pietra</b>
    </a>
  </td>
</table>
