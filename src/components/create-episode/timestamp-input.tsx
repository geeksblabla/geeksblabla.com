import React, { useState } from "react";

interface TimestampInputProps {
  onChange: (timestamp: string) => void;
  id: string;
  defaultValue: string;
}

interface TimeState {
  hours: string;
  minutes: string;
  seconds: string;
}

const padWithZero = (value: string): string => {
  return value.length === 1 ? `0${value}` : value;
};

const validateAndFormatNumber = (value: string, max: number): string => {
  const cleanValue = value.replace(/\D/g, "");
  let numValue = parseInt(cleanValue);
  if (isNaN(numValue)) return "";
  console.log({ numValue, max });
  if (numValue > max) numValue = max;
  return numValue.toString();
};

const parseTimestamp = (timestamp: string): TimeState => {
  const [hours, minutes, seconds] = timestamp?.split(":") || ["", "", ""];
  return { hours, minutes, seconds };
};

const TimestampInput: React.FC<TimestampInputProps> = ({
  onChange,
  id,
  defaultValue,
}) => {
  const [time, setTime] = useState<TimeState>(parseTimestamp(defaultValue));

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof TimeState,
    max: number
  ) => {
    const formattedValue = validateAndFormatNumber(e.target.value, max);
    console.log(formattedValue);
    setTime(prev => ({ ...prev, [field]: formattedValue }));

    if (formattedValue.length === 2) {
      selectNextField(field);
    }

    const newTime = {
      ...time,
      [field]: formattedValue,
    };
    onChange(`${newTime.hours}:${newTime.minutes}:${newTime.seconds}`);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: keyof TimeState
  ) => {
    if (e.key === ":" || e.key === "ArrowRight") {
      e.preventDefault();
      selectNextField(field);
    }
  };

  const handleBlur = (field: keyof TimeState) => {
    setTime(prev => ({ ...prev, [field]: padWithZero(prev[field]) }));

    const newTime = {
      ...time,
      [field]: padWithZero(time[field]),
    };
    const timestamp = `${padWithZero(newTime.hours)}:${padWithZero(newTime.minutes)}:${padWithZero(newTime.seconds)}`;
    onChange(timestamp);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const selectNextField = (field: keyof TimeState) => {
    const nextFieldId =
      field === "hours"
        ? `${id}-minutes`
        : field === "minutes"
          ? `${id}-seconds`
          : null;
    const nextField = nextFieldId
      ? (document.getElementById(nextFieldId) as HTMLInputElement)
      : null;
    nextField?.focus();
  };

  return (
    <div
      className="inline-flex rounded-md border border-gray-400 bg-gray-50 px-1 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500"
      role="group"
      aria-labelledby={id}
    >
      <input
        type="text"
        value={time.hours}
        onChange={e => handleInputChange(e, "hours", 23)}
        onKeyDown={e => handleKeyDown(e, "hours")}
        className="w-[2ch] border-0 bg-transparent px-0 text-center focus:outline-none focus:ring-0"
        maxLength={2}
        placeholder="00"
        id={`${id}-hours`}
        aria-label="Hours"
        onFocus={handleFocus}
        onBlur={() => handleBlur("hours")}
      />
      <span className="flex items-center text-gray-500">:</span>
      <input
        type="text"
        value={time.minutes}
        onChange={e => handleInputChange(e, "minutes", 59)}
        onKeyDown={e => handleKeyDown(e, "minutes")}
        className="w-[2ch] border-0 bg-transparent px-0 text-center focus:outline-none focus:ring-0"
        maxLength={2}
        placeholder="00"
        id={`${id}-minutes`}
        aria-label="Minutes"
        onFocus={handleFocus}
        onBlur={() => handleBlur("minutes")}
      />
      <span className="flex items-center text-gray-500">:</span>
      <input
        type="text"
        value={time.seconds}
        onChange={e => handleInputChange(e, "seconds", 59)}
        className="w-[2ch] border-0 bg-transparent px-0 text-center focus:outline-none focus:ring-0"
        maxLength={2}
        placeholder="00"
        id={`${id}-seconds`}
        aria-label="Seconds"
        onFocus={handleFocus}
        onBlur={() => handleBlur("seconds")}
      />
    </div>
  );
};

export default TimestampInput;
