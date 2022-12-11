import React, { useState } from 'react';
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

    let [selection, setSelection] = useState([]); // Lista temporanea per consentire la multiselezione

    const isInSelection = (index) => {
        return (selection && selection instanceof Array) ? selection.some((elem) => elem.index === index) : false;
    };
    
    const onMouseDown = (event, list, index) => {
        event.preventDefault(); // Previene la selezione del testo
        
        setSelection([]); // Svuoto la selezione temporanea
        let temp = [...selection];

        if (!selection.some((elem) => elem.index === index)) { // Controllo che non sia già selezionato
            temp.push(getItem(list, index));
            setSelection(temp);
        }
    };

    const onMouseOver = (list, index) => {
        if (selection && selection.length > 0) { // Aggiungo alla selezione temporanea solo se non è vuota (se ho iniziato a selezionare)
            let temp = [...selection];
            if (!selection.some((elem) => elem.index === index)) { // Controllo che non sia già selezionato
                temp.push(getItem(list, index));
                setSelection(temp);
            }
        }
    };

    const onMouseUp = () => {
        onSelect(selection); // Aggiorno la selezione nello state padre
        setSelection([]); // Svuoto la selezione temporanea
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
                    inSelection={isInSelection(idx)}
                    onSelect={() => selectItem(mesi, idx)}
                    onMouseDown={(event) => onMouseDown(event, mesi, idx)}
                    onMouseOver={() => onMouseOver(mesi, idx)}
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