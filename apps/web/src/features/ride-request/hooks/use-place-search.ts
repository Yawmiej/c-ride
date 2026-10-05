import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useId, useRef, useState } from 'react';
import type { SelectedLocation } from '../schemas/ride-request.schema';

export function usePlaceSearch(input: string, enabled: boolean) {
  const places = useMapsLibrary('places');
  const fieldId = useId();
  const token = useRef<google.maps.places.AutocompleteSessionToken | null>(
    null,
  );
  const [debouncedInput, setDebouncedInput] = useState(input);

  useEffect(() => {
    const timeout = window.setTimeout(() => setDebouncedInput(input), 300);
    return () => window.clearTimeout(timeout);
  }, [input]);

  const suggestions = useQuery({
    queryKey: ['place-suggestions', fieldId, debouncedInput],
    enabled: Boolean(
      places && enabled && input.trim().length >= 3 && input === debouncedInput,
    ),
    queryFn: async () => {
      if (!places) return [];
      token.current ??= new places.AutocompleteSessionToken();
      const result =
        await places.AutocompleteSuggestion.fetchAutocompleteSuggestions({
          input: debouncedInput,
          includedRegionCodes: ['ng'],
          sessionToken: token.current,
        });
      return result.suggestions.flatMap((suggestion) =>
        suggestion.placePrediction ? [suggestion.placePrediction] : [],
      );
    },
    staleTime: 0,
    gcTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const selection = useMutation({
    mutationFn: async (
      prediction: google.maps.places.PlacePrediction,
    ): Promise<SelectedLocation> => {
      const place = prediction.toPlace();
      try {
        await place.fetchFields({ fields: ['location'] });
        if (!place.location) throw new Error('This place has no coordinates.');
        return {
          label: prediction.text.toString(),
          ...place.location.toJSON(),
        };
      } finally {
        token.current = null;
      }
    },
  });

  return {
    ready: Boolean(places),
    suggestions,
    selection,
    predictions: input === debouncedInput ? (suggestions.data ?? []) : [],
  };
}
