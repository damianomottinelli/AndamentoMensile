import React from 'react';
import Mese from './Mese';
import {getMonthName, getPercentage} from '../utils/functions';

const Andamento = ({mesi, selected, onSelect}) => {

    const max = (mesi && mesi instanceof Array) ? Math.max(...mesi.map(mese => mese.importo)) : null;

    const style = {
        flex: {
            display: 'flex'
        }
    };

    const isSelected = (selected, index) => {
        return (selected && selected instanceof Array) ? selected.find((elem) => elem.index === index) : false;
    };

    return <div style={style.flex}>
        {(mesi && mesi instanceof Array) ? 
            mesi.map((mese, idx) => 
                <Mese 
                    key={idx}
                    nome={getMonthName('it-it', idx)}
                    documenti={mese.documenti}
                    importo={mese.importo?.toLocaleString()}
                    percentuale={getPercentage(mese.importo, max)}
                    isSelected={isSelected(selected, idx)}
                    onSelect={() => onSelect({index: idx, nome: getMonthName('it-it', idx)})}
                />
            ) : <></>
        }
    </div>
}

export default Andamento;