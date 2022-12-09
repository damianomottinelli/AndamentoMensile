import React from 'react';
import PropTypes from 'prop-types';

import Mese from './Mese';
import {getMonthName, getPercentage} from '../utils/functions';

const Andamento = ({mesi, isSelected = () => {}, onSelect = () => {}}) => {

    const max = (mesi && mesi instanceof Array) ? Math.max(...mesi.map(mese => mese.importo)) : null; // Calcolo l'importo massimo

    const getItem = (list, index) => {
        return {index: index, nome: getMonthName(index), ...list[index]};
    };

    const selectItem = (list, index) => {
        onSelect( [ getItem(list, index) ] );
    };

    let selection = []; // Lista temporanea per consentire la multiselezione
    
    const onMouseDown = (event, list, index) => {
        event.preventDefault(); // Previene la selezione del testo
        
        selection = []; // Svuoto la selezione temporanea

        if (!selection.some((elem) => elem.index === index)) { // Controllo che non sia già selezionato
            selection.push(getItem(list, index));
        }
    };

    const onMouseOver = (event, list, index) => {
        event.preventDefault();

        if (!selection.some((elem) => elem.index === index)) { // Controllo che non sia già selezionato
            selection.push(getItem(list, index));
        }
    };

    const onMouseUp = (event) => {
        event.preventDefault();

        onSelect(selection); // Aggiorno la selezione nello state padre
    };

    const style = {
        flex: {
            display: 'flex'
        }
    };

    return <div style={style.flex}>
        {(mesi && mesi instanceof Array) ? 
            mesi.map((mese, idx) => 
                <Mese 
                    key={idx}
                    nome={getMonthName(idx)}
                    documenti={mese.documenti}
                    importo={mese.importo?.toLocaleString()}
                    percentuale={getPercentage(mese.importo, max)}
                    isSelected={isSelected(idx)}
                    onSelect={() => selectItem(mesi, idx)}
                    onMouseDown={(event) => onMouseDown(event, mesi, idx)}
                    onMouseOver={(event) => onMouseOver(event, mesi, idx)}
                    onMouseUp={onMouseUp}
                />
            ) : null
        }
    </div>
}

export default Andamento;

Andamento.propTypes = {
    mesi: PropTypes.arrayOf(
            PropTypes.shape({
                documenti: PropTypes.number,
                importo: PropTypes.number.isRequired
            })
        ).isRequired,
    isSelected: PropTypes.func,
    onSelect: PropTypes.func
}