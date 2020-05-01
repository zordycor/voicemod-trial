import voices from './backend/voicesData.js'
import VoiceFactory from '../domain/factory/VoiceFactory.js'

class VoicesApi {
  getVoices(params) {
    const response = voices
      .map(voice => VoiceFactory.getVoiceForList(voice))
      .filter(
        voice =>
          !(
            (params.name && !voice.name.toLowerCase().includes(params.name)) ||
            (params.tag && !voice.tags.includes(params.tag))
          )
      )
    return params.order == 'asc' ? response.sort() : response.sort().reverse()
  }
}
export default new VoicesApi()
