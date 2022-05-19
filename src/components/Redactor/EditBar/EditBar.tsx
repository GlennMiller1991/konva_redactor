import React from 'react'
import styles from '../../../App.module.css'

type tEditBarProps = {
    object: any,
}
export const EditBar: React.FC<tEditBarProps> = React.memo(({
                                                                object,
                                                            }) => {

    return (
        <div className={styles.editbar}>
            {
                object &&
                <button onClick={() => {
                    object.destroy()
                }}>
                    Удалить
                </button>
            }
        </div>
    )
})