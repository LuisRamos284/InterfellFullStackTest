import { ToastOptions, toast } from "react-toastify";

export const TOAST_OPTIONS: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

export const GENERIC_ERROR_500 = `The system is experiencing an issue. Please try again later or contact support if the issue persists.`;

export const useTriggerToast = (): {
  triggerSuccessToast: ({ message }: { message: string }) => void;
  triggerErrorToast: ({ message }: { message?: string }) => void;
} => {
  const triggerSuccessToast = ({ message }: { message: string }): void => {
    toast.success(message, TOAST_OPTIONS);
  };

  const triggerErrorToast = ({
    message = GENERIC_ERROR_500,
  }: {
    message?: string;
  }): void => {
    toast.error(message, TOAST_OPTIONS);
  };

  return { triggerSuccessToast, triggerErrorToast };
};
