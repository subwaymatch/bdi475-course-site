<img src="https://user-images.githubusercontent.com/1064036/131784194-5ef26a86-684b-4362-91fc-fa5dbcaf396e.png" alt="BDI 475" width="520" />

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/705f981145c54b278af0066fad01f505)](https://www.codacy.com/gh/subwaymatch/bdi475-course-site/dashboard?utm_source=github.com&utm_medium=referral&utm_content=subwaymatch/bdi475-course-site&utm_campaign=Badge_Grade)
[![DeepScan grade](https://deepscan.io/api/teams/10181/projects/15454/branches/308854/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=10181&pid=15454&bid=308854)

# Introduction to Data Analytics Applications in Business

This is a course site for UIUC's BDI 475 - Introduction to Data Analytics Applications in Business.

## Link to Spring 2021 Version

Spring 2021 deployment uses Firebase Auth and Firestore. The link here is only for an archival purpose.

[https://bdi475-course-site-fgr8lwjf7-subwaymatch.vercel.app/](https://bdi475-course-site-fgr8lwjf7-subwaymatch.vercel.app/)

## Preview (Development) and Production Branches

- `development` branch is used for all development activities. `development` branch can be viewed at [https://bdi475-course-site.vercel.app/](https://bdi475-course-site.vercel.app/).
- `main` branch points to the the production site ([https://bdi475.org](https://bdi475.org)). Any pushes to the `main` branch will trigger a deployment through Vercel.
- `production` branch is not used anymore.

## High-level Architecture

![bdi475_course_site_diagram](https://user-images.githubusercontent.com/1064036/131784149-649b5d86-a074-41ba-af66-f1a6f2489bcf.png)

## Changelogs

### Fall 2021

- Updated [Pyodide](https://github.com/pyodide/pyodide) to version `0.18` to support Safari and mobile browsers.

- Updated [Next.js](https://github.com/vercel/next.js/) to version `11.1` for `webpack` v5 support, faster builds, and web fonts optimizations.

- Updated [Bootstrap](https://getbootstrap.com/) to v5. No noticeable change other than a few breaking classnames.

- Switched all [Google Firebase](https://firebase.google.com) services (auth, firestore, functions) to [Supabase](https://supabase.io/) because:
  - Students in China could not use the site without using a VPN since Google services are blocked in China.
  - Firebase is proprietary. Supabase is open-source.
  - Pagination with Firestore is unnecessarily complicated.
  - Supabase uses Postgres as a backing database. This makes it easy to make joined queries.
  - Supabase provides a [type generator](https://supabase.io/docs/reference/javascript/generating-types) that works seamlessly with Typescript.

## Roadmap 🦜

These are features I'm looking to add.

- Multiple choice questions
- SQLite coding challenge support using [sql.js](https://github.com/sql-js/sql.js/)
- [MDX](https://mdxjs.com/) support
- Live polling feature

## Local development

Clone the repository and run the development server using one of the commands below:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Built with

![next-vercel-illustration](https://user-images.githubusercontent.com/1064036/89702608-860a2900-d908-11ea-83ad-aa228b4322ae.jpg)

This site is built with [Next.js](https://nextjs.org/) and is continuously deployed to [Vercel](https://vercel.com/).
