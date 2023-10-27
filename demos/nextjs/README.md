This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## How to test the library against nextjs demo
- in root of project, run `npm run test-lib-build` if you haven't already to generate the `g-loot-react-tournament-brackets-1.0.0.tar.gz` local package for testing
- `cd demos/nextjs`
- run `nvm use` or make sure you have the correct node version that's in `.nvmrc` for the directory 
- run `npm install`
- run the development server: with `npm run dev`
- everytime you make a change to the library you will need to re-run these steps
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
