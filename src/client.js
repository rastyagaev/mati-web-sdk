export const API_BASE = 'https://api.mati.io/v1'

class MatiSDK {
  constructor({ clientId, apiBase = API_BASE }) {
    this.clientId = clientId
    this.apiBase = apiBase
  }

  _apiFetch(endpoint, params = {}) {
    const headers = {
      Accept: 'application/mati.v1.hal+json',
      Authorization: `Bearer ${this.clientId}`
    }
    return fetch(this.apiBase + endpoint, { headers, ...params }).then(
      response => response.json()
    )
  }

  createIdentity(photo) {
    const body = new FormData()
    body.append('photo', photo, 'photo.jpg')

    return this._apiFetch('/identities', { method: 'POST', body })
  }

  uploadDocumentFrontSide(identityId, type, photo) {
    const body = new FormData()
    body.append('type', type)
    body.append('picture', photo, 'photo.jpg')
    body.append('side', 'front')

    return this._apiFetch(`/identities/${identityId}/documents`, {
      method: 'POST',
      body
    })
  }

  uploadDocumentBackSide(documentId, photo) {
    const body = new FormData()
    body.append('picture', photo, 'photo.jpg')
    body.append('side', 'back')

    return this._apiFetch(`/documents/${documentId}`, {
      method: 'PUT',
      body
    })
  }

  getDocument(documentId) {
    return this._apiFetch(`/documents/${documentId}`)
  }

  getIdentity(identityId) {
    return this._apiFetch(`/identities/${identityId}`)
  }
}

export default MatiSDK
