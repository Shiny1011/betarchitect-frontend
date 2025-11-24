interface ErrorFormMessageProps {
  message: string;
  className?: string;
}

export const ErrorFormMessage = ({ message, className }: ErrorFormMessageProps) => {
  return <p className={`text-center text-sm text-red-500 ${className}`}>{message}</p>;
};
