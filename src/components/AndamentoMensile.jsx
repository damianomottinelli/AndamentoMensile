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

  useEffect(() => {
    console.log(selected);
  }, [selected])

  const addSelection = (...items) => {
    setSelected(items);
  };

  return <>
    {mesi ?
        <Andamento mesi={mesi} selected={selected} onSelect={addSelection} />
        : <></>
    }
    {(selected && selected instanceof Array) ? 
        selected.map((sel) => 
          <>
            <br/>Posizione: {sel.index}
            <br/>Nome: {sel.nome}
          </>
        )
        : <></>
    }
  </>;
}

export default AndamentoMensile;
