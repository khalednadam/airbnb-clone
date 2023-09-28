'use client'

import useCountries from "@/app/hooks/useCountries";
import Select from "react-select"

export type CountrySelectValue = {
    flag: string;
    label: string;
    latLng: number[];
    region: string;
    value: string;
}

interface CountriesInputProps {
    value?: CountrySelectValue,
    onChange: (value: CountrySelectValue) => void;
}

const CountriesInput: React.FC<CountriesInputProps> = ({
    onChange, value
}) => {
    const { getAll } = useCountries();
    return ( 
        <div>
            <Select
            isClearable
            placeholder="Anywhere"
            options={getAll()}
            value={value}
            onChange={(value) => onChange(value as CountrySelectValue) }
            formatOptionLabel={(option: any) =>(
                <div className="flex flex-row items-center gap-3">
                    <div>
                        {option.flag}
                    </div>
                    <div className="text-black">
                        {option.label}, 
                        <span className="text-neutral-400 ml-1">
                            {option.region}
                        </span>
                    </div>
                </div>
            )}
            classNames={{
                control: () => 'p-3 border-2',
                input: () => 'text-lg text-green-600',
                option: () => 'text-lg text-green-600',

                
            }}
            theme={(theme) =>({
                ...theme,
                borderRadius: 6,
                colors: {
                    ...theme.colors,
                    primary: '#E11D48',
                    primary25: '#ffe4e6',
                }
            })}
            />
        </div>
     );
}
 
export default CountriesInput;