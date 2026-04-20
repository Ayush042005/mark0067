import React, { useState, useEffect, useMemo, useRef } from 'react';
import { APIProvider, Map as GoogleMap, AdvancedMarker, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { stadiumCenter, pois, friends, heatmapPointsData } from '../data/mockData';
import { BottomSheet } from '../components/BottomSheet';
import './Map.css';

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: false,
  mapId: 'DEMO_MAP_ID_SMART_STADIUM',
};

// Heatmap feature component
const HeatmapLayer = ({ points }) => {
  const map = useMap();
  const visualization = useMapsLibrary('visualization');
  const heatmapRef = useRef(null);

  useEffect(() => {
    if (!visualization || !map) return;
    if (!heatmapRef.current) {
      const newHeatmap = new visualization.HeatmapLayer({
        data: [],
        radius: 25,
        opacity: 0.6,
        gradient: [
          "rgba(0, 255, 255, 0)",
          "rgba(0, 255, 255, 1)",
          "rgba(0, 191, 255, 1)",
          "rgba(0, 127, 255, 1)",
          "rgba(0, 63, 255, 1)",
          "rgba(0, 0, 255, 1)",
          "rgba(0, 0, 223, 1)",
          "rgba(0, 0, 191, 1)",
          "rgba(0, 0, 159, 1)",
          "rgba(0, 0, 127, 1)",
          "rgba(63, 0, 91, 1)",
          "rgba(127, 0, 63, 1)",
          "rgba(191, 0, 31, 1)",
          "rgba(255, 0, 0, 1)"
        ]
      });
      newHeatmap.setMap(map);
      heatmapRef.current = newHeatmap;
    }

    return () => {
      if (heatmapRef.current) {
        heatmapRef.current.setMap(null);
        heatmapRef.current = null;
      }
    };
  }, [visualization, map]);

  useEffect(() => {
    if (!heatmapRef.current) return;

    const data = points.map((p) => ({
      location: new window.google.maps.LatLng(p.lat, p.lng),
      weight: p.weight,
    }));
    heatmapRef.current.setData(data);
  }, [points]);

  return null;
};

// Directions component
const Directions = ({ origin, destination }) => {
  const map = useMap();
  const routesLibrary = useMapsLibrary('routes');
  const directionsServiceRef = useRef(null);
  const directionsRendererRef = useRef(null);

  useEffect(() => {
    if (!routesLibrary || !map) return;

    directionsServiceRef.current = new routesLibrary.DirectionsService();
    directionsRendererRef.current = new routesLibrary.DirectionsRenderer({ map });

    return () => {
      if (directionsRendererRef.current) {
        directionsRendererRef.current.setMap(null);
        directionsRendererRef.current = null;
      }
      directionsServiceRef.current = null;
    };
  }, [routesLibrary, map]);

  useEffect(() => {
    const directionsService = directionsServiceRef.current;
    const directionsRenderer = directionsRendererRef.current;
    if (!directionsService || !directionsRenderer || !origin || !destination) return;
    
    directionsService.route({
      origin: new window.google.maps.LatLng(origin.lat, origin.lng),
      destination: new window.google.maps.LatLng(destination.lat, destination.lng),
      travelMode: window.google.maps.TravelMode.WALKING,
    }).then(response => {
      directionsRenderer.setDirections(response);
    });
    
  }, [origin, destination]);

  return null;
}

