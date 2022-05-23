import React, {useEffect, useState} from 'react'
import styles from './App.module.css'
import {Redactor} from './components/Redactor/Redactor'
import {serverAPI} from './api'
import data from './data/data.json'
import {FreehandScheduleDto} from './components/Redactor/types'

function App() {
    const [obj, setObj] = useState<any>(null)


    useEffect(() => {
        // запусти сервер
        serverAPI.getShedule()
            .then(res => res.json())
            .then(res => {
                if (res.status !== 200) {
                    setObj(data as unknown as FreehandScheduleDto)
                }
            })
    }, [])

    return (
        <div className={styles.app}>
            <h1 className={styles.header}>Konva</h1>
            <Redactor object={obj}/>
        </div>
    )
}

export default App

