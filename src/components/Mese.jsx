import React from "react";

const Mese = ({nome, documenti, importo, percentuale, isSelected, onSelect}) => {
    const style = {
        container: {
            display: 'flex', 
            flexFlow: 'column', 
            width: '100%', 
            height: '15vh', 
            border: '1px solid #EBECF0',
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: '500',
            fontSize: '14px',
            lineHeight: '18px'
        },
        title: {
            borderBottom: '1px solid #EBECF0', 
            color: '#0D97D5', 
            textTransform: 'capitalize', 
            padding: '0px 5px'
        },
        content: {
            width: '100%', 
            height: '100%', 
            background: 'linear-gradient(to top, #E0F1EB ' + (percentuale ?? 0) + '%, white 0%)',
            borderBottom: isSelected ? '5px solid #00875A' : '2px solid #C6E7F5',
            marginBottom: isSelected ? '-5px' : '',
            position: 'relative'
        },
        docs: {
            color: '#6F7E86',
            position: 'absolute',
            bottom: '5px',
            left: '5px'
        },
        value: {
            color: '#00875A'
        }
    };

    return (
        <div style={style.container} onClick={onSelect}>
            <div style={style.title}>
                {nome ?? ''}
            </div>
            <div style={style.content}>
                <span style={style.docs}>{documenti ?? 0} doc.<br/>
                    <span style={style.value}>{importo ?? 0} €</span>
                </span>
            </div>
        </div>
    );
}

export default Mese;