import { useFetchBookingDates } from "../../lib/api/book-course";
import { AlertCircle, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState } from "react";

// Mock booked dates from backend
export const MOCK_BOOKED_DATES = [
  { date: "2026-02-10", times: ["09:00", "14:00"] },
  { date: "2026-02-12", times: ["10:00", "15:00", "16:00"] },
  { date: "2026-02-15", times: ["09:00"] },
  { date: "2026-02-18", times: ["14:00"] },
];

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
    if (
      isDateBooked(
        formatDate(currentMonth.getFullYear(), currentMonth.getMonth(), day)
      )
    ) {
      return; // Don't allow selecting fully booked dates
    }
    setSelectedDateForTime(
      formatDate(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    );
  };

  // Handle time slot selection
  const handleTimeSelect = (time: string) => {
    if (!selectedDateForTime) return;

    const dateTimeString = `${selectedDateForTime}T${time}`;
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
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="z-50 bg-gradient-to-br from-slate-800 to-slate-700 border border-slate-600 rounded-2xl max-w-2xl w-full max-h-[75vh] flex flex-col shadow-2xl">
        {/* Header - Fixed */}
        <div className="flex items-center justify-between p-6 border-b border-slate-600 flex-shrink-0">
          <h2 className="sm:text-xl md:text-2xl font-bold text-white">
            Select Training Dates & Times
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          {isFetching ? (
            <DatePickerSkeleton />
          ) : (
            <>
              {/* Calendar Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white">
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
                      className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-white"
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
                      className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-white"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>

                {/* Weekdays */}
                <div className="grid grid-cols-7 gap-2 mb-2">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day) => (
                      <div
                        key={day}
                        className="text-center text-sm font-semibold text-gray-400 py-2"
                      >
                        {day}
                      </div>
                    )
                  )}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-2">
                  {calendarDays.map((day, index) => {
                    if (day === null) {
                      return <div key={`empty-${index}`}></div>;
                    }

                    const dateString = formatDate(
                      currentMonth.getFullYear(),
                      currentMonth.getMonth(),
                      day
                    );
                    const isBooked = isDateBooked(dateString);
                    const isSelected = selectedDateForTime === dateString;

                    return (
                      <button
                        key={day}
                        onClick={() => handleDateClick(day)}
                        disabled={isBooked}
                        className={`
                          p-2 rounded-lg font-medium text-sm transition-all
                          ${
                            isBooked
                              ? "bg-slate-600 text-gray-500 cursor-not-allowed opacity-50"
                              : isSelected
                                ? "bg-orange-500 text-white shadow-lg"
                                : "bg-slate-700 text-white hover:bg-slate-600"
                          }
                        `}
                        title={isBooked ? "Fully booked" : ""}
                      >
                        {day}
                        {isBooked && (
                          <div className="text-xs mt-1 text-red-400 hidden md:block">
                            booked
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots Section */}
              {selectedDateForTime && (
                <div className="mb-8 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm md:text-lg font-semibold text-white">
                      Available Times for {selectedDateForTime}
                    </h3>
                    <button
                      onClick={() => setSelectedDateForTime(null)}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      Change Date
                    </button>
                  </div>

                  <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
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
                            p-3 rounded-lg font-medium text-sm transition-all
                            ${
                              booked
                                ? "bg-red-500/20 text-red-400 cursor-not-allowed opacity-50 border border-red-500/30"
                                : selected
                                  ? "bg-green-500 text-white shadow-lg border border-green-600"
                                  : "bg-slate-600 text-white hover:bg-slate-500 border border-slate-500"
                            }
                          `}
                          title={booked ? "Time slot booked" : ""}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>

                  {/* Booked times info */}
                  {getBookedTimesForDate(selectedDateForTime).length > 0 && (
                    <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-2">
                      <AlertCircle
                        size={16}
                        className="text-red-400 flex-shrink-0 mt-0.5"
                      />
                      <div>
                        <p className="text-sm text-red-300">
                          Booked times:{" "}
                          {getBookedTimesForDate(selectedDateForTime).join(
                            ", "
                          )}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Selected Dates Summary */}
              {selectedDates.length > 0 && (
                <div className="mb-8 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-400 mb-3">
                    Selected Dates & Times ({selectedDates.length})
                  </h3>
                  <div className="space-y-2">
                    {selectedDates.map((slot, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg"
                      >
                        <span className="text-white text-sm">
                          {new Date(slot.date + "T00:00:00").toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}{" "}
                          at <span className="font-semibold">{slot.time}</span>
                        </span>
                        <button
                          onClick={() =>
                            setSelectedDates(
                              selectedDates.filter((_, i) => i !== index)
                            )
                          }
                          className="text-red-400 hover:text-red-300 transition-colors"
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
        <div className="flex gap-2 sm:gap-3 p-6 border-t border-slate-600 flex-shrink-0 bg-gradient-to-br from-slate-800 to-slate-700 rounded-b-2xl">
          <button
            onClick={onClose}
            className="text-sm md:text-base px-3 sm:px-4 py-2 sm:py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors whitespace-nowrap"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={selectedDates.length === 0}
            className="text-sm md:text-base flex-1 px-4 py-2 sm:py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-orange-400 disabled:to-orange-500 text-white font-semibold rounded-lg transition-all"
          >
            Confirm Selection ({selectedDates.length})
          </button>
        </div>
      </div>
    </div>
  );
};
