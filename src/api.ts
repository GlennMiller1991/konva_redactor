const baseUrl = 'http://localhost:7082/api/v1'

export const serverAPI = {
    getShedule(trackId: number = 13, locomotiveCurrent = 'ALTERNATING_CURRENT') {
        return fetch(
            `${baseUrl}/motion-schedule/new?trackId=${trackId}&locomotiveCurrent=${locomotiveCurrent}`,
            {
                method: 'POST',
                mode: 'cors',
                // @ts-ignore
                headers: {
                    'userInfo': JSON.stringify(
                        {
                            'id': 21,
                            'name': 'asmisloff',
                            'permission': {
                                'isMainAdminRole': 'true',
                                'isEditorRole': 'true',
                                'isCalculateRole': 'true',
                                'isReaderRole': true,
                                'canEditUser': 'true'
                            }
                        }
                    ),
                    'Content-type': 'application/json',
                },
            })
    }
}
