import React from 'react'
import styles from './App.module.css'
import {Redactor} from './components/Redactor/Redactor'

function App() {
    return (
        <div className={styles.app}>
            <h1 className={styles.header}>Konva</h1>
            <Redactor objects={[]}/>
        </div>
    )
}

export default App

