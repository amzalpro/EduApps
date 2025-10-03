import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import EduApp from './EduApp.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <EduApp />
  </StrictMode>
);
