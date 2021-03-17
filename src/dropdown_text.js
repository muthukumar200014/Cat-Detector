import React from "react"
import Select from 'react-select'

function Animal()
{
    var animal = [
    {
        value:1,
        label:"Cat"
    },
    {
        value:2,
        label:"Dog"
    }
    ];
    return(
    <div>
        <Select options={animal}/>
    </div>
    );
}
export default Animal;