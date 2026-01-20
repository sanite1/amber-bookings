import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  ChevronRight,
  Clock,
  Award,
  Users,
  Phone,
  Mail,
  Loader2,
  CheckCircle,
  Calendar as CalendarIcon,
  X,
} from "lucide-react";
import { trainings } from "../data/firstaidCourses";
import { DateTimePickerDialog } from "../components/Course/DateTimePickerDialog";
import { useSubmitBooking } from "../lib/api/book-course";
import { CourseApprovalPayload } from "../lib/types/book-course";

const formSchema = z
  .object({
    course: z.object({
      name: z.string(),
      duration: z.string(),
      certification: z.string(),
      price: z.string(),
    }),
    fullName: z
      .string()
      .min(3, { message: "Name must be at least 3 characters" }),
    email: z.string().email("Invalid email address"),
    phone: z
      .string()
      .min(7, { message: "Phone number must be at least 7 characters" })
      .max(20, { message: "Phone number can't be more than 20 characters" }),
    organizationName: z.string().optional(),
    numberOfParticipants: z.string(),
    locationPreference: z.string(),
    gdprConsent: z.boolean().refine((val) => val === true, {
      message: "You must agree to GDPR consent",
    }),
    address: z
      .object({
        street: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
      })
      .optional(),
    preferredDates: z
      .array(
        z.object({
          date: z.string(),
          time: z.string(),
        })
      )
      .min(1, { message: "At least 1 date and time must be selected" }),
  })
  .superRefine((data, ctx) => {
    if (data.locationPreference === "your-premise") {
      if (
        !data.address?.street ||
        !data.address?.city ||
        !data.address?.state
      ) {
        ctx.addIssue({
          code: "custom",
          message:
            "Street, city, and post code are required for your premise bookings",
          path: ["address"],
        });
      }
    }
  });

type BookingFormData = z.infer<typeof formSchema>;
type Training = (typeof trainings)[0];

// Form Error Component
const FormError = ({ error }: { error?: string }) => {
  if (!error) return null;
  return <p className="text-red-400 text-xs mt-1">{error}</p>;
};

