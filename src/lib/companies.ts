export type RecognitionStatus = "Verified" | "In Progress" | "Not Yet Assessed";

export type Company = {
  id: string;
  name: string;
  country: string;
  platformType: string;
  assessmentScore: number;
  workerVoiceScore: number;
  status: RecognitionStatus;
};

export const sampleCompanies: Company[] = [
  {
    id: "swiftcourier",
    name: "SwiftCourier",
    country: "Kenya",
    platformType: "Delivery",
    assessmentScore: 82,
    workerVoiceScore: 74,
    status: "Verified",
  },
  {
    id: "ridewell",
    name: "RideWell",
    country: "Nigeria",
    platformType: "Ride-hailing",
    assessmentScore: 68,
    workerVoiceScore: 59,
    status: "In Progress",
  },
  {
    id: "taskbridge",
    name: "TaskBridge",
    country: "Philippines",
    platformType: "Microwork",
    assessmentScore: 77,
    workerVoiceScore: 81,
    status: "Verified",
  },
  {
    id: "homehelp",
    name: "HomeHelp Connect",
    country: "South Africa",
    platformType: "Domestic & care work",
    assessmentScore: 54,
    workerVoiceScore: 48,
    status: "In Progress",
  },
  {
    id: "cargoline",
    name: "Cargoline",
    country: "India",
    platformType: "Freight & logistics",
    assessmentScore: 0,
    workerVoiceScore: 0,
    status: "Not Yet Assessed",
  },
];
