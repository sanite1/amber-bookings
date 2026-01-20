import api from "../network/api";
import { ApiError, ApiResponse } from "../network/axios";
import { UseQueryResult, useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { BookingDates, CourseApprovalPayload } from "../types/book-course";

export const sendApprovalMail = async (
  payload: CourseApprovalPayload
): Promise<ApiResponse<CourseApprovalPayload>> => {
  const res = await api.post<ApiResponse<CourseApprovalPayload>>(
    "/courses/bookings/approve",
    payload
  );
  return res;
};

export const useSendApprovalMail = () => {
  return useMutation<
    ApiResponse<CourseApprovalPayload>,
    ApiError,
    CourseApprovalPayload
  >({
    mutationFn: (payload) => sendApprovalMail(payload),
    onSuccess: (data) => {
      toast("Approval Sent Successfully", {
        description: data.message,
      });
    },
    onError: (error: ApiError) => {
      toast("Operation Failed", {
        description: error.response?.data?.message || "Something went wrong!",
      });
    },
  });
};

export const submitBooking = async (
  payload: CourseApprovalPayload
): Promise<ApiResponse<CourseApprovalPayload>> => {
  const res = await api.post<ApiResponse<CourseApprovalPayload>>(
    "/courses/book",
    payload
  );
  return res;
};

export const useSubmitBooking = () => {
  return useMutation<
    ApiResponse<CourseApprovalPayload>,
    ApiError,
    CourseApprovalPayload
  >({
    mutationFn: (payload) => submitBooking(payload),
    onSuccess: (data) => {
      toast("Booking Sent Successfully", {
        description: data.message,
      });
    },
    onError: (error: ApiError) => {
      toast("Operation Failed", {
        description: error.response?.data?.message || "Something went wrong!",
      });
    },
  });
};

// Function to fetch tutor details by ID

export const fetchBookingDates = async (): Promise<BookingDates> => {
  const res = await api.get<ApiResponse<BookingDates>>(
    `/courses/bookings/dates`
  );
  return res.data; // This already includes statusCode, message, data
};

export const useFetchBookingDates = (): UseQueryResult<
  BookingDates,
  ApiError
> => {
  return useQuery({
    queryKey: ["booking-dates"],
    queryFn: () => fetchBookingDates(),
  });
};