export default function EnrollCourse() {
  const { id } = useParams();
  const [selectedItem, setSelectedItem] = useState<Training | null>(null);
  const [selectedDates, setSelectedDates] = useState<
    { date: string; time: string }[]
  >([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useForm<BookingFormData>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      course: {
        name: "",
        duration: "",
        certification: "",
        price: "",
      },
      fullName: "",
      email: "",
      phone: "",
      organizationName: "",
      // numberOfParticipants: 1,
      gdprConsent: false,
      locationPreference: "your-premise",
      address: {
        street: "",
        city: "",
        state: "",
      },
      preferredDates: [],
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (id) {
      const item = trainings.find((training) => training.link === id);
      if (item) {
        setSelectedItem(item);
        form.setValue("course", {
          name: item.name,
          duration: item.duration,
          certification: item.certification,
          price: item.price,
        });
      }
    }
  }, [id, form]);

  // Simulate loading booked dates
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleSelectDates = (dates: { date: string; time: string }[]) => {
    setSelectedDates(dates);
    form.setValue("preferredDates", dates);
  };

  const navigate = useNavigate();
  const { mutateAsync: submitBooking, isPending } = useSubmitBooking();

  const onSubmit: SubmitHandler<BookingFormData> = async (data) => {
    try {
      // Don't send address if not "your-premise"
      if (data.locationPreference !== "your-premise") {
        delete data.address;
      }
      console.log("Booking submitted:", data);
      const result = await submitBooking(data as CourseApprovalPayload);

      if (result.statusCode === 200) {
        setShowSuccess(true);
        navigate("/booking-confirmed");
        const currentCourse = form.getValues("course");
        form.reset({ course: currentCourse });
      }
    } catch (error) {
      console.error("Booking failed:", error);
    }
  };

  if (!selectedItem) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center pt-[8vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
          <p className="text-gray-300 text-lg">Loading course details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-[8vh] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-3 mb-12">
          <a href="/" className="text-gray-400 hover:text-gray-300 text-sm">
            Courses
          </a>
          <ChevronRight size={16} className="text-gray-600" />
          <span className="text-orange-400 text-sm font-semibold">
            {selectedItem.name}
          </span>
        </div>

        {/* Success Modal */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 text-center max-w-md w-full">
              <div className="mb-4 flex justify-center">
                <div className="bg-green-100 p-4 rounded-full">
                  <CheckCircle size={48} className="text-green-600" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Booking Submitted!
              </h2>
              <p className="text-gray-600 mb-4">
                Thank you for your booking. We'll be in touch shortly to confirm
                the details.
              </p>
              <p className="text-sm text-gray-500">Redirecting...</p>
            </div>
          </div>
        )}

        {/* Date Picker Dialog */}
        <DateTimePickerDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSelectDates={handleSelectDates}
        />

        <div className="grid lg:grid-cols-5 gap-8 mb-12">
          {/* Left Side - Course Details */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 bg-gradient-to-br from-slate-800 to-slate-700 border border-slate-600 rounded-2xl overflow-hidden shadow-2xl">
              {/* Image */}
              <div className="relative h-64 overflow-hidden bg-slate-600">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>

                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-orange-500 text-white px-4 py-2 rounded-lg shadow-lg">
                  <p className="text-xs text-orange-100">Starting at</p>
                  <p className="text-2xl font-bold">{selectedItem.price}</p>
                  <p className="text-xs line-through text-orange-200">
                    {selectedItem.originalPrice}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {selectedItem.name}
                </h2>

                {/* Key Stats */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-600">
                    <Clock
                      size={20}
                      className="text-orange-400 flex-shrink-0"
                    />
                    <div>
                      <p className="text-xs text-gray-400">Duration</p>
                      <p className="text-sm font-semibold text-white">
                        {selectedItem.duration}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pb-4 border-b border-slate-600">
                    <Award
                      size={20}
                      className="text-orange-400 flex-shrink-0"
                    />
                    <div>
                      <p className="text-xs text-gray-400">Certification</p>
                      <p className="text-sm font-semibold text-white">
                        {selectedItem.certification}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Users
                      size={20}
                      className="text-orange-400 flex-shrink-0"
                    />
                    <div>
                      <p className="text-xs text-gray-400">Group Discount</p>
                      <p className="text-sm font-semibold text-white">
                        5% off (12+)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  {selectedItem.desc}
                </p>

                {/* Ideal For */}
                <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                  <p className="text-xs text-gray-400 mb-2">Ideal For</p>
                  <p className="text-sm text-gray-300">
                    {selectedItem.idealFor}
                  </p>
                </div>

                {/* Contact Info */}
                <div className="mt-6 pt-6 border-t border-slate-600 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Phone size={16} className="text-orange-400" />
                    <a
                      href="tel:+447763658885"
                      className="hover:text-orange-400"
                    >
                      +44 7763 658885
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Mail size={16} className="text-orange-400" />
                    <a
                      href="mailto:support@ambertraining.co.uk"
                      className="hover:text-orange-400"
                    >
                      support@ambertraining.co.uk
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Booking Form */}
          <div className="lg:col-span-3">
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 border border-slate-600 rounded-2xl p-8 shadow-2xl">
              <h2 className="text-3xl font-bold text-white mb-2">
                Book Your Course
              </h2>
              <p className="text-gray-300 mb-8">
                Fill in the details below to secure your spot
              </p>

              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    {...form.register("fullName")}
                    placeholder="John Doe"
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                  />
                  <FormError error={form.formState.errors.fullName?.message} />
                </div>

                {/* Email & Phone Grid */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      {...form.register("email")}
                      placeholder="john@example.com"
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                    />
                    <FormError error={form.formState.errors.email?.message} />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      {...form.register("phone")}
                      placeholder="07123456789"
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                    />
                    <FormError error={form.formState.errors.phone?.message} />
                  </div>
                </div>

                {/* Organization & Participants Grid */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Organisation
                    </label>
                    <input
                      type="text"
                      {...form.register("organizationName")}
                      placeholder="Optional"
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Number of Participants *
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      {...form.register("numberOfParticipants")}
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                    />
                    <FormError
                      error={
                        form.formState.errors.numberOfParticipants?.message
                      }
                    />
                  </div>
                </div>

                {/* Location Preference */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-4">
                    Training Location *
                  </label>
                  <div className="space-y-2 sm:space-y-3 md:flex md:gap-3 md:space-y-0">
                    {["your-premise", "our-premise", "online"].map((option) => (
                      <label
                        key={option}
                        className="flex items-center gap-3 p-3 rounded-lg border-2 border-slate-600 cursor-pointer hover:border-orange-500 transition-colors md:flex-1"
                        style={{
                          borderColor:
                            form.watch("locationPreference") === option
                              ? "#ff7c22"
                              : undefined,
                          backgroundColor:
                            form.watch("locationPreference") === option
                              ? "rgba(255, 124, 34, 0.1)"
                              : undefined,
                        }}
                      >
                        <input
                          type="radio"
                          value={option}
                          {...form.register("locationPreference")}
                          className="w-4 h-4"
                        />
                        <span className="text-white font-medium text-sm">
                          {option === "your-premise"
                            ? "Your Premises"
                            : option === "our-premise"
                              ? "Our Premises"
                              : "Online"}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Address Fields */}
                {form.watch("locationPreference") === "your-premise" && (
                  <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600 space-y-4">
                    <p className="text-sm text-gray-300">
                      📍 We specialise in onsite training — we deliver training
                      at your premises anywhere in the UK
                    </p>

                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        {...form.register("address.street")}
                        placeholder="Street Address"
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                      />
                      <FormError
                        error={form.formState.errors.address?.street?.message}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-white mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          {...form.register("address.city")}
                          placeholder="City"
                          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                        />
                        <FormError
                          error={form.formState.errors.address?.city?.message}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-white mb-2">
                          Post Code *
                        </label>
                        <input
                          type="text"
                          {...form.register("address.state")}
                          placeholder="Post Code"
                          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                        />
                        <FormError
                          error={form.formState.errors.address?.state?.message}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {form.watch("locationPreference") === "our-premise" && (
                  <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/50">
                    <p className="text-sm text-gray-300">
                      ✓ We'll provide the venue and send you the address after
                      booking confirmation.
                    </p>
                  </div>
                )}

                {/* Preferred Dates */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-3">
                    <CalendarIcon size={16} className="inline mr-2" />
                    Preferred Dates & Times *
                  </label>

                  {selectedDates.length > 0 ? (
                    <div className="space-y-3 mb-4">
                      {selectedDates.map((slot, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/30 rounded-lg"
                        >
                          <div className="flex items-center gap-2">
                            <CheckCircle size={18} className="text-green-400" />
                            <span className="text-green-300 text-sm">
                              {new Date(
                                slot.date + "T00:00:00"
                              ).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}{" "}
                              at{" "}
                              <span className="font-semibold">{slot.time}</span>
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = selectedDates.filter(
                                (_, i) => i !== index
                              );
                              setSelectedDates(updated);
                              form.setValue("preferredDates", updated);
                            }}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 bg-slate-700/50 border border-slate-600 rounded-lg mb-4 text-center">
                      <p className="text-gray-400 text-sm">
                        No dates selected yet
                      </p>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleOpenDialog}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-4 py-3 rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                    <CalendarIcon size={20} />
                    {selectedDates.length > 0
                      ? `Change Dates (${selectedDates.length})`
                      : "Select Training Dates"}
                  </button>

                  <FormError
                    error={form.formState.errors.preferredDates?.message}
                  />
                </div>

                {/* GDPR Consent */}
                <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...form.register("gdprConsent")}
                      className="w-4 h-4 mt-1 rounded"
                    />
                    <span className="text-sm text-gray-300">
                      I agree to the processing of my data in accordance with{" "}
                      <span className="text-orange-400 font-semibold">
                        GDPR
                      </span>
                      . *
                    </span>
                  </label>
                  <FormError
                    error={form.formState.errors.gdprConsent?.message}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-orange-400 disabled:to-orange-500 text-white font-bold py-4 rounded-lg transition-all transform hover:translate-y-[-2px] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  {isPending ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Confirm Booking
                      <ChevronRight size={20} />
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-400 text-center">
                  We'll contact you within 24 hours to confirm your booking
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
