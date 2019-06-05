import React from 'react';

const ErrorPage = (resetError, clearAppState) => (
  <div>
    <div>
      {'Major error occurred. Clicking first button will fix most problems (without data loss). If this does not help, use second button to clear app state (some data may be lost this way).'}
    </div>
    <div>
      {'In any case I will appreciate sending the info about the issue to m3e.helper@gmail.com, it will help me fixing the issue.'}
    </div>
    <button onClick={resetError} type="button">
      {'Try to fix problem'}
    </button>
    <button onClick={clearAppState} type="button">
      {'Clear app state'}
    </button>
  </div>
);

export default ErrorPage;
