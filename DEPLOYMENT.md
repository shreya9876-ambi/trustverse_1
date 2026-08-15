# TrustVerse Master Deployment Guide 🚀

This guide provides end-to-end instructions for deploying the **TrustVerse** multi-tier privacy-preserving credential issuance and zero-knowledge verification platform.

---

## 🏗 System Architecture Overview

TrustVerse consists of five main components:

| Component | Stack | Recommended Deployment Platform |
| :--- | :--- | :--- |
| **Frontend** | React 18 + Vite SPA | **Vercel** / **Netlify** |
| **Backend Service** | Java 21 + Spring Boot 3.3.2 | **Render** / **Railway** |
| **AI Forensic Service** | Python 3.10 + FastAPI | **Render** / **Railway** |
| **Database** | MongoDB 7+ | **MongoDB Atlas** (Free Tier) |
| **Blockchain** | Polygon Amoy Testnet | **Amoy Testnet RPC** |

---

## ⚡ Option 1: Multi-Cloud Free Tier Deployment (Recommended)

### Step 1: Set Up MongoDB Atlas (Database)

1. Sign up for a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new **M0 Shared Cluster** (Free tier).
3. Under **Database Access**, create a database user (e.g., `trustverse_admin`) with a secure password.
4. Under **Network Access**, add IP Access List entry `0.0.0.0/0` (Allows access from deployed cloud services).
5. Click **Connect** -> **Drivers** to get your connection string:
   ```text
   mongodb+srv://trustverse_admin:<password>@cluster0.mongodb.net/trustverse?retryWrites=true&w=majority
   ```

---

### Step 2: Deploy Smart Contract to Polygon Amoy

1. Ensure you have Amoy testnet MATIC in your deployment wallet (from [Polygon Amoy Faucet](https://faucet.polygon.technology/)).
2. Navigate to `blockchain/`:
   ```bash
   cd blockchain
   npm install
   ```
3. Set your deployment private key in `hardhat.config.js` or environment variable:
   ```bash
   export PRIVATE_KEY=0xYourPrivateKeyHere
   ```
4. Run deployment script:
   ```bash
   npx hardhat run scripts/deploy.js --network amoy
   ```
5. Copy the deployed contract address (e.g., `0x...`) for your backend configuration.

---

### Step 3: Deploy Python FastAPI AI Service (Render / Railway)

#### Deploying on Render:
1. Push your repository to GitHub.
2. Go to [Render Dashboard](https://dashboard.render.com/) -> **New Web Service**.
3. Connect your repository and set:
   - **Root Directory**: `ai-service`
   - **Environment**: `Docker` (or `Python 3`)
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Once deployed, note down your AI Service URL (e.g., `https://trustverse-ai-service.onrender.com`).

---

### Step 4: Deploy Spring Boot Backend (Render / Railway)

#### Deploying on Render:
1. In Render Dashboard, click **New Web Service**.
2. Connect your repository and set:
   - **Root Directory**: `backend`
   - **Environment**: `Docker` (Uses `backend/Dockerfile`)
3. Add Environment Variables:
   - `SPRING_DATA_MONGODB_URI`: `<Your MongoDB Atlas Connection String>`
   - `AI_SERVICE_URL`: `https://trustverse-ai-service.onrender.com`
   - `BLOCKCHAIN_RPC_URL`: `https://rpc-amoy.polygon.technology`
   - `BLOCKCHAIN_CONTRACT_ADDRESS`: `<Your Deployed Contract Address>`
   - `CORS_ALLOWED_ORIGINS`: `https://your-frontend-domain.vercel.app`
4. Deploy service and note down your Backend API URL (e.g., `https://trustverse-backend.onrender.com`).

---

### Step 5: Deploy React Vite Frontend (Vercel)

1. Go to [Vercel Dashboard](https://vercel.com/new).
2. Import your GitHub repository.
3. Select **Framework Preset**: `Vite`.
4. Set **Root Directory**: `frontend`.
5. Add Environment Variable:
   - `VITE_API_BASE_URL`: `https://trustverse-backend.onrender.com/api`
6. Click **Deploy**.
7. Update `CORS_ALLOWED_ORIGINS` in your deployed Backend environment variables with your new Vercel URL!

---

## 🐳 Option 2: Single-Command Docker Deployment

You can run the entire platform locally or on a single VPS (AWS EC2, DigitalOcean Droplet, Linode) using Docker Compose:

### 1. Prerequisite
- Installed [Docker](https://docs.docker.com/get-docker/) & [Docker Compose](https://docs.docker.com/compose/install/).

### 2. Build & Launch Containers
```bash
docker-compose up --build -d
```

### 3. Verify Running Services
```bash
docker-compose ps
```

- **Frontend App**: `http://localhost:5173` or `http://localhost:80`
- **Backend API**: `http://localhost:5000`
- **AI Service API**: `http://localhost:8000`
- **MongoDB**: `localhost:27017`

### 4. Stop Containers
```bash
docker-compose down
```

---

## ⚙️ Environment Variables Summary

| Variable Name | Description | Default / Example Value |
| :--- | :--- | :--- |
| `VITE_API_BASE_URL` | Frontend API Target | `https://trustverse-backend.onrender.com/api` |
| `SPRING_DATA_MONGODB_URI` | Backend Mongo Connection | `mongodb+srv://user:pass@cluster.mongodb.net/trustverse` |
| `AI_SERVICE_URL` | AI Service REST Endpoint | `https://trustverse-ai-service.onrender.com` |
| `BLOCKCHAIN_RPC_URL` | Polygon Amoy RPC Endpoint | `https://rpc-amoy.polygon.technology` |
| `BLOCKCHAIN_CONTRACT_ADDRESS` | Anchoring Smart Contract | `0x...` |
| `CORS_ALLOWED_ORIGINS` | Permitted Frontend Origins | `https://trustverse.vercel.app` |

---

## 🛠 Verification & Health Checks

- **AI Service**: `GET /` -> Returns `{"status": "ONLINE"}`.
- **Backend API**: `GET /api/schemas` -> Returns default schemas.
- **Frontend App**: Access home page and test issuing & verifying credentials.
