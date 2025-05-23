import React from "react";

export const FormButtons: React.FC<{
  handleClear: () => void;
  disabled?: boolean;
}> = ({ handleClear, disabled }) => {
  return (
    <div className="flex gap-3 justify-end pt-4">
      <button
        type="button"
        disabled={disabled}
        onClick={handleClear}
        className="px-6 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
      >
        Clear
      </button>

      <button
        type="submit"
        disabled={disabled}
        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Submit
      </button>
    </div>
  );
};
