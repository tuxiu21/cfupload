import { CheckMarkIcon, ErrorIcon } from "./icons";

export default function Toast({
  show,
  message,
  success,
}: {
  show: boolean;
  message: string;
  success: boolean;
}) {
  return (
    <div
      className={`toast transition-all duration-500 ease-out ${
        show ? " opacity-100" : "invisible opacity-0"
      }`}
    >
      <div
        className={`alert ${
          success ? "alert-success" : "alert-error"
        } flex flex-row`}
      >
        {success ? (
          <CheckMarkIcon className="h-5 w-5" />
        ) : (
          <ErrorIcon className="h-5 w-5" />
        )}
        <span>{message}</span>
      </div>
    </div>
  );
}
