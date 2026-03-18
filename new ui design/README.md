<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# PakTrack Vite Frontend

This is now the active frontend theme for the courier tracking platform. It uses the original Vite design and calls the local FastAPI backend directly for live courier tracking.

## Run locally

Prerequisites:
- Node.js
- Running FastAPI backend at `http://127.0.0.1:8000` or another configured URL

1. Install dependencies:
   `npm install`
2. Create `.env` from `.env.example`
3. Set:
   `VITE_API_BASE_URL=http://127.0.0.1:8000`
4. Run:
   `npm run dev`

## Notes

- Homepage is courier-selection only.
- Each courier has its own route such as `/tcs-tracking`, `/leopards-tracking`, and `/postex-tracking`.
- Single and bulk tracking are both wired to the FastAPI backend.
