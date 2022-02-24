import PropTypes, { string } from "prop-types";
import './Newspapers.css'

interface propsType {
    newspapers: string[];
    selectedNewspapers: string[];
    setSelectedNewspapers: Function;
}

export function Newspapers(props: propsType) {
    const {newspapers, selectedNewspapers, setSelectedNewspapers} = props;

    const isSelected = (value: string) => selectedNewspapers.includes(value);
    const selectNewspaper = (value: string) => setSelectedNewspapers(value);

    return (
        <div className="newspaper">
            <small><i>editori ricerca corrente:</i></small>
           {newspapers.map((newspaper: string, i: number) => (
                <button key={i} type="button" className={`newspaper__btn btn mt-2 ${isSelected(newspaper) ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => selectNewspaper(newspaper)}>{newspaper}</button>
           ))}
        </div>
    )
}

Newspapers.prototype = {
    newspapers: PropTypes.arrayOf(string).isRequired,
    selectedNewspapers: PropTypes.arrayOf(string).isRequired,
    setSelectedNewspapers: PropTypes.func.isRequired,
}