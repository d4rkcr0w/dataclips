import React, { useCallback } from "react";

import useConfirm from "./hooks/use-confirm";
import useBlocker from "./hooks/use-blocker";

type ReactRouterPromptProps = {
  when: boolean;
  children: (data: {
    isActive: boolean;
    onCancel: (value: unknown) => void;
    onConfirm: (value: unknown) => void;
  }) => React.ReactNode;
};

/**
 * A replacement component for the react-router `Prompt`.
 * Allows for more flexible dialogs.
 *
 * @example
 * <ReactRouterPrompt when={isDirty}>
 *   {({isActive, onConfirm, onCancel}) => (
 *     <Modal show={isActive}>
 *       <div>
 *         <p>Do you really want to leave?</p>
 *         <button onClick={onCancel}>Cancel</button>
 *         <button onClick={onConfirm}>Ok</button>
 *       </div>
 *     </Modal>
 *   )}
 * </ReactRouterPrompt>
 */

const ReactRouterPrompt: React.FC<ReactRouterPromptProps> = ({
  when,
  children,
}) => {
  const {
    isActive,
    proceed,
    cancel,
    onConfirm,
    hasConfirmed,
    resetConfirmation,
  } = useConfirm();

  const blocker = useCallback(
    async (tx) => {
      if (await onConfirm()) {
        resetConfirmation();
        tx.retry();
      }
    },
    [resetConfirmation, onConfirm]
  );

  useBlocker(blocker, when && !hasConfirmed);

  return (
    <div>
      {children({
        isActive,
        onConfirm: proceed,
        onCancel: cancel,
      })}
    </div>
  );
};

export default ReactRouterPrompt;
