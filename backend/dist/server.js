"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const googleapis_1 = require("googleapis");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
const credentials = process.env.GOOGLE_APPLICATION_CREDENTIALS || '';
app.use((0, cors_1.default)());
const serviceAccountKeyPath = path_1.default.join(__dirname, credentials);
const serviceAccountKey = JSON.parse(fs_1.default.readFileSync(serviceAccountKeyPath, 'utf8'));
const auth = new googleapis_1.google.auth.GoogleAuth({
    credentials: serviceAccountKey,
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
});
const drive = googleapis_1.google.drive({ version: 'v3', auth });
const cache = {};
const cacheTTL = 5 * 60 * 1000; // 5 minutes
const lastCacheUpdate = {};
const getFilesAndFolders = (parentId) => __awaiter(void 0, void 0, void 0, function* () {
    if (cache[parentId] && (Date.now() - lastCacheUpdate[parentId] < cacheTTL)) {
        return cache[parentId];
    }
    const response = yield drive.files.list({
        q: `'${parentId}' in parents`,
        fields: 'files(id, name, mimeType, description, parents)', // Fetching description field
    });
    const items = (response.data.files || []).map(file => ({
        id: file.id || '',
        name: file.name || '',
        mimeType: file.mimeType || '',
        description: file.description || '',
        parents: file.parents || [],
    }));
    for (const item of items) {
        if (item.mimeType === 'application/vnd.google-apps.folder') {
            item.children = yield getFilesAndFolders(item.id);
        }
    }
    cache[parentId] = items;
    lastCacheUpdate[parentId] = Date.now();
    return items;
});
app.get('/api/files', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const folderId = process.env.FOLDER_ID;
        if (!folderId) {
            res.status(400).send('Folder ID is not defined.');
            return;
        }
        const filesAndFolders = yield getFilesAndFolders(folderId);
        res.json(filesAndFolders);
    }
    catch (error) {
        console.error('Error retrieving files:', error);
        res.status(500).send('Error retrieving files');
    }
}));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
