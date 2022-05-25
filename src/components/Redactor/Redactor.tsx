import React, {useEffect, useState} from 'react'
import styles from '../../App.module.css'
import {Field} from './Field/Field'
import {EditBar} from './EditBar/EditBar'
import {FreehandSingleTrackScheduleDto, tDrawingObject} from './types'

type tRedactorProps = {
    object: FreehandSingleTrackScheduleDto | null,
    redactorClassName?: '',
}
export const Redactor: React.FC<tRedactorProps> = React.memo(({
                                                                  object,
                                                                  redactorClassName,
                                                              }) => {
    const [allObjects, setAllObjects] = useState<FreehandSingleTrackScheduleDto | null>(object)
    const [currentObject, setCurrentObject] = useState<FreehandSingleTrackScheduleDto | null>(null)

    useEffect(() => {
        setAllObjects(object)
    }, [object])

    return (
        <div className={`${styles.redactor} ${redactorClassName}`}>
            <Field setEditingObject={setCurrentObject} obj={allObjects}/>
            <EditBar object={currentObject}/>
        </div>
    )
})