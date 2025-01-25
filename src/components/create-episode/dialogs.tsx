import type React from "react";

type DialogProps = {
  dialogRef: React.RefObject<HTMLDialogElement>;
  onClose: () => void;
  title: string;
};

export const EditDialog = ({
  dialogRef,
  onClose,
  children,
  title,
}: DialogProps & { children: React.ReactNode }) => {
  return (
    <dialog
      ref={dialogRef}
      className="rounded-lg p-0 backdrop:bg-black/50"
      onClick={e => {
        const dialogDimensions = dialogRef.current?.getBoundingClientRect();
        if (
          dialogDimensions &&
          (e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom)
        ) {
          dialogRef.current?.close();
          onClose();
        }
      }}
    >
      <div className="min-w-[500px] space-y-4 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            type="button"
            onClick={() => {
              dialogRef.current?.close();
              onClose();
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645C11.9512 2.34171 11.9512 2.65829 12.1464 2.85355L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
                strokeWidth={1.5}
              />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
};

export const DeleteDialog = ({
  dialogRef,
  onClose,
  onConfirm,
  title = "Confirm Delete",
}: DialogProps & { onConfirm: () => void }) => {
  return (
    <dialog ref={dialogRef} className="rounded-lg p-6 backdrop:bg-gray-500/50">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p>Are you sure you want to delete?</p>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => {
              dialogRef.current?.close();
              onClose();
            }}
            className="rounded-md px-4 py-2 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </dialog>
  );
};
