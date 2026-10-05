# C-Ride Web

React + Vite frontend for the C-Ride assessment.

## Google Maps setup (Phase 5)

Add these values to `apps/web/.env.local`, then restart Vite:

```dotenv
VITE_GOOGLE_MAPS_API_KEY=your_browser_api_key
VITE_GOOGLE_MAPS_MAP_ID=DEMO_MAP_ID
```

Use one Google Cloud project with billing enabled. Enable **Maps JavaScript API**, **Places API (New)**, and **Routes API** for the map, autocomplete suggestions, and selected-place coordinates. Routes API draws the driving route between selected locations. No Geocoding API or additional key is needed.

Restrict the browser key to all three APIs and your website referrers (for local Vite: `http://localhost:5173/*`; also add your deployed frontend origin). Vite browser keys are public, so use website/API restrictions rather than treating this value as a server secret. Do not commit your local key.

The map ID is not a secret or another API key. The optional value defaults to Google's `DEMO_MAP_ID` for the assessment; create a JavaScript map ID for production.

The existing `VITE_API_BASE_URL` must include the backend prefix, for example `http://localhost:3000/api/v1`. The API client appends `/rides` to this URL.

At `/rider`, choose pickup and drop-off from the suggestions, then request a ride. The map displays icon-only markers and a driving route after both locations are selected, then fits the entire route into view. Changing or clearing a location removes the previous line. If routing fails, a small message appears and ride requests remain available. After a destination is selected, the Standard card displays a static ₦1,000.00 assessment fare. The request still sends only coordinates; the backend owns the actual ride fare. The route is display-only; there is no arrival-time estimate or route-based pricing. A successful request opens `/rider/rides/:rideId`, whose tracking UI belongs to Phase 6.

Without a Maps key, the screen displays an unavailable message and disables location selection/request submission. To verify the live flow, configure the key, run the backend and frontend, sign in as a rider, select two places, and submit. Check the map markers, request error/loading states, and resulting ride URL.

References: [Google Places setup](https://developers.google.com/maps/documentation/javascript/place-get-started), [advanced markers and map IDs](https://developers.google.com/maps/documentation/javascript/advanced-markers/start).

Routing setup: enable Routes API in the same Google Cloud project and add it to the existing browser key’s API restrictions. See [Google Routes setup](https://developers.google.com/maps/documentation/javascript/routes/start).
