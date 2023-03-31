## 0020230329

## 簡介

-   使用 react-route ( https://reactrouter.com/en/main )
-   使用 MUI ( https://mui.com/ ) UI framework
-   使用 https://crudapi.co.uk/help/api-docs API，{data_type} 使用 “task”
-   使用 Redux 管理全域資料
-   做出一個多頁面的 CRUD APP，能夠
    -   新增 task
    -   讀取所有 task
    -   編輯 task title 以及 completed
    -   刪除 task

## 備註

-   使用 Redux RTK query

## 快速下載啟動專案

### 1. 下載專案到本地

```bash
git clone git@github.com:YUN-RU-TSENG/0020230329.git
```

### 2. 請切換 Node、NPM 版本（Node、NPM 版本有標註在 `package.json`）

```bash
nvm use 18.5.0
```

## 3. 設置 `.env` 檔案

-   下載到本地端後，請依照 `.env.example` 格式設置以下數值
    -   `VITE_BASE_API_URL` 填入 API 網址 `https://crudapi.co.uk/api/v1/`
    -   `VITE_BASE_API_URL_AUTH_TOKEN` 填入 API token 數值 `[您的 token 數值]`

### 4. 啟動專案

```bash
npm i
npm run dev
```

![](https://i.imgur.com/bRQ28ZK.png)
![](https://i.imgur.com/bT8CLUa.png)
