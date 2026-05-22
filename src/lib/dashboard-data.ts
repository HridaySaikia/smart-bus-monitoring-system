export const stats = [
  {
    title: "Bus Status",
    value: "Running",
    subtext: "Updated 1 min ago",
    status: "success",
  },
  {
    title: "Students Onboard",
    value: "28",
    subtext: "RFID count active",
    status: "info",
  },
  {
    title: "Emergency Status",
    value: "Normal",
    subtext: "No active trigger",
    status: "warning",
  },
  {
    title: "Device Health",
    value: "Stable",
    subtext: "All modules responding",
    status: "neutral",
  },
] as const;

export const recentAlerts = [
  {
    level: "Warning",
    message: "GPS signal temporarily weak",
    time: "10:24 AM",
    category: "GPS",
  },
  {
    level: "Info",
    message: "Routine emergency button test recorded",
    time: "10:27 AM",
    category: "Safety",
  },
  {
    level: "Success",
    message: "RFID module synced normally",
    time: "10:31 AM",
    category: "RFID",
  },
  {
    level: "Critical",
    message: "Abnormal motion spike detected by MPU6050",
    time: "10:34 AM",
    category: "Motion",
  },
] as const;

export const recentActivities = [
  {
    title: "RFID Scan Detected",
    detail: "Student ID 204 entered the bus",
    time: "10:10 AM",
  },
  {
    title: "GPS Updated",
    detail: "Location refreshed successfully",
    time: "10:12 AM",
  },
  {
    title: "MPU6050 Active",
    detail: "Motion sensor data received",
    time: "10:15 AM",
  },
] as const;

export const students = [
  {
    name: "Rahul Das",
    action: "Entered",
    time: "10:10 AM",
    status: "Onboard",
  },
  {
    name: "Ananya Bora",
    action: "Entered",
    time: "10:12 AM",
    status: "Onboard",
  },
  {
    name: "Riya Sharma",
    action: "Exited",
    time: "10:18 AM",
    status: "Dropped",
  },
  {
    name: "Aman Kalita",
    action: "Entered",
    time: "10:21 AM",
    status: "Onboard",
  },
] as const;

export const deviceStatuses = [
  {
    name: "ESP32 Controller",
    state: "Online",
    description: "Main controller is connected and sending heartbeat signals.",
    health: 98,
  },
  {
    name: "NEO-6M GPS Module",
    state: "Active",
    description: "Receiving and transmitting location coordinates normally.",
    health: 86,
  },
  {
    name: "MFRC522 RFID Reader",
    state: "Connected",
    description: "Reading RFID tags and forwarding scan logs successfully.",
    health: 93,
  },
  {
    name: "MPU6050 Motion Sensor",
    state: "Monitoring",
    description: "Tracking tilt, motion, and abnormal movement events.",
    health: 88,
  },
  {
    name: "OLED Display",
    state: "Operational",
    description: "Displaying local status feedback inside the device unit.",
    health: 91,
  },
  {
    name: "Emergency Button",
    state: "Standby",
    description: "Ready to trigger emergency alert event when pressed.",
    health: 100,
  },
] as const;

export const trackingSummary = {
  routeName: "Tezpur Main Route",
  currentLocation: "Near University Gate",
  latitude: 26.7091,
  longitude: 92.7845,
  speed: "34 km/h",
  nextStop: "Main Academic Block",
  eta: "6 min",
} as const;

export const analyticsData = [
  { time: "08:00", gps: 12, rfid: 5, alerts: 0 },
  { time: "09:00", gps: 18, rfid: 12, alerts: 1 },
  { time: "10:00", gps: 25, rfid: 18, alerts: 2 },
  { time: "11:00", gps: 30, rfid: 25, alerts: 1 },
  { time: "12:00", gps: 22, rfid: 16, alerts: 0 },
  { time: "13:00", gps: 28, rfid: 20, alerts: 1 },
] as const;

export const logsData = [
  {
    id: "LOG-001",
    type: "RFID",
    message: "Student Rahul Das entered the bus",
    time: "10:10 AM",
    severity: "Info",
  },
  {
    id: "LOG-002",
    type: "GPS",
    message: "Location refreshed near University Gate",
    time: "10:12 AM",
    severity: "Info",
  },
  {
    id: "LOG-003",
    type: "Motion",
    message: "Abnormal tilt spike detected",
    time: "10:18 AM",
    severity: "Warning",
  },
  {
    id: "LOG-004",
    type: "Emergency",
    message: "Emergency button test event received",
    time: "10:22 AM",
    severity: "Critical",
  },
  {
    id: "LOG-005",
    type: "Device",
    message: "ESP32 heartbeat received successfully",
    time: "10:25 AM",
    severity: "Success",
  },
] as const;