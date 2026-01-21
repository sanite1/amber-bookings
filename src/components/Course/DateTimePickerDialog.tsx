import { useFetchBookingDates } from "../../lib/api/book-course";
import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  X,
  CheckCircle2,
  Lock,
  Calendar,
} from "lucide-react";
import { useState, useEffect } from "react";

// Available time slots
const TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

// Skeleton Loader Component
export const DatePickerSkeleton = () => (
  <div className="space-y-4 animate-pulse">
    <div className="h-10 bg-slate-700 rounded-lg"></div>
    <div className="grid grid-cols-7 gap-2">
      {Array.from({ length: 35 }).map((_, i) => (
        <div key={i} className="h-10 bg-slate-700 rounded-lg"></div>
      ))}
    </div>
    <div className="h-20 bg-slate-700 rounded-lg"></div>
  </div>
);

// Date Picker Dialog Component
export const DateTimePickerDialog = ({
  isOpen,
  onClose,
  onSelectDates,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelectDates: (dates: { date: string; time: string }[]) => void;
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState<
    { date: string; time: string }[]
  >([]);
  const [selectedDateForTime, setSelectedDateForTime] = useState<string | null>(
    null
  );

  // Get days in month
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // Get first day of month
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // Format date as YYYY-MM-DD
  const formatDate = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  };

  // Get date status helper
  const getDateStatus = (
    dateString: string
  ): {
    status: "available" | "past" | "today" | "sunday" | "fully-booked";
    label: string;
    ariaLabel: string;
  } => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(dateString);
    selectedDate.setHours(0, 0, 0, 0);

    // Check if past date
    if (selectedDate < today) {
      return {
        status: "past",
        label: "Passed",
        ariaLabel: "Date has passed - unavailable",
      };
    }

    // Check if today
    if (selectedDate.getTime() === today.getTime()) {
      return {
        status: "today",
        label: "Today",
        ariaLabel: "Today - bookings start tomorrow",
      };
    }

    // Check if Sunday
    if (selectedDate.getDay() === 0) {
      return {
        status: "sunday",
        label: "Closed",
        ariaLabel: "Sunday - office closed",
      };
    }

    // Check if fully booked
    if (isDateBooked(dateString)) {
      return {
        status: "fully-booked",
        label: "Full",
        ariaLabel: "All time slots booked for this date",
      };
    }

    return {
      status: "available",
      label: "",
      ariaLabel: "Available for booking",
    };
  };

  const { data, isFetching } = useFetchBookingDates();

  // Check if date is booked
  const isDateBooked = (dateString: string): boolean => {
    return (
      data?.data?.bookedDates?.some((booked) => booked.date === dateString) ??
      false
    );
  };

  // Check if time is booked for a specific date
  const isTimeBooked = (dateString: string, time: string): boolean => {
    const bookedDate = data?.data?.bookedDates?.find(
      (b) => b.date === dateString
    );
    return bookedDate?.times?.includes(time) ?? false;
  };

  // Get booked times for selected date
  const getBookedTimesForDate = (dateString: string): string[] => {
    const bookedDate = data?.data?.bookedDates?.find(
      (b) => b.date === dateString
    );
    return bookedDate?.times || [];
  };

  // Handle date click
  const handleDateClick = (day: number) => {
    const dateString = formatDate(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );

    const { status } = getDateStatus(dateString);

    if (status !== "available") {
      return; // Don't allow selecting unavailable dates
    }

    setSelectedDateForTime(dateString);
  };

  // Handle time slot selection
  const handleTimeSelect = (time: string) => {
    if (!selectedDateForTime) return;

    const exists = selectedDates.some(
      (d) => d.date === selectedDateForTime && d.time === time
    );

    if (exists) {
      setSelectedDates(
        selectedDates.filter(
          (d) => !(d.date === selectedDateForTime && d.time === time)
        )
      );
    } else {
      setSelectedDates([...selectedDates, { date: selectedDateForTime, time }]);
    }
  };

  // Handle confirm
  const handleConfirm = () => {
    if (selectedDates.length > 0) {
      onSelectDates(selectedDates);
      onClose();
      setSelectedDates([]);
      setSelectedDateForTime(null);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose]);

  // Generate calendar days
  const calendarDays = [];
  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);

  // Empty cells before month starts
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  // Days of month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="z-50 bg-gradient-to-br from-slate-800 to-slate-700 border border-slate-600 rounded-2xl w-full max-w-2xl max-h-[75vh] sm:max-h-[75vh] flex flex-col shadow-2xl">
        {/* Header - Fixed */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-600 flex-shrink-0">
          <div className="flex items-center gap-2 flex-1">
            <Calendar size={20} className="text-orange-500 flex-shrink-0" />
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
              Select Training Dates & Times
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors flex-shrink-0 p-1"
            aria-label="Close date picker"
          >
            <X size={24} />
          </button>
        </div>

        {/* Legend - Mobile friendly info */}
        <div className="px-4 sm:px-6 pt-4 flex-shrink-0 pb-4">
          <div className="grid grid-cols-4 gap-2 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded"></div>
              <span className="text-green-300">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded"></div>
              <span className="text-red-300">Booked</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-slate-500 rounded"></div>
              <span className="text-slate-400">Unavailable</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock size={12} className="text-yellow-400 flex-shrink-0" />
              <span className="text-yellow-300">Restricted</span>
            </div>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {isFetching ? (
            <DatePickerSkeleton />
          ) : (
            <>
              {/* Calendar Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h3 className="text-base sm:text-lg font-semibold text-white">
                    {currentMonth.toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        setCurrentMonth(
                          new Date(
                            currentMonth.getFullYear(),
                            currentMonth.getMonth() - 1
                          )
                        )
                      }
                      className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-white hover:text-orange-500"
                      aria-label="Previous month"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={() =>
                        setCurrentMonth(
                          new Date(
                            currentMonth.getFullYear(),
                            currentMonth.getMonth() + 1
                          )
                        )
                      }
                      className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-white hover:text-orange-500"
                      aria-label="Next month"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>

                {/* Weekdays */}
                <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day) => (
                      <div
                        key={day}
                        className="text-center text-xs sm:text-sm font-semibold text-gray-400 py-2"
                      >
                        {day}
                      </div>
                    )
                  )}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-1 sm:gap-2">
                  {calendarDays.map((day, index) => {
                    if (day === null) {
                      return <div key={`empty-${index}`}></div>;
                    }

                    const dateString = formatDate(
                      currentMonth.getFullYear(),
                      currentMonth.getMonth(),
                      day
                    );
                    const { status, label, ariaLabel } =
                      getDateStatus(dateString);
                    const isSelected = selectedDateForTime === dateString;

                    const baseClasses =
                      "p-2 sm:p-3 rounded-lg font-medium text-xs sm:text-sm transition-all flex flex-col items-center justify-center min-h-[2.5rem] sm:min-h-[3rem] relative";

                    const statusClasses = {
                      available: `bg-green-500/20 border-2 border-green-500 text-green-100 hover:bg-green-500/40 hover:text-white cursor-pointer ${isSelected ? "bg-green-500/60 text-white shadow-lg shadow-green-500/50" : ""}`,
                      past: `bg-slate-700 text-slate-400 cursor-not-allowed opacity-40 border border-slate-600`,
                      today: `bg-yellow-500/20 border-2 border-yellow-500 text-yellow-200 cursor-not-allowed opacity-60`,
                      sunday: `bg-slate-700 text-slate-400 cursor-not-allowed opacity-40 border border-slate-600`,
                      "fully-booked": `bg-red-500/20 border-2 border-red-500 text-red-200 cursor-not-allowed opacity-60`,
                    };

                    return (
                      <button
                        key={day}
                        onClick={() => handleDateClick(day)}
                        disabled={status !== "available"}
                        className={`${baseClasses} ${statusClasses[status]}`}
                        aria-label={`${day} - ${ariaLabel}`}
                        aria-pressed={isSelected}
                        type="button"
                      >
                        <span className="font-semibold">{day}</span>
                        {label && (
                          <span className="text-xs font-medium mt-1 leading-none">
                            {label}
                          </span>
                        )}
                        {status === "fully-booked" && (
                          <Lock
                            size={12}
                            className="absolute top-1 right-1 hidden md:inline-block"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Info boxes below calendar */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                  <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex items-start gap-2">
                    <AlertCircle
                      size={16}
                      className="text-yellow-400 flex-shrink-0 mt-0.5"
                    />
                    <p className="text-xs sm:text-sm text-yellow-300">
                      Bookings available from tomorrow
                    </p>
                  </div>
                  <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-start gap-2">
                    <AlertCircle
                      size={16}
                      className="text-blue-400 flex-shrink-0 mt-0.5"
                    />
                    <p className="text-xs sm:text-sm text-blue-300">
                      We're closed on Sundays
                    </p>
                  </div>
                </div>
              </div>

              {/* Time Slots Section */}
              {selectedDateForTime && (
                <div className="mb-8 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-sm sm:text-lg font-semibold text-white">
                        Available Times
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 mt-1">
                        {new Date(
                          selectedDateForTime + "T00:00:00"
                        ).toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedDateForTime(null)}
                      className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors px-3 py-2 hover:bg-slate-600 rounded"
                      type="button"
                    >
                      Change
                    </button>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {TIME_SLOTS.map((time) => {
                      const booked = isTimeBooked(selectedDateForTime, time);
                      const selected = selectedDates.some(
                        (d) => d.date === selectedDateForTime && d.time === time
                      );

                      return (
                        <button
                          key={time}
                          onClick={() => handleTimeSelect(time)}
                          disabled={booked}
                          className={`
                            p-3 sm:p-4 rounded-lg font-semibold text-sm transition-all relative
                            ${
                              booked
                                ? "bg-red-500/20 text-red-300 cursor-not-allowed opacity-50 border border-red-500/30"
                                : selected
                                  ? "bg-green-500/60 text-white shadow-lg shadow-green-500/50 border-2 border-green-600"
                                  : "bg-slate-600 text-white hover:bg-orange-500 border border-slate-500 hover:border-orange-500"
                            }
                          `}
                          aria-label={`${time}${booked ? " - booked" : ""}${selected ? " - selected" : ""}`}
                          aria-pressed={selected}
                          type="button"
                        >
                          {time}
                          {booked && (
                            <Lock
                              size={12}
                              className="absolute top-1 right-1"
                            />
                          )}
                          {selected && (
                            <CheckCircle2
                              size={16}
                              className="absolute top-0 right-0"
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Booked times info */}
                  {getBookedTimesForDate(selectedDateForTime).length > 0 && (
                    <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-2">
                      <Lock
                        size={16}
                        className="text-red-400 flex-shrink-0 mt-0.5"
                      />
                      <div>
                        <p className="text-xs sm:text-sm text-red-300 font-medium">
                          Booked slots:
                        </p>
                        <p className="text-xs text-red-200 mt-1">
                          {getBookedTimesForDate(selectedDateForTime).join(
                            ", "
                          )}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Available times count */}
                  {getBookedTimesForDate(selectedDateForTime).length <
                    TIME_SLOTS.length && (
                    <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg flex items-start gap-2">
                      <CheckCircle2
                        size={16}
                        className="text-green-400 flex-shrink-0 mt-0.5"
                      />
                      <p className="text-xs sm:text-sm text-green-300">
                        {TIME_SLOTS.length -
                          getBookedTimesForDate(selectedDateForTime)
                            .length}{" "}
                        of {TIME_SLOTS.length} slots available
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Selected Dates Summary */}
              {selectedDates.length > 0 && (
                <div className="mb-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <h3 className="text-base sm:text-lg font-semibold text-green-400 mb-3 flex items-center gap-2">
                    <CheckCircle2 size={20} />
                    Selected Dates & Times ({selectedDates.length})
                  </h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {selectedDates.map((slot, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border border-green-500 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors"
                      >
                        <span className="text-white text-sm">
                          <span className="font-semibold">
                            {new Date(
                              slot.date + "T00:00:00"
                            ).toLocaleDateString("en-US", {
                              weekday: "long",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                          {" at "}
                          <span className="text-orange-400 font-semibold">
                            {slot.time}
                          </span>
                        </span>
                        <button
                          onClick={() =>
                            setSelectedDates(
                              selectedDates.filter((_, i) => i !== index)
                            )
                          }
                          className="text-red-400 hover:text-red-300 transition-colors p-1"
                          aria-label={`Remove ${slot.date} at ${slot.time}`}
                          type="button"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer - Fixed */}
        <div className="flex gap-2 sm:gap-3 p-4 sm:p-6 border-t border-slate-600 flex-shrink-0 bg-gradient-to-br from-slate-800 to-slate-700 rounded-b-2xl">
          <button
            onClick={onClose}
            className="text-sm md:text-base px-3 sm:px-4 py-2 sm:py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors whitespace-nowrap"
            type="button"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={selectedDates.length === 0}
            className="text-sm md:text-base flex-1 px-4 py-2 sm:py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-orange-400 disabled:to-orange-500 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
            type="button"
          >
            <CheckCircle2 size={18} />
            Confirm Selection ({selectedDates.length})
          </button>
        </div>
      </div>
    </div>
  );
};
