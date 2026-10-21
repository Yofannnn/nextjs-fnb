"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useDeliveryLocationStore } from "@/features/order/stores/delivery-location.store";

const ADDRESS_UNAVAILABLE_LABEL = "Address unavailable — please confirm pin location";

export function useDeliveryLocationPicker() {
  const places = useMapsLibrary("places");

  const inputRef = useRef<HTMLInputElement>(null);

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const setDeliveryLocation = useDeliveryLocationStore((state) => state.setDeliveryLocation);

  useEffect(() => {
    if (!places || !inputRef.current) return;

    autocompleteRef.current = new places.Autocomplete(inputRef.current, {
      fields: ["formatted_address", "geometry"],
      componentRestrictions: {
        country: "id",
      },
      types: ["address"],
    });

    const listener = autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current?.getPlace();

      if (!place?.geometry?.location) return;

      setDeliveryLocation({
        address: place.formatted_address ?? "",
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng(),
      });
    });

    return () => {
      google.maps.event.removeListener(listener);
    };
  }, [places, setDeliveryLocation]);

  const updateCoordinates = useCallback(
    (latitude: number, longitude: number) => {
      setDeliveryLocation({
        address: ADDRESS_UNAVAILABLE_LABEL,
        latitude,
        longitude,
      });
    },
    [setDeliveryLocation],
  );

  const storeLocation = useMemo(
    () => ({
      lat: Number(process.env.NEXT_PUBLIC_STORE_LOCATION_LATITUDE),
      lng: Number(process.env.NEXT_PUBLIC_STORE_LOCATION_LONGITUDE),
    }),
    [],
  );

  return {
    inputRef,
    storeLocation,
    handleMapClick: updateCoordinates,
    handleMarkerDragEnd: updateCoordinates,
  };
}
