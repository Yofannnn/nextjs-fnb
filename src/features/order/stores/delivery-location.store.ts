import { create } from "zustand";

export interface DeliveryLocation {
  address: string;
  latitude: number;
  longitude: number;
}

interface DeliveryLocationStore {
  deliveryLocation?: DeliveryLocation;
  setDeliveryLocation: (location: DeliveryLocation) => void;
  clearDeliveryLocation: () => void;
}

export const useDeliveryLocationStore = create<DeliveryLocationStore>((set) => ({
  deliveryLocation: undefined,

  setDeliveryLocation: (location) =>
    set({
      deliveryLocation: location,
    }),

  clearDeliveryLocation: () =>
    set({
      deliveryLocation: undefined,
    }),
}));
