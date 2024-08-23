
# Better Recs 🎶
Better Recs is aimed at giving music listeners an easy and more streamlined approach to finding new music. Streaming services give recommendations based on the music the user likes, however it is often limited and not always accurate. Better Recs takes the same algorithms and gives full control to the user.


## Features ✨
- Connect to your spotify account to get personalized recommendations
- Easy to use drag and drop functionality
- Save albums and have them instantly stored in your Spotify library
- Change search popularity to get recommended classics or hidden gems
- Create an account to keep your favorites albums in one place

## Installation
1. Clone the repo: `git clone https://github.com/Evan-Proulx/Better-Recs.git`
2. Navigate to the directory: `cd BetterRecs`
3. Install dependencies: `npm install`
4. Set up your Spotify API keys in `enviroment.ts` (see below for details)

## Spotify API Configuration
1. Create an app at the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications).
2. Set your Redirect URI to `http://localhost:4200/callback`
3. Copy the Client ID and Client Secret.
4. Add them to the `enviroment.ts` file in the root directory
5. Once the app is running, click on the Spotify logo in the bottom right. You will be prompted to sign in. Once signed in, you account will be connected and the app will be personalized to your music taste.

## Development server⚡️
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Contributing 🤝
Contributions are welcome! Please fork the repository and submit a pull request. For major changes, please open an issue to discuss what you would like to change.

## Authors

- [@Evan-Proulx](https://www.github.com/Evan-Proulx)


