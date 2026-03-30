import React, { useCallback, useEffect, useState, useRef } from "react";
import { ILabel } from "../../interfaces/interfaces";
import useAuth from "../../hooks/useAuth";
import labelService from "../../lib/firebase/services/label.service";
import { toast } from "react-toastify";

export const useLabelHandler = () => {
  const [labels, setLabels] = useState<ILabel[]>([]);
  const [labelName, setLabelName] = useState("");
  const { loggedUser } = useAuth();
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => loadLabel(), []);

  const loadLabel = useCallback(() => {
    labelService
      .get<ILabel>({ key: "user_id", opt: "==", value: loggedUser?.id ?? "" })
      .then((result) => {
        setLabels(result);
      });
  }, [loggedUser]);

  const addLabelHandler = () => {
    if (labelName) {
      labelService
        .create({ name: labelName, user_id: loggedUser?.id })
        .then((result) => {
          setLabels([...labels, { name: labelName, id: result.id }]);
        });
      setLabelName("");
    }
  };

  const updateLabelHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const updatedLabels = labels.map((label) =>
      label.id === id ? { ...label, name: value } : label,
    );
    setLabels(updatedLabels);

    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }

    updateTimeoutRef.current = setTimeout(() => {
      labelService.update({ id: id, data: { name: value } });
    }, 1000);
  };

  const deleteLabelHandler = (id: string | number) => {
    const labelToDelete = labels.find((label) => label.id === id);
    if (!labelToDelete) return;

    // Optimistic UI update
    setLabels((prevLabels) => prevLabels.filter((label) => label.id !== id));

    const toastId = toast(
      React.createElement(
        "div",
        { className: "flex items-center justify-between gap-3" },
        [
          React.createElement(
            "span",
            { key: "text", className: "text-sm text-gray-800" },
            `Deleted "${labelToDelete.name}"`,
          ),
          React.createElement(
            "button",
            {
              key: "btn",
              className:
                "text-xs font-semibold text-blue-600 hover:text-blue-700 focus:outline-none",
              onClick: () => {
                labelService
                  .create({ name: labelToDelete.name, user_id: loggedUser?.id })
                  .then((result) => {
                    setLabels((prev) => [
                      ...prev,
                      { ...labelToDelete, id: result.id },
                    ]);
                  });
                toast.dismiss(toastId);
              },
            },
            "Undo",
          ),
        ],
      ),
      { type: "info", autoClose: 5000, closeOnClick: false },
    );

    labelService.delete(id.toString()).catch(() => {
      setLabels((prevLabels) => [...prevLabels, labelToDelete]);
      toast.dismiss(toastId);
      toast.error("Failed to delete label. Please try again.");
    });
  };

  return {
    labels,
    setLabels,
    labelName,
    setLabelName,
    addLabelHandler,
    updateLabelHandler,
    deleteLabelHandler,
  };
};
