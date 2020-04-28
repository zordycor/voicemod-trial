import Voice from "@/domain/models/Voice.js";

class VoiceFactory {
  getVoiceForList(voiceData) {
    return new Voice({
      id: voiceData.id,
      name: voiceData.name,
      icon: voiceData.icon,
      tags: voiceData.tags
    });
  }
}

export default new VoiceFactory();
