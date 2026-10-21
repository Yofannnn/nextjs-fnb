"use client";

import { Map, AdvancedMarker, Pin, ColorScheme, APIProvider, Polyline } from "@vis.gl/react-google-maps";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { CheckoutSchemaType } from "@/features/order/schemas/order.schema";
import { FieldErrors, UseFormSetValue } from "react-hook-form";
import { useDeliveryLocationPicker } from "@/features/order/hooks/useDeliveryLocationPicker";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { useDeliveryLocationStore } from "@/features/order/stores/delivery-location.store";

interface DeliveryMapProps {
  setValue: UseFormSetValue<CheckoutSchemaType>;
  errors: FieldErrors<CheckoutSchemaType>;
}

export function DeliveryMap({ errors, setValue }: DeliveryMapProps) {
  const { theme } = useTheme();
  const { storeLocation, handleMapClick, handleMarkerDragEnd, inputRef } = useDeliveryLocationPicker();
  const deliveryLocation = useDeliveryLocationStore((state) => state.deliveryLocation);
  const clearDeliveryLocation = useDeliveryLocationStore((state) => state.clearDeliveryLocation);

  useEffect(() => {
    if (!deliveryLocation) return;

    setValue("deliveryAddress", deliveryLocation.address);
    setValue("deliveryLatitude", deliveryLocation.latitude);
    setValue("deliveryLongitude", deliveryLocation.longitude);
  }, [deliveryLocation, setValue]);

  const handleCancelSetDeliveryLocation = () => {
    setValue("deliveryAddress", undefined);
    setValue("deliveryLatitude", undefined);
    setValue("deliveryLongitude", undefined);

    clearDeliveryLocation();
  };

  return (
    <Drawer showSwipeHandle>
      <DrawerTrigger
        render={
          <Field>
            <FieldLabel htmlFor="deliveryLocation">Delivery location</FieldLabel>
            <Input
              id="deliveryLocation"
              value={deliveryLocation ? "Delivery location selected" : "Select delivery location"}
              className={deliveryLocation ? "text-green-500" : "text-red-600"}
              readOnly
            />
            <FieldError>{errors.deliveryAddress?.message}</FieldError>
            <FieldError>{errors.deliveryLongitude?.message}</FieldError>
            <FieldError>{errors.deliveryLatitude?.message}</FieldError>
          </Field>
        }
        nativeButton={false}
      />
      <DrawerContent className="flex h-[90svh] flex-col">
        <DrawerHeader>
          <Input type="text" ref={inputRef} placeholder="Search for a location" />
        </DrawerHeader>
        <div className="p-4 pb-16 lg:pb-12 flex-1 overflow-hidden">
          <p className="text-sm text-muted-foreground mb-4">
            Search for your address above. Dragging the pin or tapping the map moves the delivery point without updating the address text shown here.
          </p>
          <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
            <Map
              style={{ width: "100%", height: "100%" }}
              mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
              defaultCenter={deliveryLocation ? { lat: deliveryLocation.latitude, lng: deliveryLocation.longitude } : storeLocation}
              defaultZoom={18}
              mapTypeId="roadmap"
              colorScheme={theme === "dark" ? ColorScheme.DARK : ColorScheme.LIGHT}
              onClick={(e) => {
                if (!e.detail.latLng) return;
                handleMapClick(e.detail.latLng.lat, e.detail.latLng.lng);
              }}
            >
              <AdvancedMarker position={storeLocation} title={process.env.NEXT_PUBLIC_STORE_LOCATION_ADDRESS}>
                <Pin background={theme === "dark" ? "#FFF" : "#000"} borderColor={theme === "dark" ? "#000" : "#FFF"} glyphColor={theme === "dark" ? "#000" : "#FFF"} scale={1.5} />
              </AdvancedMarker>
              {deliveryLocation && (
                <>
                  <AdvancedMarker
                    draggable
                    position={{
                      lat: deliveryLocation.latitude,
                      lng: deliveryLocation.longitude,
                    }}
                    onDragEnd={(e) => {
                      if (!e.latLng) return;
                      handleMarkerDragEnd(e.latLng.lat(), e.latLng.lng());
                    }}
                  />
                  <Polyline
                    path={[
                      storeLocation,
                      {
                        lat: deliveryLocation.latitude,
                        lng: deliveryLocation.longitude,
                      },
                    ]}
                    strokeOpacity={0}
                    strokeColor={theme === "dark" ? "white" : "black"}
                    icons={[
                      {
                        icon: { path: "M 0,-1 0,1", strokeOpacity: 0.8, scale: 3 },
                        offset: "0",
                        repeat: "12px",
                      },
                    ]}
                  />
                </>
              )}
            </Map>
          </APIProvider>
        </div>
        <DrawerFooter>
          <DrawerClose
            render={
              <Button type="button" variant="outline" onClick={handleCancelSetDeliveryLocation}>
                Cancel
              </Button>
            }
          />
          <DrawerClose render={<Button type="button">Select</Button>} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
