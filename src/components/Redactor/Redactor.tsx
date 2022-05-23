import React, {useEffect, useState} from 'react'
import styles from '../../App.module.css'
import {Field} from './Field/Field'
import {EditBar} from './EditBar/EditBar'
import {tDrawingObject} from './types'

type tRedactorProps = {
    object: tDrawingObject,
    redactorClassName?: '',
}
export const Redactor: React.FC<tRedactorProps> = React.memo(({
                                                                  object,
                                                                  redactorClassName,
                                                              }) => {
    const [allObjects, setAllObjects] = useState<tDrawingObject>(object)
    const [currentObject, setCurrentObject] = useState<tDrawingObject | null>(null)

    useEffect(() => {
        setAllObjects(allObjects)
    }, [object])

    return (
        <div className={`${styles.redactor} ${redactorClassName}`}>
            <Field setEditingObject={setCurrentObject} obj={allObjects ? allObjects.singleTrackSchedules[0] : ''}/>
            <EditBar object={currentObject}/>
        </div>
    )
})