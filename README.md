Tetris using React and Typescript

Follow basic logic for tetris: https://www.youtube.com/watch?v=ZGOaCxX8HIU

Deployed the server and client seperately on Vercel.
Must set DATABASE_URL, REACT_APP_URL, and REACT_APP_API_URL environmental variables

DATABASE_URL = Url of the Prisma database.
REACT_APP_API_URL = Url of the server (react-tetris-server).
REACT_APP_URL = Url of the client (react-tetris).

Future Features:
- Add Docker to spin up server and client
- Add better eslint file for server
- Allow starting at desired level
- Add websockets to make it 2 player game
- Add unit testing
- Add Sentry logging

