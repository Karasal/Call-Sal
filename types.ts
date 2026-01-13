import React from 'react';

export interface ExampleItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface ServiceDetail {
  id: string;
  title: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  examples: ExampleItem[];
  icon: React.ReactNode;
}

export interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
  onConfigure: () => void;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface SectionProps {
  id?: string;
}

// NEW MANAGEMENT TYPES
export type UserRole = 'client' | 'admin';
export type MeetingType = 'zoom' | 'phone' | 'in-person';

export interface User {
  id: string;
  email?: string;
  password?: string;
  name: string;
  role: UserRole;
  businessName?: string;
  phone?: string;
  website?: string;
  avatar?: string;
  registrationKey?: string; // Persistent key given by admin
  isRegistered: boolean;    // Whether the user has finalized their account
  verified?: boolean;       // For security status
}

export interface Booking {
  id: string;
  userId: string;
  userName: string;
  date: string; // ISO string
  time: string; // e.g., "09:30"
  type: MeetingType;
  duration: number; // minutes
  status: 'confirmed' | 'cancelled' | 'completed';
}

export interface ProjectLog {
  id: string;
  clientId: string;
  date: string;
  title: string;
  update: string;
  progress: number; // 0-100
}

export interface Invoice {
  id: string;
  clientId: string;
  amount: number;
  description: string;
  status: 'pending' | 'paid';
  date: string;
}