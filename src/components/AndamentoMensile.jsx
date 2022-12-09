import React, { useEffect, useState } from 'react';
import Andamento from './Andamento';
import { getJsonData } from '../utils/functions';
import { ENDPOINT } from "../utils/constants";

const AndamentoMensile = () => {

  const [mesi, setMesi] = useState();
  const [selected, setSelected] = useState();

  useEffect(() => {
    getJsonData(ENDPOINT, (data) => {
      if (data && data.mesi) {
        setMesi(data.mesi);
      }
    });    
  }, [])

  const addSelection = (items) => {
    setSelected(items);
  };

  const isSelected = (index) => {
      return (selected && selected instanceof Array) ? selected.some((elem) => elem.index === index) : false;
  };

  return <>
    {mesi ?
        <Andamento mesi={mesi} isSelected={isSelected} onSelect={addSelection} />
        : null
    }
    {(selected && selected instanceof Array) ? 
        selected.map((sel) => 
          <div key={sel.index}>
            <br/>Posizione: {sel.index}
            <br/>Nome: {sel.nome}
            <br/>importo: {sel.importo?.toLocaleString()} €
          </div>
        )
        : null
    }
  </>;
}

export default AndamentoMensile;
