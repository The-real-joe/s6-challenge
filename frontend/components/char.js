import React from 'react';
import Styled from 'styled-components';
import App from "./App"

export default function Char({name, homeworld}){
    return (
        <div className='character-card'>
            <h3 className='character-name'>{name}</h3>
            <p className='character-planet'>planet:{homeworld}</p>
        </div>
    )
}