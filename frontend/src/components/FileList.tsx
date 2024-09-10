import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardActions, Button, Typography, Grid, IconButton } from '@mui/material';
import { Description as FileIcon, Folder as FolderIcon } from '@mui/icons-material';
import { getFiles } from '../services/ApiService';
import '../styles/FileList.css';  

interface DriveItem {
  id: string;
  name: string;
  mimeType: string;
  description?: string;
  children?: DriveItem[];
}

const FileList: React.FC = () => {
  const [files, setFiles] = useState<DriveItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await getFiles();
        setFiles(response);
      } catch (err) {
        console.error('Error retrieving files:', err);
        setError('Error retrieving files');
      }
    };

    fetchFiles();
  }, []);

  const renderFilesAndFolders = (items: DriveItem[]) => {
    return items.map((item) => {
      return (
        <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}> {/* Responsive grid columns */}
          <Card className="file-card">
            <CardContent>
              <IconButton>
                {item.mimeType === 'application/vnd.google-apps.folder' ? <FolderIcon /> : <FileIcon />}
              </IconButton>
              <Typography variant="h6" className="file-title">{item.name}</Typography>
              <Typography variant="body2" color="textSecondary" className="file-description">
                {item.description || 'No description available'}
              </Typography>
            </CardContent>
            {item.mimeType !== 'application/vnd.google-apps.folder' && (
              <CardActions>
                <Button
                  href={`${process.env.REACT_APP_API_URL}/files/download/${item.id}`}
                  className="download-button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download
                </Button>
              </CardActions>
            )}
          </Card>
        </Grid>
      );
    });
  };

  if (error) {
    return <Typography variant="body1" color="error">{error}</Typography>;
  }

  return (
    <Grid container spacing={3} className="file-grid">
      {renderFilesAndFolders(files)}
    </Grid>
  );
};

export default FileList;





