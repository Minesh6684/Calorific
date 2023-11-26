import { useEffect } from "react";
import "./App.css";

function App() {
  const YOUR_CLIENT_ID: string =
    "733443169936-76qc3croap423t9oe94uubgpsre7jagc.apps.googleusercontent.com";
  const YOUR_REDIRECT_URI: string = "http://localhost:5173";

  const fragmentString: string = window.location.hash.substring(1);

  // Parse query string to see if the page request is coming from OAuth 2.0 server.
  const params: { [key: string]: string } = {};
  const regex: RegExp = /([^&=]+)=([^&]*)/g;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(fragmentString))) {
    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
  }

  useEffect(() => {
    if (Object.keys(params).length > 0) {
      localStorage.setItem("oauth2-test-params", JSON.stringify(params));
      if (params["state"] && params["state"] === "try_sample_request") {
        trySampleRequest();
      }
    }
  });

  // If there's an access token, try an API request.
  // Otherwise, start the OAuth 2.0 flow.
  function trySampleRequest() {
    const storedParams = JSON.parse(
      localStorage.getItem("oauth2-test-params") || "{}"
    );
    console.log("stordParams", storedParams);

    if (storedParams["access_token"]) {
      const xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        `https://www.googleapis.com/drive/v3/about?fields=user&access_token=${storedParams["access_token"]}`
      );

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          const userInformation = JSON.parse(xhr.responseText);
          console.log("User Information:", userInformation);
        } else if (xhr.readyState === 4 && xhr.status === 401) {
          // Token invalid, so prompt for user permission.
          oauth2SignIn();
        }
      };

      xhr.send(null);
    } else {
      console.log("oauth2SignIn calling");
      oauth2SignIn();
    }
  }

  /*
   * Create a form to request an access token from Google's OAuth 2.0 server.
   */
  function oauth2SignIn(e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e?.preventDefault();
    // Google's OAuth 2.0 endpoint for requesting an access token
    const oauth2Endpoint: string =
      "https://accounts.google.com/o/oauth2/v2/auth";

    // Create an element to open the OAuth 2.0 endpoint in a new window.
    const form: HTMLFormElement = document.createElement("form");
    form.setAttribute("method", "GET"); // Send as a GET request.
    form.setAttribute("action", oauth2Endpoint);

    // Parameters to pass to the OAuth 2.0 endpoint.
    const requestParams: { [key: string]: string } = {
      client_id: YOUR_CLIENT_ID,
      redirect_uri: YOUR_REDIRECT_URI,
      scope: "https://www.googleapis.com/auth/drive.metadata.readonly",
      state: "try_sample_request",
      include_granted_scopes: "true",
      response_type: "token",
    };

    // Add form parameters as hidden input values.
    for (const p in requestParams) {
      console.log(p);
      if (p in requestParams) {
        const input: HTMLInputElement = document.createElement("input");
        input.setAttribute("type", "hidden");
        input.setAttribute("name", p);
        input.setAttribute("value", requestParams[p]);
        form.appendChild(input);
      }
    }

    // Add the form to the page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
  }

  return (
    <>
      <p>Hello Fitness Enthusiastic</p>
      <button onClick={trySampleRequest}>Try sample request</button>
    </>
  );
}

export default App;
