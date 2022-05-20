import React, {useCallback, useEffect, useState} from 'react'
import styles from '../../../App.module.css'
import {tDrawingObject} from '../types'
import Konva from 'konva'
import {UserShape} from '../UserShape'
import Stage = Konva.Stage
import {UserStage} from '../UserStage'

type tFieldProps = {
    setEditingObject: (object: tDrawingObject) => void
}
export const Field: React.FC<tFieldProps> = React.memo((props) => {
    console.log('field rerender')

    const [stage, setStage] = useState<Stage | null>(null)
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
            const layer = new Konva.Layer()
            const circle = new UserShape({
                x: stage.width() / 2,
                y: stage.height() / 2,
                radius: 70,
                fill: 'red',
                stroke: 'black',
                strokeWidth: 4,
            })
            layer.add(circle)
            stage.add(layer)
            layer.draw()
        }
    }, [stage])
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

