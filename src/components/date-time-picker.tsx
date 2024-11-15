import React, { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface DateTimePickerProps {
  value?: Date;
  onChange?: (newDateTime: Date) => void;
  label?: string;
  id?: string;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  value,
  onChange,
  label,
  id,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(value);
  const [selectedHour, setSelectedHour] = useState(
    value ? value.getHours().toString().padStart(2, "0") : "00",
  );
  const [selectedMinute, setSelectedMinute] = useState(
    value ? value.getMinutes().toString().padStart(2, "0") : "00",
  );

  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0"),
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0"),
  );

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    updateDateTime();
  };

  const handleTimeChange = (type: "hour" | "minute", newValue: string) => {
    if (type === "hour") {
      setSelectedHour(newValue);
    } else {
      setSelectedMinute(newValue);
    }
    updateDateTime();
  };

  const updateDateTime = () => {
    if (selectedDate) {
      const newDateTime = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        parseInt(selectedHour),
        parseInt(selectedMinute),
        0,
      );
      onChange?.(newDateTime);
    }
  };

  return (
    <div className="space-y-2">
      {label && <label htmlFor={id}>{label}</label>}
      <div className="flex items-center space-x-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !selectedDate && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={() => handleDateChange}
            />
          </PopoverContent>
        </Popover>

        <Select
          value={selectedHour}
          onValueChange={(value) => handleTimeChange("hour", value)}
        >
          <SelectTrigger className="w-[110px]">
            <SelectValue placeholder="Hour" />
          </SelectTrigger>
          <SelectContent className="max-h-[280px]">
            <SelectGroup>
              {hours.map((hour) => (
                <SelectItem key={hour} value={hour}>
                  {hour}h
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <span className="flex items-center">:</span>

        <Select
          value={selectedMinute}
          onValueChange={(value) => handleTimeChange("minute", value)}
        >
          <SelectTrigger className="w-[110px]">
            <SelectValue placeholder="Minute" />
          </SelectTrigger>
          <SelectContent className="max-h-[280px]">
            <SelectGroup>
              {minutes.map((minute) => (
                <SelectItem key={minute} value={minute}>
                  {minute}m
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default DateTimePicker;
