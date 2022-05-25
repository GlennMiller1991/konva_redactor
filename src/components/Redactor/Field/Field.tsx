import React, {useCallback, useEffect, useState} from 'react'
import styles from '../../../App.module.css'
import {FreehandRouteDto, FreehandSingleTrackScheduleDto, tDrawingObject} from '../types'
import {UserStage} from '../UserStage'
import {kmPxl, minPxl, UserScale} from '../UserScale'
import {containerId} from '../constants'
import Konva from 'konva'

type tFieldProps = {
    setEditingObject: (object: tDrawingObject) => void
    obj: FreehandSingleTrackScheduleDto | null,
}
export const Field: React.FC<tFieldProps> = React.memo((props) => {
    console.log('field rerender')
    const [stage, setStage] = useState<UserStage | null>(null)
    const [stageSizes, setStageSizes] = useState<{ width: number, height: number }>({
        width: 0, height: 0
    })

    // callbacks
    const changeWidth = useCallback(() => {
        const stageContainer = document.getElementById(containerId)
        if (stageContainer) {
            const {width, height} = stageContainer.getBoundingClientRect()
            console.log(width, height)
            setStageSizes({width, height})
        }
    }, [])
    const onKeyDown = useCallback((event: KeyboardEvent) => {
        if (stage) {
            if (event.key === 'Control') {
                if (stage.draggable()) {
                    stage.draggable(false)
                }
            }
        }

    }, [stage])
    const onKeyUp = useCallback((event: KeyboardEvent) => {
        if (stage && !stage.draggable() && event.key === 'Control') {
            stage.draggable(true)
        }
    }, [stage])

    useEffect(() => {
        if (stage) {
            if (props.obj) {
                const timeDelimeter = 10
                const time = new Array(1440 / timeDelimeter)
                    .fill(0)
                    .map((value, index) => {
                        return index * timeDelimeter
                    })
                const timeCaptions = time.map((value) => String(value))
                const stationsCoords = props.obj.stations.map((station) => {
                    return station.coordinate
                })
                const stationsCaptions = props.obj.stations.map((station) => {
                    return station.name
                })
                new UserScale({
                    chartConfig: {
                        bottomGap: 10,
                        topGap: 0,
                        leftGap: 0,
                        rightGap: 10,
                        strokeColor: 'black',
                        strokeWidth: 1,
                        fillColor: 'rgba(20, 239, 235, 0.3)',
                        fontSize: 12,
                    },
                    stage: stage,
                    hValues: time,
                    vValues: stationsCoords,
                    hCaptions: timeCaptions,
                    vCaptions: stationsCaptions,
                })
                const routes = props.obj.prototypeRoutes
                console.log(routes)
                const firstRoute = routes[0] as FreehandRouteDto
                const layer = new Konva.Layer()
                let lines: Konva.Line[] = []
                for (let i = 0; i < firstRoute.spans.length; i++) {
                    const line = new Konva.Line({
                        points: firstRoute
                            .spans[i]
                            .points!
                            .map((point: number, index: number) => {
                                if (index % 2 === 0) {
                                    return (point + (i === 0 ? 0 : firstRoute.spans[i].a)) * minPxl
                                } else {
                                    return point * kmPxl
                                }
                            }),
                        stroke: 'black',
                        strokeWIdth: 1,
                    })
                    lines.push(line)
                }

                layer.add(...lines)
                stage.add(layer)

            }
        }
    }, [stage, props.obj])
    useEffect(() => {
        changeWidth()
    }, [])
    useEffect(() => {
        if (stage) {
            document.addEventListener('keydown', onKeyDown)
            document.addEventListener('keyup', onKeyUp)
        }

        return () => {
            document.removeEventListener('keydown', onKeyDown)
            document.removeEventListener('keyup', onKeyUp)
        }
    }, [stage])

    return (
        <>
            <div id={'stageContainer'}
                 className={styles.field}
                 ref={(node) => {
                     if (!stage) {
                         if (node && stageSizes.width && stageSizes.height) {
                             const field = new UserStage({
                                 container: 'stageContainer',
                                 width: stageSizes.width,
                                 height: stageSizes.height,
                                 draggable: true,
                             })
                             setStage(field)
                         }
                     }
                 }}
            >
                Field
            </div>
            {
                stage &&
                <div className={styles.controlPanel}>
                    <button onClick={() => {
                        stage!.fitBounds('x')
                    }}>
                        X
                    </button>
                    <button onClick={() => {
                        stage!.fitBounds('y')
                    }}>
                        Y
                    </button>
                </div>
            }
        </>
    )
})

