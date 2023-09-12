import React from 'react'

export default function GeneralInfo({ autocompleteObj }) {
    return (
        <>
            <h1 className='display-6'>{autocompleteObj.LocalizedName}</h1>
        </>
    )
}
