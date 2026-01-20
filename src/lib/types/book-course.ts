export interface CourseApprovalPayload {
  course: {
    name: string;
    duration: string;
    mode: string;
    certification: string;
    price: string;
  };
  fullName: string;
  email: string;
  phone: string;
  organizationName: string;
  numberOfParticipants: string;
  locationPreference: string;
  preferredDates: {
    date: string;
    time: string;
  }[];
  gdprConsent: boolean;
  address: {
    street: string;
    city: string;
    state: string;
  };
}

export interface BookedDatesData {
  totalUniqueBookedDates: number;
  bookedDates: { date: string; times: string[] }[];
}

export interface BookingDates {
  data: BookedDatesData;
}