export const Map = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_KEY;
  const [selectedPoi, setSelectedPoi] = useState(null);
  const [myLocation] = useState({ lat: 23.0880, lng: 72.5950 });
  const [navigationTarget, setNavigationTarget] = useState(null);
  const friendPositions = useMemo(
    () =>
      friends.map((friend, index) => ({
        ...friend,
        position: {
          lat: stadiumCenter.lat + (index % 2 === 0 ? 0.00045 : -0.00035) + index * 0.00008,
          lng: stadiumCenter.lng + (index % 2 === 0 ? -0.0003 : 0.00028) - index * 0.00005,
        },
      })),
    []
  );

  // Live heatmap updates
  const [liveHeatmap, setLiveHeatmap] = useState(heatmapPointsData);
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveHeatmap(prev => prev.map(pt => ({
        ...pt,
        weight: Math.random() * 3
      })));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const getIconForType = (type) => {
    switch (type) {
      case 'washroom': return 'wc';
      case 'food': return 'fastfood';
      case 'gate': return 'door_front';
      case 'medical': return 'medical_services';
      case 'parking': return 'local_parking';
      default: return 'place';
    }
  };

  const getMarkerColor = (type) => {
    switch(type) {
      case 'medical': return '#ef4444';
      case 'food': return '#f59e0b';
      case 'parking': return '#3b82f6';
      default: return '#10b981';
    }
  };

  if (!apiKey) {
    return (
      <div className="p-4 flex-col items-center justify-center p-8 text-center" style={{height: '100%'}}>
        <span className="material-symbols-outlined text-danger text-4xl mb-4">map</span>
        <h2 className="heading-2">Map Unavailable</h2>
        <p className="text-muted mt-2">VITE_GOOGLE_MAPS_KEY is missing from environment variables.</p>
      </div>
    );
  }

  return (
    <div className="map-container fade-in">
      <APIProvider apiKey={apiKey}>
        <GoogleMap
          defaultZoom={17}
          defaultCenter={stadiumCenter}
          {...mapOptions}
        >
          <HeatmapLayer points={liveHeatmap} />
          
          {/* User Location */}
          <AdvancedMarker position={myLocation}>
            <div className="user-marker animate-pulse-ring">
              <span className="material-symbols-outlined">person_pin_circle</span>
            </div>
          </AdvancedMarker>

          {/* Friends */}
          {friendPositions.map(friend => (
            <AdvancedMarker 
              key={friend.id} 
              position={friend.position}
              title={friend.name}
            >
              <div className="friend-marker" style={{backgroundColor: friend.color}}>
                {friend.initials}
              </div>
            </AdvancedMarker>
          ))}

          {/* POIs */}
          {pois.map(poi => (
            <AdvancedMarker 
              key={poi.id} 
              position={{ lat: poi.lat, lng: poi.lng }}
              onClick={() => setSelectedPoi(poi)}
            >
              <div className="poi-marker" style={{backgroundColor: getMarkerColor(poi.type)}}>
                <span className="material-symbols-outlined" style={{fontSize: 16}}>{getIconForType(poi.type)}</span>
              </div>
            </AdvancedMarker>
          ))}

          {/* Navigation Path */}
          {navigationTarget && <Directions origin={myLocation} destination={navigationTarget} />}
        </GoogleMap>
      </APIProvider>

      {/* Action panel floats over map */}
      <div className="map-toolbar">
        <button className="map-action-btn shadow-md bg-surface text-primary rounded-full">
          <span className="material-symbols-outlined" onClick={() => setNavigationTarget(null)}>my_location</span>
        </button>
      </div>

      <BottomSheet isOpen={!!selectedPoi} onClose={() => setSelectedPoi(null)} title={selectedPoi?.name}>
        {selectedPoi && (
          <div className="poi-details">
            <div className="flex items-center gap-2 mb-4 text-muted">
              <span className="material-symbols-outlined">{getIconForType(selectedPoi.type)}</span>
              <span style={{textTransform: 'capitalize'}}>{selectedPoi.type} • {selectedPoi.floor}</span>
            </div>
            
            <div className="grid-2 gap-4 mb-6">
              <div className="stat-card">
                 <span className="material-symbols-outlined text-info">schedule</span>
                 <div className="stat-info">
                   <span className="stat-value">{selectedPoi.waitTime} min</span>
                   <span className="stat-label">Wait Time</span>
                 </div>
              </div>
              <div className="stat-card">
                 <span className="material-symbols-outlined text-warning">groups</span>
                 <div className="stat-info">
                   <span className="stat-value">{Math.round(selectedPoi.crowdLevel * 100)}%</span>
                   <span className="stat-label">Crowd Level</span>
                 </div>
              </div>
            </div>

            <button 
              className="primary-btn full-width flex justify-center items-center gap-2"
              onClick={() => {
                setNavigationTarget({ lat: selectedPoi.lat, lng: selectedPoi.lng });
                setSelectedPoi(null);
              }}
            >
              <span className="material-symbols-outlined">directions_walk</span>
              Navigate Here
            </button>
          </div>
        )}
      </BottomSheet>
    </div>
  );
};
