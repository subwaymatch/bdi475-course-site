<img src="https://user-images.githubusercontent.com/1064036/131784194-5ef26a86-684b-4362-91fc-fa5dbcaf396e.png" alt="BDI 475" width="520" />

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/705f981145c54b278af0066fad01f505)](https://www.codacy.com/gh/subwaymatch/bdi475-course-site/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=subwaymatch/bdi475-course-site&amp;utm_campaign=Badge_Grade)
[![DeepScan grade](https://deepscan.io/api/teams/10181/projects/15454/branches/308854/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=10181&pid=15454&bid=308854)

Introduction to Data Analytics Applications in Business

This is a course site for UIUC's BDI 475 - Introduction to Data Analytics Applications in Business.

## Link to Spring 2021 Version

Spring 2021 deployment uses Firebase Auth and Firestore. The link here is only for an archival purpose.

[https://bdi475-course-site-fgr8lwjf7-subwaymatch.vercel.app/](https://bdi475-course-site-fgr8lwjf7-subwaymatch.vercel.app/)

## Preview (Development) and Production Branches

- `main` branch is used for all development activities. `main` branch can be viewed at [https://bdi475-course-site-git-main.subwaymatch.vercel.app/](https://bdi475-course-site-git-main.subwaymatch.vercel.app/).
- `production` is the branch that the course site ([https://bdi475.org](https://bdi475.org)) points to. Merging changes from `main` to `production` will automatically deploy all changes to the production site.

## High-level Architecture

![bdi475_course_site_diagram](https://user-images.githubusercontent.com/1064036/131784149-649b5d86-a074-41ba-af66-f1a6f2489bcf.png)

## Development

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
