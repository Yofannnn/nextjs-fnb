import { AdvancedMarker, APIProvider, ColorScheme, Map, Pin, Polyline } from "@vis.gl/react-google-maps";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useState } from "react";
import { useDeliveryLocationPicker } from "@/features/order/hooks/useDeliveryLocationPicker";
import { DeliveryType } from "@/features/order/types/order.type";
import { cn } from "@/lib/class-name.util";
import { Location } from "@/lib/types/location.type";

interface OrderDeliveryLocationProps {
  deliveryType: DeliveryType;
  deliveryLocation: Location | null;
}

export function OrderDeliveryLocation({ deliveryType, deliveryLocation }: OrderDeliveryLocationProps) {
  const [openMap, setOpenMap] = useState(false);
  const { theme } = useTheme();
  const { storeLocation } = useDeliveryLocationPicker();

  console.log("deliveryLocation", deliveryLocation);
  console.log("deliveryType", deliveryType);

  if (deliveryType !== DeliveryType.DELIVERY || !deliveryLocation) return null;

  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <h4 className="font-semibold">Shipping Address</h4>
      </CardHeader>
      <CardContent className={cn(openMap ? "h-80" : "py-2", "px-4")}>
        {openMap ? (
          <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
            <Map
              style={{ width: "100%", height: "100%" }}
              mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
              defaultCenter={{ lat: deliveryLocation.latitude, lng: deliveryLocation.longitude }}
              defaultZoom={16}
              mapTypeId="roadmap"
              colorScheme={theme === "dark" ? ColorScheme.DARK : ColorScheme.LIGHT}
            >
              <AdvancedMarker position={storeLocation} title={process.env.NEXT_PUBLIC_STORE_LOCATION_ADDRESS}>
                <Pin background={theme === "dark" ? "#FFF" : "#000"} borderColor={theme === "dark" ? "#000" : "#FFF"} glyphColor={theme === "dark" ? "#000" : "#FFF"} scale={1.5} />
              </AdvancedMarker>
              <AdvancedMarker
                position={{
                  lat: deliveryLocation.latitude,
                  lng: deliveryLocation.longitude,
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
            </Map>
          </APIProvider>
        ) : (
          <Button variant="outline" size="sm" className="w-full" onClick={() => setOpenMap(true)}>
            Open Delivery Location
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
