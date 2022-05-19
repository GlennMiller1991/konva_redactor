import React, {useEffect, useState} from 'react'
import styles from '../../App.module.css'
import {Field} from './Field/Field'
import {EditBar} from './EditBar/EditBar'
import {tDrawingObject} from './types'

type tRedactorProps = {
    objects: Array<tDrawingObject>
    redactorClassName?: '',
}
export const Redactor: React.FC<tRedactorProps> = React.memo(({
                                                                  objects,
                                                                  redactorClassName,
                                                              }) => {
    const [allObjects, setAllObjects] = useState<Array<tDrawingObject>>(objects)
    const [currentObject, setCurrentObject] = useState<tDrawingObject | null>(null)

    useEffect(() => {
        setAllObjects(allObjects)
    }, [objects])

    return (
        <div className={`${styles.redactor} ${redactorClassName}`}>
            <Field setEditingObject={setCurrentObject}/>
            <EditBar object={currentObject}/>
        </div>
    )
})