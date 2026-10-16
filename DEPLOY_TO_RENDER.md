# 🚀 How to Deploy PingPark to Render Cloud Server (100% Free)

PingPark is now configured and ready for 1-click cloud deployment on [Render](https://render.com).

---

### Step 1: Push Your Code to GitHub

1. Open a terminal in `E:\ParkPing`:
   ```bash
   git add -A
   git commit -m "Ready for Render deployment"
   ```

2. Create a new repository on [GitHub](https://github.com/new) named `PingPark` (or `parkping`).

3. Link and push your local code:
   ```bash
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/PingPark.git
   git branch -M main
   git push -u origin main
   ```

---

### Step 2: Deploy on Render (Free Tier)

1. Go to [Render Dashboard](https://dashboard.render.com/) and sign in (using your GitHub account).
2. Click the **"New +"** button in the top right and select **"Web Service"**.
3. Choose **"Build and deploy from a Git repository"** and click **Next**.
4. Select your **`PingPark`** repository from the list.
5. Fill in the deployment settings:

| Setting | Value |
| :--- | :--- |
| **Name** | `pingpark` (or your chosen name) |
| **Region** | `Oregon (US West)` or nearest region |
| **Branch** | `main` |
| **Root Directory** | *(leave blank)* |
| **Runtime** | `Node` |
| **Build Command** | `npm run render-build` |
| **Start Command** | `npm start` |
| **Instance Type** | **Free** ($0 / month) |

6. Scroll down to **Environment Variables** (Optional):
   - `NODE_ENV`: `production`
   - `NODE_VERSION`: `20.12.2`

7. Click **"Deploy Web Service"**!

---

### Step 3: Your Live Public App is Ready!

Render will build both the frontend and backend automatically. In ~2 minutes, your live URL will be active:
```text
https://pingpark.onrender.com
```

### What Works Automatically in the Cloud:
- **Instant Camera QR Scanning**: Anyone scanning the windshield sticker with an iPhone or Android phone camera will be routed directly to your live `https://pingpark.onrender.com` URL.
- **Direct Car Scan**: `https://pingpark.onrender.com/scan/PING-HR75B7892` opens the white Breeza alert experience directly.
- **Server-Sent Events (SSE)**: Real-time driver move alerts and replies work over cloud HTTPS.
- **Decal Studio**: Printable sticker generation and PNG decal downloads automatically encode your live public Render URL.
