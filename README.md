<div align="center">
  <img src="https://github.com/user-attachments/assets/ec28b252-d471-420e-a4e8-d297982f0571" alt="snapgram-logo" />
  <p>My own version of the original <a href="https://github.com/adrianhajdin/social_media_app">Snapgram</a> project by <a href="https://github.com/adrianhajdin">Adrian Hajdin</a></p>

</div>

##  Todo: New key Features developed by me
- [x] Integrated chat
- [x] Upload up to 10 multimedia contents per post
- [x] Improved UI with new layouts, components, interactions and animations
- [x] Online/offline status updated only at login/logout
- [x] Follow/unfollow users functionality
- [x] New Software Architecture
- [ ] Testing: Unit, Integration, End-to-End, Performance
- [ ] Dockerize the project for easier deployment
- [ ] Better Appwrite Authentication, email verification

## Table of Contents 📋

0. [Preview](#preview)
1. [The idea](#idea)
2. [Database Design](#database-design)
3. [The design](#the-design)
4. [The tools](#the-tools)
5. [Local Setup](#local-setup)
6. [Contacts](#contact)
7. [Links](#links)

## <a name="preview">Preview 👀</a>

### Login and Signup
![SCREEN-SIGN_UP](https://github.com/user-attachments/assets/de6c9906-c877-4953-8fd4-21283f66e2e7)

### Explore posts
![SCREEN-EXPLORE](https://github.com/user-attachments/assets/d1d9d04c-1d9c-492a-9411-7c224e7243c3)

### Create posts and search users
![SCREEN-CREATE_POSTS](https://github.com/user-attachments/assets/5b9b28e5-d778-4a91-a957-51d0d7736c16)
![SCREEN-PEOPLE](https://github.com/user-attachments/assets/61e00293-2d6e-4583-b6c1-31d859067a9f)

### Start chatting

![image](https://github.com/user-attachments/assets/8ca22f0a-cb53-4c77-ba3e-772ad408d8f7)

### Save your favourite posts
![SCREEN-SAVES](https://github.com/user-attachments/assets/7a66a0f8-911e-4617-9788-a02537f4125a)

## <a name="idea">The idea 💡</a>

This is so far the biggest project I've worked on by myself, besides the forums that have been very useful when I was confused, I've learned and reviewed a lot of concepts and technologies, **I hope you find it useful and learn something new from it too!**.

This project came up after finishing the video tutorial *[Build and Deploy a Full Stack Social Media App | React JS, Appwrite, Tailwind CSS, React Query](https://youtu.be/_W3R2VwRyF4?si=AqBk4i9-G28OfK0A)* After watching it, I continued with the second part of the tutorial on his blog *[JavaScript Mastery Blog
](https://www.jsmastery.pro/blog)*. In which I implemented many other features and had complications with others. Finally I tried to implement the original design *[made in Figma](https://www.figma.com/design/TGm6gNug6PEwEbV8M0Kyll/JSM-YT---Instagram-Clone?node-id=0-1)*.

## Database Design

Appwrite uses a mix between NOSQL and SQL databases. It uses document-based queries as minimum units of information.

> See more [here](https://appwrite.io/docs/products/databases/documents)

![DB Schema](/db_schema_modeling.png)

## <a name="the-design">The design 🎨</a>

The design was made by [Adrian Hajdin](https://www.youtube.com/channel/UCmXmlB4-HJytD7wek0Uo97A) and it's available on [Figma](https://www.figma.com/design/TGm6gNug6PEwEbV8M0Kyll/JSM-YT---Instagram-Clone?node-id=0-1). The design is very well done and I tried to implement it as best as I could, but I had some difficulties with the design, so I made my own designs :^).

## <a name="the-tools">The Tools 🛠</a>

Originally, the project was built using the following technologies:

### Frontend

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Query](https://tanstack.com/query/v5/)

### Design

- [Figma](https://www.figma.com/design/TGm6gNug6PEwEbV8M0Kyll/JSM-YT---Instagram-Clone?node-id=0-1)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn](https://ui.shadcn.com/)

### Backend

This project uses Backend as a Service (BaaS) for the backend. The BaaS provider used is [Appwrite](https://appwrite.io/).

## <a name="local-setup">Local Setup 👩‍💻</a>

Follow these steps to set up the project locally on your machine.

### Prerequisites

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en) v20.0.0 or higher
- A Node Package Manager such as [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/)

### Cloning the Repository

```bash
# Cloning via HTTPS
git clone https://github.com/Flavio-Ore/Snapgram-2.git
# Proyect dir
cd social_media_app
```

### Dependencies

Install the project dependencies using your preferred package manager:
  
```bash
  npm install
```

```bash
  yarn install
```

```bash
  pnpm install
```

### Set Up Environment Variables

Create a new file named `.env` in the root of your project and add the following env variables:

> [!NOTE]
> Consider using the [database schema]() to guide you.

```env
VITE_APPWRITE_PROJECT_ID=""
VITE_APPWRITE_ENDPOINT=""
VITE_APPWRITE_DATABASE=""
VITE_APPWRITE_STORAGE_POSTS_FILES=""
VITE_APPWRITE_STORAGE_PROFILE_IMAGES=""
VITE_APPWRITE_DATABASE_COLLECTION_SAVES_ID=""
VITE_APPWRITE_DATABASE_COLLECTION_USERS_ID=""
VITE_APPWRITE_DATABASE_COLLECTION_POSTS_ID=""
VITE_APPWRITE_DATABASE_COLLECTION_MESSAGES_ID=""
VITE_APPWRITE_DATABASE_COLLECTION_FOLLOWERS_ID=""
VITE_APPWRITE_DATABASE_COLLECTION_MESSAGE_ID=""
VITE_APPWRITE_DATABASE_COLLECTION_CHAT_MEMBER_ID=""
VITE_APPWRITE_DATABASE_COLLECTION_CHAT_ROOM_ID=""
```

Replace the placeholder values with your actual Appwrite credentials. You can obtain these credentials by signing up on the [Appwrite website](https://appwrite.io/).

### Running the Project

See the `package.json` file for the available scripts. You can run the project using the following commands:

```json
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint-standard": "standard && node main.tsx",
    "preview": "vite preview"
  }
```

Use the `"dev"` script to start the development server on your local machine:

```bash
  npm run dev
```

```bash
  yarn run dev
```

```bash
  pnpm run dev
```

Open [http://localhost:5173/](http://localhost:5173/) in your browser to view the project.

## <a name="contact">Contacts 📞</a>

If there's anything you'd like to add or change, please feel free to open an issue or a pull request. I'd love to hear your feedback and suggestions.

Also, you can contact me on discord, here's my user id: **ph4lanx** :)

## <a name="links">Links 🔗</a>

- Assets used in the project are [here](https://drive.google.com/file/d/13_7FofRAC3wARqPtAVPi53QNJJRd5RH_/view?usp=sharing)
