import React from 'react'
export default function GeneralInfo({ autocompleteObj }) {
    return (
        <div>
            <h1 className='display-6'>{autocompleteObj.LocalizedName}</h1>
        </div>
    )
}
