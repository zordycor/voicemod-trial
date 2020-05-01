export default class Voice {
  constructor(VoiceData) {
    this.id = VoiceData.id
    this.name = VoiceData.name
    this.icon = VoiceData.icon
    this.tags = VoiceData.tags
    this.fav = false
  }
}
