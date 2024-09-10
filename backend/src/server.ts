import express from 'express';
import { google } from 'googleapis';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const credentials = process.env.GOOGLE_APPLICATION_CREDENTIALS || '';

app.use(cors());

const serviceAccountKeyPath = path.join(__dirname, credentials);
const serviceAccountKey = JSON.parse(fs.readFileSync(serviceAccountKeyPath, 'utf8'));

const auth = new google.auth.GoogleAuth({
  credentials: serviceAccountKey,
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
});

const drive = google.drive({ version: 'v3', auth });

interface DriveItem {
  id: string;
  name: string;
  mimeType: string;
  description?: string; // Added description field
  parents?: string[];
  children?: DriveItem[];
}

const cache: { [key: string]: DriveItem[] } = {};
const cacheTTL = 5 * 60 * 1000; // 5 minutes
const lastCacheUpdate: { [key: string]: number } = {};

const getFilesAndFolders = async (parentId: string): Promise<DriveItem[]> => {
  if (cache[parentId] && (Date.now() - lastCacheUpdate[parentId] < cacheTTL)) {
    return cache[parentId];
  }

  const response = await drive.files.list({
    q: `'${parentId}' in parents`,
    fields: 'files(id, name, mimeType, description, parents)', // Fetching description field
  });

  const items: DriveItem[] = (response.data.files || []).map(file => ({
    id: file.id || '',
    name: file.name || '',
    mimeType: file.mimeType || '',
    description: file.description || '', // Mapping description
    parents: file.parents || [],
  }));

  for (const item of items) {
    if (item.mimeType === 'application/vnd.google-apps.folder') {
      item.children = await getFilesAndFolders(item.id);
    }
  }

  cache[parentId] = items;
  lastCacheUpdate[parentId] = Date.now();
  return items;
};

app.get('/api/files', async (req, res) => {
  try {
    const folderId = process.env.FOLDER_ID;

    if (!folderId) {
      res.status(400).send('Folder ID is not defined.');
      return;
    }

    const filesAndFolders = await getFilesAndFolders(folderId);
    res.json(filesAndFolders);
  } catch (error) {
    console.error('Error retrieving files:', error);
    res.status(500).send('Error retrieving files');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


















