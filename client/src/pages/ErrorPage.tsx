import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function PageError({ message }: { message?: string }) {
  const error = useRouteError();
  let displayMessage = message || "An unexpected error occurred.";

  if (isRouteErrorResponse(error)) {
    displayMessage = `${error.status} ${error.statusText}`;
  } else if (error instanceof Error) {
    displayMessage = error.message;
  }

  return (
    <div className="flex flex-col items-center justify-center text-center bg-dark-3 min-h-[60vh] text-gray-100">
      <h2 className="text-2xl font-semibold mb-3">⚠️ Error</h2>
      <p className="mb-6 text-gray-400">{displayMessage}</p>
      <Button onClick={() => window.location.reload()}>Reload</Button>
    </div>
  );
}

export function GlobalErrorFallback({ error }: any) {
  //{ resetErrorBoundary }
  return (
    <div className=" flex flex-col items-center justify-center bg-dark-3  min-h-[60vh] text-gray-500 p-6 text-center">
      <h1 className="text-xl font-semibold mb-2">
        Oops! Something went wrong 😢
      </h1>
      <p className="text-sm mb-4">{error?.message || "Unknown error"}</p>
      <p className="mb-6 text-gray-400">
        We’re sorry — please try refreshing the page.
      </p>
      <Button
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        onClick={() => window.location.reload()}
      >
        Reload
      </Button>
    </div>
  );
}
