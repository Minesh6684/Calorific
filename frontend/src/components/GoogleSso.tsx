// google_sso.tsx

import React from "react";

const YOUR_CLIENT_ID: string =
  "733443169936-76qc3croap423t9oe94uubgpsre7jagc.apps.googleusercontent.com";
const YOUR_REDIRECT_URI: string = "http://localhost:5173";

const GoogleSSO: React.FC = () => {
  const oauth2SignIn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    // Google's OAuth 2.0 endpoint for requesting an access token
    const oauth2Endpoint: string =
      "https://accounts.google.com/o/oauth2/v2/auth";

    // Create an element to open the OAuth 2.0 endpoint in a new window.
    const form: HTMLFormElement = document.createElement("form");
    form.method = "GET"; // Send as a GET request.
    form.action = oauth2Endpoint;

    // Parameters to pass to the OAuth 2.0 endpoint.
    const requestParams: Record<string, string> = {
      client_id: YOUR_CLIENT_ID,
      redirect_uri: YOUR_REDIRECT_URI,
      scope: "https://www.googleapis.com/auth/drive.metadata.readonly",
      state: "try_sample_request",
      include_granted_scopes: "true",
      response_type: "token",
    };

    // Add form parameters as hidden input values.
    Object.entries(requestParams).forEach(([p, value]) => {
      if (Object.prototype.hasOwnProperty.call(requestParams, p)) {
        const input: HTMLInputElement = document.createElement("input");
        input.type = "hidden";
        input.name = p;
        input.value = value;
        form.appendChild(input);
      }
    });

    // Add the form to the page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
  };

  return <button onClick={(e) => oauth2SignIn(e)}>Try sample request</button>;
};

export default GoogleSSO;
