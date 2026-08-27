/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Service {
  id: string;
  title: string;
  iconName: string;
  image: string;
  shortDesc: string;
  longDesc: string;
  features: string[];
  rdsoSpec: string;
  steelGrade: string;
}

export interface Project {
  id: string;
  title: string;
  type: string;
  span: string;
  year: string;
  location: string;
  image: string;
  imageGroup: string[];
  scope: string[];
  weight: string;
  columns?: string;
  contractValue?: string;
}

export interface Career {
  id: string;
  title: string;
  department: string;
  experience: string;
  location: string;
  description: string;
  requirements: string[];
}

export interface QuoteEstimate {
  span: number; // in meters (e.g. 30, 45, 60)
  tracks: number; // e.g. 2, 4, 6
  width: number; // walkway width in meters (e.g. 3, 4.8, 6)
  girderType: 'truss' | 'bowstring' | 'plate';
  staircases: number;
  ramps: number;
  escalators: number;
  roofType: 'tin' | 'polycarbonate' | 'standing_seam';
  safetyWindZone: 'II' | 'III' | 'IV' | 'V';
  elevationOption: boolean;
}
