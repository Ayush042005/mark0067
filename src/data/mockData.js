export const stadiumCenter = { lat: 23.0900, lng: 72.5950 };

export const foodStalls = [
  { id: 'f1', name: 'Boundary Bites', emoji: '🍔', cuisine: 'Fast Food', distance: 50, waitTime: 8, crowdLevel: 0.6, isVeg: false, isOpen: true, menu: [{ name: 'Classic Burger', price: '$8' }, { name: 'Fries', price: '$4' }] },
  { id: 'f2', name: 'Curry Crease', emoji: '🍛', cuisine: 'Indian', distance: 120, waitTime: 15, crowdLevel: 0.8, isVeg: true, isOpen: true, menu: [{ name: 'Paneer Tikka Bowl', price: '$12' }, { name: 'Samosa Chat', price: '$6' }] },
  { id: 'f3', name: 'Sixer Sip', emoji: '🥤', cuisine: 'Drinks', distance: 30, waitTime: 2, crowdLevel: 0.2, isVeg: true, isOpen: true, menu: [{ name: 'Cold Coffee', price: '$5' }, { name: 'Fresh Lime Soda', price: '$3' }] },
  { id: 'f4', name: 'Healthy Pitch', emoji: '🥗', cuisine: 'Healthy', distance: 200, waitTime: 5, crowdLevel: 0.4, isVeg: true, isOpen: true, menu: [{ name: 'Quinoa Salad', price: '$10' }, { name: 'Fruit Bowl', price: '$7' }] },
  { id: 'f5', name: 'Pizza Pavilion', emoji: '🍕', cuisine: 'Italian', distance: 80, waitTime: 20, crowdLevel: 0.9, isVeg: false, isOpen: true, menu: [{ name: 'Margherita Slice', price: '$6' }, { name: 'Pepperoni Slice', price: '$7' }] },
  { id: 'f6', name: 'Sweet Sweep', emoji: '🍦', cuisine: 'Dessert', distance: 150, waitTime: 10, crowdLevel: 0.5, isVeg: true, isOpen: true, menu: [{ name: 'Vanilla Cone', price: '$4' }, { name: 'Chocolate Sundae', price: '$6' }] },
  { id: 'f7', name: 'Wok Wicket', emoji: '🍜', cuisine: 'Asian', distance: 250, waitTime: 12, crowdLevel: 0.6, isVeg: false, isOpen: true, menu: [{ name: 'Hakka Noodles', price: '$9' }, { name: 'Spring Rolls', price: '$5' }] },
  { id: 'f8', name: 'Chaat Corner', emoji: '🥟', cuisine: 'Indian Street Food', distance: 100, waitTime: 6, crowdLevel: 0.7, isVeg: true, isOpen: false, menu: [{ name: 'Pani Puri', price: '$4' }, { name: 'Bhel Puri', price: '$4' }] },
];

export const friends = [
  { id: 'fr1', name: 'Alex Johnson', initials: 'AJ', color: '#4F8EF7', section: 'A1', seat: '42', distanceMeters: 450, walkMins: 6 },
  { id: 'fr2', name: 'Sarah Miller', initials: 'SM', color: '#00E5A0', section: 'C3', seat: '12', distanceMeters: 120, walkMins: 2 },
  { id: 'fr3', name: 'Raj Patel', initials: 'RP', color: '#f59e0b', section: 'VIP Box', seat: '5', distanceMeters: 800, walkMins: 11 },
  { id: 'fr4', name: 'Emma Davis', initials: 'ED', color: '#ef4444', section: 'South Stand', seat: '105', distanceMeters: 300, walkMins: 4 },
  { id: 'fr5', name: 'Michael Chen', initials: 'MC', color: '#8b5cf6', section: 'B2', seat: '78', distanceMeters: 650, walkMins: 9 },
];

export const initialAlerts = [
  { id: 'a1', type: 'crowd', title: 'High Crowd Density', body: 'Gate E is experiencing heavy footfall. Consider Gate D.', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), isRead: false, severity: 'warning' },
  { id: 'a2', type: 'match', title: 'Toss Result', body: 'India won the toss and elected to bat first.', timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), isRead: true, severity: 'info' },
  { id: 'a3', type: 'gate', title: 'Gate C Open', body: 'Gate C is now completely open for entry.', timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), isRead: true, severity: 'info' },
  { id: 'a4', type: 'safety', title: 'Lost Item Found', body: 'A blue backpack was found near Section B.', timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), isRead: true, severity: 'info' },
];

function generatePoints(centerLat, centerLng, numPoints, radius) {
  const points = [];
  for (let i = 0; i < numPoints; i++) {
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * radius;
    points.push({
      lat: centerLat + distance * Math.cos(angle),
      lng: centerLng + distance * Math.sin(angle),
    });
  }
  return points;
}

export const pois = [
  { id: 'p1', type: 'gate', name: 'Main Gate A', lat: 23.0915, lng: 72.5950, floor: 'Ground', waitTime: 5, crowdLevel: 0.3 },
  { id: 'p2', type: 'gate', name: 'Gate C', lat: 23.0885, lng: 72.5950, floor: 'Ground', waitTime: 12, crowdLevel: 0.7 },
  { id: 'p3', type: 'washroom', name: 'Restroom North', lat: 23.0905, lng: 72.5960, floor: 'Concourse 1', waitTime: 2, crowdLevel: 0.2 },
  { id: 'p4', type: 'washroom', name: 'Restroom South', lat: 23.0895, lng: 72.5940, floor: 'Concourse 1', waitTime: 8, crowdLevel: 0.8 },
  { id: 'p5', type: 'medical', name: 'First Aid', lat: 23.0900, lng: 72.5965, floor: 'Ground', waitTime: 0, crowdLevel: 0.1 },
  { id: 'p6', type: 'parking', name: 'VIP Parking', lat: 23.0920, lng: 72.5930, floor: 'Basement', waitTime: 0, crowdLevel: 0.4 },
  { id: 'p7', type: 'parking', name: 'Public Parking P1', lat: 23.0880, lng: 72.5970, floor: 'Surface', waitTime: 15, crowdLevel: 0.9 },
  { id: 'p8', type: 'food', name: 'Food Court North', lat: 23.0908, lng: 72.5958, floor: 'Concourse 2', waitTime: 10, crowdLevel: 0.6 },
  { id: 'p9', type: 'food', name: 'Snacks Stand B', lat: 23.0892, lng: 72.5942, floor: 'Concourse 1', waitTime: 4, crowdLevel: 0.3 },
  { id: 'p10', type: 'gate', name: 'Gate E', lat: 23.0900, lng: 72.5935, floor: 'Ground', waitTime: 20, crowdLevel: 0.95 },
];

export const heatmapPointsData = generatePoints(stadiumCenter.lat, stadiumCenter.lng, 30, 0.0015).map(pt => ({
  ...pt,
  weight: Math.random() * 3
}));
