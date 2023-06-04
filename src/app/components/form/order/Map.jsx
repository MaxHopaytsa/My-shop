
import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useRef, memo, useCallback } from "react";

function MapComponent({ mapCenter, destination }) {
    const mapContainerRef = useRef(null);
    const directionsService = useRef(null);
    const directionsRenderer = useRef(null);
  
    useEffect(() => {
      const loader = new Loader({
        apiKey: "AIzaSyC_wTxFKELx15wlylpfHjsHBypc0ZvIpsg",
        version: "weekly",
        libraries: ['places','geometry']
      });
  
      loader.load().then(async () => {
        const { Map } = await google.maps.importLibrary("maps");
        const map = new Map(mapContainerRef.current, {
          center: mapCenter,
          zoom: 12,
        });
  
        directionsService.current = new google.maps.DirectionsService();
        directionsRenderer.current = new google.maps.DirectionsRenderer({
          map,
        });
        calculateAndDisplayRoute();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mapCenter, destination]);

    const calculateAndDisplayRoute = useCallback(() => {
        directionsService.current.route(
          {
            origin: mapCenter,
            destination: destination,
            travelMode: "DRIVING",
          },
          (response, status) => {
            if (status === "OK") {
              directionsRenderer.current.setDirections(response);
      
              const route = response.routes[0];
              const leg = route.legs[0];
              const distance = leg.distance.text;
              const duration = leg.duration.text;
      
              const map = directionsRenderer.current.getMap();
              const projection = map.getProjection();
              const polyline = directionsRenderer.current.getDirections().routes[0].overview_polyline;
      
              const decodedPath = google.maps.geometry.encoding.decodePath(polyline);
      
              const midpointIndex = Math.floor(decodedPath.length / 2);
              const midpoint = decodedPath[midpointIndex];
      
              const screenPosition = projection.fromLatLngToPoint(midpoint);
              const offset = new google.maps.Point(-20, -20);
      
              const textDiv = document.createElement("div");
              textDiv.textContent = `Відстань: ${distance}, Час: ${duration}`;
              textDiv.style.position = "absolute";
              textDiv.style.left = `${screenPosition.x + offset.x}px`;
              textDiv.style.top = `${screenPosition.y + offset.y}px`;
              textDiv.style.backgroundColor = "white";
              textDiv.style.padding = "5px";
              textDiv.style.border = "1px solid black";
      
              map.getDiv().appendChild(textDiv);
            } else {
              console.error("Помилка отримання маршруту:", status);
              throw new Error(`Error receiving a route: ${status}`);
            }
          }
        );
      },[destination, mapCenter]);
  
    return (
      <div className="mt-4 w-full xs:w-80 h-96 xs:h-80">
        <div ref={mapContainerRef} 
        className="w-full h-full"
        ></div>
      </div>
    );
  }

export default memo(MapComponent);