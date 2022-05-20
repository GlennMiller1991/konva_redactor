import React, {useEffect} from 'react'
import styles from './App.module.css'
import {Redactor} from './components/Redactor/Redactor'
import {serverAPI} from './api'

function App() {

    useEffect(() => {
        serverAPI.getShedule()
            .then((res) => {
                console.log(res)
            })
    }, [])

    return (
        <div className={styles.app}>
            <h1 className={styles.header}>Konva</h1>
            <Redactor objects={[]}/>
        </div>
    )
}

export default App

