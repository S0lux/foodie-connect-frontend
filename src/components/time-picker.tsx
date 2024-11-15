import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface TimePickerProps {
  value: string;
  onChange: (newTime: string) => void;
  label?: string;
  id?: string;
}

const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  label,
  id,
}) => {
  // Generate hours (00-23)
  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0"),
  );

  // Generate minutes (00-59)
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0"),
  );

  const [selectedHour, setSelectedHour] = React.useState(
    value ? value.split(":")[0] : "00",
  );
  const [selectedMinute, setSelectedMinute] = React.useState(
    value ? value.split(":")[1] : "00",
  );

  // Handle time change
  const handleTimeChange = (type: "hour" | "minute", newValue: string) => {
    let hour = selectedHour;
    let minute = selectedMinute;

    if (type === "hour") {
      hour = newValue;
      setSelectedHour(newValue);
    } else {
      minute = newValue;
      setSelectedMinute(newValue);
    }

    const newTime = `${hour}:${minute}:00`;
    onChange?.(newTime);
  };

  return (
    <div className="space-y-2">
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="flex space-x-2">
        {/* Hours Select */}
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

        {/* Minutes Select */}
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

export default TimePicker;
