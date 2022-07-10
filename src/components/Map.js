import { useRef, useEffect, useState } from 'react';

const MINUTE = 60 * 1000;
const DAY = 24 * 60 * 1000;

function getFromCache(key) {
  const cached = localStorage.getItem(key);
  if (cached == null) {
    return null;
  }
  const { expiry, value } = JSON.parse(cached);
  if (expiry < Date.now()) {
    localStorage.removeItem(key);
    return null;
  }
  return value;
}

function setInCache(key, value, expiry) {
  localStorage.setItem(key, JSON.stringify({ expiry, value }));
}

function requestToKey(request) {
  const {
    keyword,
    location: { lat, lng },
    openNow,
    rankBy,
    type,
  } = request;
  return [keyword, lat.toFixed(4), lng.toFixed(4), openNow, rankBy, type].join('|');
}

/**
 * Cache the request result for a while.
 * For 'openNow' requests, cache until the next xx:00 or xx:30 time.
 * For requests that may be closed, cache for a day.
 */
function addRequestToCache(request, value) {
  const key = requestToKey(request);

  const now = Date.now();
  const expiry = request.openNow ? now - (now % (30 * MINUTE)) + 30 * MINUTE : now - (now % DAY) + DAY;

  setInCache(key, value, expiry);
}

function nearbySearchWithCache(mapObj, request, cb) {
  const cached = getFromCache(requestToKey(request));
  if (cached != null) {
    cb(cached);
    return;
  }

  const placesService = new window.google.maps.places.PlacesService(mapObj);
  placesService.nearbySearch(request, (results, status) => {
    if (status !== 'OK' || results.length === 0) {
      cb(null);
      addRequestToCache(request, null);
      return;
    }

    const {
      name,
      rating,
      user_ratings_total,
      geometry: { location },
    } = results[0];
    const result = {
      name,
      rating: user_ratings_total === 0 ? null : rating,
      lat: location.lat(),
      lng: location.lng(),
    };
    cb(result);
    addRequestToCache(request, result);
  });
}

export default function Map({
  center,
  zoom,
  setNearestLocation,
  keyword,
  currentLocation,
  openNow = true,
  rankBy = 'distance',
  placeType = 'food',
}) {
  const ref = useRef(null);
  const [mapObj, setMapObj] = useState(null);

  useEffect(() => {
    if (window.google?.maps?.Map == null) {
      console.log('Waiting for Google Maps API to load.');
      return;
    }
    if (ref.current == null) {
      console.log('ref.current is null');
      return;
    }
    if (mapObj != null) {
      return;
    }
    const map = new window.google.maps.Map(ref.current, {
      center,
      zoom,
      disableDefaultUI: true,
    });
    setMapObj(map);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, mapObj]);

  useEffect(() => {
    if (mapObj == null) {
      return;
    }
    mapObj.setCenter(center);
  }, [mapObj, center]);

  useEffect(() => {
    if (mapObj == null) {
      console.log('mapObj is null');
      return;
    }

    const request = {
      keyword,
      location: currentLocation,
      openNow,
      rankBy: rankBy === 'distance' ? window.google.maps.places.RankBy.DISTANCE : rankBy,
      type: placeType,
    };

    nearbySearchWithCache(mapObj, request, (result) => setNearestLocation(result));
  }, [mapObj, keyword, currentLocation, openNow, rankBy, placeType, setNearestLocation]);

  return <div ref={ref} id="map" className="w-full h-full" />;
}
