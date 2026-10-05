import { MapPin } from 'lucide-react';
import { useState, type Ref } from 'react';
import { Field, FieldError, FieldLabel } from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import { cn } from '@/shared/lib/utils';
import { usePlaceSearch } from '../hooks/use-place-search';
import type { SelectedLocation } from '../schemas/ride-request.schema';

type LocationFieldProps = {
  id: 'pickup' | 'dropoff';
  label: string;
  value: SelectedLocation | null;
  onChange: (value: SelectedLocation | null) => void;
  onBlur: () => void;
  inputRef: Ref<HTMLInputElement>;
  error?: string;
  disabled?: boolean;
};

export function LocationField({
  id,
  label,
  value,
  onChange,
  onBlur,
  inputRef,
  error,
  disabled,
}: LocationFieldProps) {
  const [input, setInput] = useState(value?.label ?? '');
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const { ready, suggestions, selection, predictions } = usePlaceSearch(
    input,
    open && !value && !disabled,
  );
  const showSuggestions = open && !value && input.trim().length >= 3;
  const listId = `${id}-suggestions`;
  let searchMessage = 'Select a location';
  if (suggestions.isError)
    searchMessage = 'Location search is unavailable. Please try again.';
  else if (suggestions.isFetching || suggestions.isPending)
    searchMessage = 'Searching…';
  else if (predictions.length === 0)
    searchMessage = 'No places found. Try another address.';

  async function select(prediction: google.maps.places.PlacePrediction) {
    try {
      const location = await selection.mutateAsync(prediction);
      onChange(location);
      setInput(location.label);
      setOpen(false);
    } catch {
      // The field displays the mutation error and allows another selection.
    }
  }

  return (
    <Field data-invalid={Boolean(error)} className="relative gap-1.5">
      <FieldLabel htmlFor={id} className="text-xs text-muted-foreground">
        {label}
      </FieldLabel>
      <div className="relative">
        <MapPin
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute left-3 top-4 size-5',
            id === 'pickup' ? 'text-primary' : 'text-destructive',
          )}
        />
        <Input
          ref={inputRef}
          id={id}
          className="h-14 bg-card pl-11 text-sm"
          placeholder={id === 'pickup' ? 'Enter pickup location' : 'Where to?'}
          value={input}
          autoComplete="off"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={showSuggestions}
          aria-controls={showSuggestions ? listId : undefined}
          aria-activedescendant={
            showSuggestions && predictions[activeIndex]
              ? `${id}-option-${activeIndex}`
              : undefined
          }
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          disabled={disabled || !ready || selection.isPending}
          onChange={(event) => {
            setInput(event.target.value);
            onChange(null);
            selection.reset();
            setOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => {
            setOpen(false);
            onBlur();
          }}
          onKeyDown={(event) => {
            if (event.key === 'Escape') setOpen(false);
            if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
              event.preventDefault();
              setOpen(true);
              setActiveIndex((index) =>
                event.key === 'ArrowDown'
                  ? Math.min(index + 1, predictions.length - 1)
                  : Math.max(index - 1, 0),
              );
            }
            if (event.key === 'Enter' && showSuggestions) {
              event.preventDefault();
              const prediction = predictions[activeIndex];
              if (prediction) void select(prediction);
            }
          }}
        />
        {showSuggestions && (
          <div className="absolute inset-x-0 top-full z-20 mt-1 overflow-hidden rounded-lg border bg-popover shadow-lg">
            <ul
              id={listId}
              role="listbox"
              aria-label={`${label} suggestions`}
              className="max-h-60 overflow-y-auto"
            >
              {predictions.map((prediction, index) => (
                <li
                  key={prediction.placeId}
                  id={`${id}-option-${index}`}
                  role="option"
                  aria-selected={activeIndex === index}
                  className={cn(
                    'cursor-pointer px-4 py-3 text-sm hover:bg-accent',
                    activeIndex === index && 'bg-accent',
                  )}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => {
                    if (!selection.isPending) void select(prediction);
                  }}
                >
                  {prediction.text.toString()}
                </li>
              ))}
            </ul>
            <p
              role="status"
              className="border-t px-4 py-2 text-xs text-muted-foreground"
            >
              {searchMessage}
            </p>
          </div>
        )}
      </div>
      {selection.isPending && (
        <p role="status" className="text-xs text-muted-foreground">
          Selecting location…
        </p>
      )}
      {selection.isError && (
        <FieldError>
          Unable to select this location. Please try again.
        </FieldError>
      )}
      <FieldError id={`${id}-error`}>{error}</FieldError>
    </Field>
  );
}
