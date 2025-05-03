# Feature 6

Students: John Kapustka and Zach Vincent

Project Overview:
Website for easily uploading and sharing neural networks.

## Setup

Download and install the repository:

```
git clone git@github.com:zachvin/testify.git
cd testify
npm install
npm audit fix
npm run dev
```

The backend will run but will not function properly on another system because the Google Cloud and Kubernetes APIs require authentication, so model uploading/deleting will not work. However, the frontend is still functional, including submitting to neural networks.

```
cd backend
npm install
node server.js
```
