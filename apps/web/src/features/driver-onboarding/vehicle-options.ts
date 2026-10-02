import type { VehicleOptionData } from './types/vehicle.types';

export const carBrands = ['Toyota', 'Honda', 'Hyundai', 'Kia', 'Nissan'] as const;
export const carColors = ['Black', 'White', 'Silver', 'Gray', 'Blue'] as const;

export const vehicleOptions: VehicleOptionData[] = [
  {
    id: 'SEDAN',
    label: 'Sedan',
    description: 'Comfortable and reliable',
    imageSrc: '/images/sedan.webp',
  },
  {
    id: 'SUV',
    label: 'SUV',
    description: 'Spacious and versatile',
    imageSrc: '/images/suv.webp',
  },
  {
    id: 'HATCHBACK',
    label: 'Hatchback',
    description: 'Compact and efficient',
    imageSrc: '/images/hatchback.webp',
  },
];
