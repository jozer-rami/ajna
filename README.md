## This template provides a minimal setup to get Next.js working with MiniKit

## Setup

```bash
cp .env.example .env
pnpm i
pnpm dev

```

To run as a mini app choose a production app in the dev portal and use NGROK to tunnel. Set the `NEXTAUTH_URL` and the redirect url if using sign in with worldcoin to that ngrok url

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To use the application, you'll need to:

1. **Get World ID Credentials**
   From the [World ID Developer Portal](https://developer.worldcoin.org/):

   - Create a new app to get your `APP_ID`
   - Get `DEV_PORTAL_API_KEY` from the API Keys section
   - Request a Blockscout Merits API key and set `MERITS_API_KEY`
   - Navigate to "Sign in with World ID" page to get:
     - `WLD_CLIENT_ID`
     - `WLD_CLIENT_SECRET`

2. **Configure Action**
   - In the Developer Portal, create an action in the "Incognito Actions" section
   - Use the same action name in `components/VerifyButton.tsx`

### Background animation
Place your optimized MP4 file at `public/background.mp4`. A placeholder file is included in this repository; replace it with your own video to display it as the home page background.

View docs: [Docs](https://docs.world.org/)

[Developer Portal](https://developer.worldcoin.org/)
# ajna
