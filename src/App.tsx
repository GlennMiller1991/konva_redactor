import React, {useEffect, useState} from 'react'
import styles from './App.module.css'
import {Redactor} from './components/Redactor/Redactor'
import {serverAPI} from './api'
import data from './data/data.json'
import {FreehandScheduleDto, FreehandSingleTrackScheduleDto} from './components/Redactor/types'

function App() {
    const [obj, setObj] = useState<FreehandScheduleDto | null>(null)
    const [sTS, setSTS] = useState<FreehandSingleTrackScheduleDto | null>(null)

    useEffect(() => {
        // запусти сервер
        serverAPI.getShedule()
            .then(res => res.json())
            .then(res => {
                setObj(res)
            })
    }, [])

    return (
        <div className={styles.app}>
            <h1 className={styles.header}>Konva</h1>
            {obj &&
                <div>
                    {
                        obj.singleTrackSchedules.map((sTS, index) => {
                            return (
                                <button key={index}
                                        onClick={() => {
                                            setSTS(sTS)
                                        }}>
                                    {index + 1}
                                </button>
                            )
                        })
                    }
                </div>
            }
            <Redactor object={sTS}/>
        </div>
    )
}

export default App

