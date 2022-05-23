import React, {useCallback, useEffect, useState} from 'react'
import styles from '../../../App.module.css'
import {tDrawingObject} from '../types'
import {UserStage} from '../UserStage'
import {UserScale} from '../UserScale'

type tFieldProps = {
    setEditingObject: (object: tDrawingObject) => void
    obj: any,
}
export const Field: React.FC<tFieldProps> = React.memo((props) => {
    console.log('field rerender')

    const [stage, setStage] = useState<UserStage | null>(null)
    const [stageSizes, setStageSizes] = useState<{width: number, height: number}>({
        width: 0, height: 0
    })

    // callbacks
    const changeWidth = useCallback(() => {
        const stageContainer = document.getElementById('stageContainer')
        if (stageContainer) {
            const {width, height} = stageContainer.getBoundingClientRect()
            setStageSizes({width, height})
        }
    }, [])

    useEffect(() => {
        if (stage) {
            const scale = new UserScale({
                name: 'scale',
                stage: stage,
            })
        }
    }, [stage, props.obj])
    useEffect(() => {
        changeWidth()
        document.addEventListener('resize', changeWidth)

        return () => {
            document.removeEventListener('resize', changeWidth)
        }
    }, [])

    return (
        <div id={'stageContainer'}
             className={styles.field}
             style={{
                 border: '3px solid black'
             }}
             ref={(node) => {
                 if (!stage) {
                     if (node && stageSizes.width && stageSizes.height) {
                         const field = new UserStage({
                             container: 'stageContainer',
                             width: stageSizes.width,
                             height: stageSizes.height,
                         })
                         field.on('click', (event) => {
                             props.setEditingObject(null)
                             event.cancelBubble = true
                         })
                         setStage(field)
                     }
                 }
             }}
        >
            Field
        </div>
    )
})

