import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { set } from "date-fns";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

interface PlacesProps {
  setFormatAddress: (address: string) => void;
  setOffice: (position: google.maps.LatLngLiteral) => void;
}

export default function Places({ setFormatAddress, setOffice }: PlacesProps) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (val: string) => {
    setValue(val, false);
    clearSuggestions();

    const results = await getGeocode({ address: val });
    console.log(results);
    const { lat, lng } = await getLatLng(results[0]);
    setFormatAddress(results[0].formatted_address);
    setOffice({ lat, lng });
    console.log(lat, lng);
  };

  return (
    <div className="flex flex-1 flex-col gap-2 md:flex-row">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        placeholder="Enter an address"
        className="w-full"
      />
      <Button
        onClick={clearSuggestions}
        disabled={!value}
        className="w-full md:w-auto"
      >
        Clear
      </Button>
      {status === "OK" && (
        <div className="relative w-full">
          <ul className="absolute z-10 w-full bg-white shadow-md">
            {data.map(({ place_id, description }) => (
              <li
                key={place_id}
                onClick={() => handleSelect(description)}
                className="cursor-pointer p-2 hover:bg-gray-100"
              >
                {description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
