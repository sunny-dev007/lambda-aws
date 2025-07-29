import React from 'react';

/**
 * Back to Prompt Handler
 * Handles the navigation back to prompt view functionality
 * Extracted from CrosstabsModal.js for better code organization
 */

export const useBackToPromptHandler = () => {
  // Simplify the handleBackToPrompt function
  const handleBackToPrompt = () => {
    console.log("Navigating back to prompt view");
    // Add your navigation logic here
    // This was extracted from the original CrosstabsModal.js
  };

  return {
    handleBackToPrompt
  };
};

/**
 * Back to Prompt Button Component
 * Reusable button component for navigating back to prompt
 */
export const BackToPromptButton = ({ 
  onClick, 
  disabled = false, 
  variant = "outlined",
  className = "",
  children = "Back to Prompt"
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`back-to-prompt-btn ${variant} ${className}`}
      type="button"
    >
      {children}
    </button>
  );
};

// Default export for convenience
export default {
  useBackToPromptHandler,
  BackToPromptButton
}; 