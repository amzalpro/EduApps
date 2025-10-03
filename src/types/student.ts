/**
 * Types pour la gestion des élèves
 */

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  classRoom: string;
  photo?: string;
  
  // Informations personnelles
  address?: string;
  phone?: string;
  email?: string;
  
  // Parents/Tuteurs
  parents?: Parent[];
  
  // Protocoles spéciaux (PAI, PAP, etc.)
  protocols?: Protocol[];
  
  // Position dans le plan de classe
  seatPosition?: {
    row: number;
    column: number;
  };
}

export interface Parent {
  id: string;
  firstName: string;
  lastName: string;
  relationship: 'père' | 'mère' | 'tuteur' | 'autre';
  phone?: string;
  email?: string;
  address?: string;
}

export interface Protocol {
  id: string;
  type: 'PAI' | 'PAP' | 'PPS' | 'PPRE' | 'Autre';
  description: string;
  actions: string[];
  startDate: string;
  endDate?: string;
  documents?: string[];
}
