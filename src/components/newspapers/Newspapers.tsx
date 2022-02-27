import PropTypes from "prop-types";
import './Newspapers.css'
import { Link } from "react-router-dom";
  
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
            <Link to="/sources" className="mb-4">Mostra editori più letti</Link>
            { !!newspapers.length && <small className="mb-0"><i>Filtra editori della ricerca corrente:</i></small>}
           {newspapers.map((newspaper: string, i: number) => (
                <button key={i} type="button" className={`newspaper__btn btn mt-2 ${isSelected(newspaper) ? 'newspaper__btn--selected' : ''}`} onClick={() => selectNewspaper(newspaper)}>{newspaper}</button>
           ))}
        </div>
    )
}

Newspapers.prototype = {
    newspapers: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedNewspapers: PropTypes.arrayOf(PropTypes.string).isRequired,
    setSelectedNewspapers: PropTypes.func.isRequired,
}