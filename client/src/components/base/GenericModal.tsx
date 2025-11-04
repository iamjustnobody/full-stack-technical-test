import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface GenericModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;

  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;

  submitLabel?: string;

  cancelLabel?: string;

  isSubmitting?: boolean;

  footer?: React.ReactNode;

  children: React.ReactNode;

  hideDefaultFooter?: boolean;
  className?: string;
}

export function GenericModal({
  open,
  onOpenChange,
  title,
  description,
  onSubmit,
  submitLabel = "Submit",
  cancelLabel = "Cancel",
  isSubmitting = false,
  footer,
  children,
  hideDefaultFooter = false,
  className,
}: GenericModalProps) {
  const isForm = typeof onSubmit === "function";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`sm:max-w-md ${className || ""}`}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {isForm ? (
          <form onSubmit={onSubmit} className="space-y-4">
            {children}

            {!hideDefaultFooter && (
              <DialogFooter className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  {cancelLabel}
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : submitLabel}
                </Button>
              </DialogFooter>
            )}
          </form>
        ) : (
          <>
            <div className="space-y-4">{children}</div>

            {!hideDefaultFooter && (
              <DialogFooter className="flex justify-end gap-2">
                {footer ?? (
                  <Button onClick={() => onOpenChange(false)}>Close</Button>
                )}
              </DialogFooter>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
