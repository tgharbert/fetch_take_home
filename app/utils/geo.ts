export default function getBoundingBox(
  lat: number,
  lon: number,
  radius: number
): { minLat: number; maxLat: number; minLon: number; maxLon: number } {
  const R = 6371; // Earth's radius in km
  const toDeg = (radians: number) => (radians * 180) / Math.PI;

  const latOffset = toDeg(radius / R);
  const lonOffset = toDeg(radius / R / Math.cos((lat * Math.PI) / 180));

  return {
    minLat: lat - latOffset,
    maxLat: lat + latOffset,
    minLon: lon - lonOffset,
    maxLon: lon + lonOffset,
  };
}
