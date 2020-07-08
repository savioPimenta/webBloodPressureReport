import React, { useEffect, useState, useContext } from 'react'

import './UserItem.css'

import InfoContext from '../providers/InfoProvider'


export default function UserItem(props) {
    const { setDados } = useContext(InfoContext);

    return (
        <div className="user-item" onClick={() => {
            setDados(props)
        }}>
            <div className="user-email">
                <span>{props.user.email}</span>
            </div>
        </div>
    );
}
