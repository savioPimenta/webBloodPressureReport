import React, { useState, useEffect } from 'react';


import Fire from '../../config/Fire'
import UserItem from '../../components/UserItem'
import Chart from '../../components/Chart'
import InfoContext from '../../providers/InfoProvider'

export default function Dashboard() {
    const [usuarios, setUsuarios] = useState([]);
    useEffect(async () => {
        var relatorios = [];
        const db = Fire.firestore();
        const userRef = await db.collection("users").orderBy('date').get().then(querySnapshot => {
            querySnapshot.forEach(function (doc) {
                relatorios.push({
                    date: doc.data().date,
                    email: doc.data().email,
                    fc: doc.data().fc,
                    has: doc.data().has,
                    pMax: doc.data().pMax,
                    pMin: doc.data().pMin,
                    rni: doc.data().rni,
                    glicemia: doc.data().glicemia,
                });
            })

        });
        // Percorre todos os dados
        var arraySecundario = []
        relatorios.forEach((item, i) => {
            var email = item.email
            if (arraySecundario.length > 0) {
                var hasEmail = false
                arraySecundario.forEach(user => {
                    if (user.email === email && user.valor[0] != item) {
                        hasEmail = true
                        user.valor.push(item)
                    }
                })
                if (hasEmail === false) {
                    arraySecundario.push({
                        "email": email,
                        "valor": [item],
                    })
                }
            } else {
                arraySecundario.push({
                    "email": email,
                    "valor": [item],
                })
            }
        })
        handleSetUsuarios(arraySecundario)
    }, []);

    function handleSetUsuarios(newUser, index) {
        setUsuarios([newUser])
    }
    return (
        <div className="body-wrapper">
            <div className="left-scroll">
                <div className="header-bar">
                    <div className="header-content" onClick={() => { console.log(usuarios) }}>
                        <span>Dr. Fabrício Pelucci</span>
                    </div>
                </div>
                {usuarios.flat(1).map((user, i) => {
                    return (
                        <UserItem
                            key={i}
                            user={user}
                        />
                    );
                })}
            </div>
            <Chart />
        </div>
    );
}
