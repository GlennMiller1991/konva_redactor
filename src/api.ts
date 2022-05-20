const baseUrl = 'http://localhost:7082/api/v1'

export const serverAPI = {
    getShedule() {
        return fetch(`${baseUrl}/motion-schedule/new`, {
            method: 'POST',
            mode: 'cors',
            // @ts-ignore
            headers: {
                'userInfo': JSON.stringify({
                    'id': 18,
                    'name': 'KosarevAB',
                    'permission': {
                        'isMainAdminRole': 'true',
                        'isEditorRole': 'true',
                        'isCalculateRole': 'true',
                        'isReaderRole': true,
                        'canEditUser': 'true'
                    }
                }),
                'Content-type': 'application/json',
            },
        })
    }
}
