import voices from "./backend/voices.js";
import VoiceFactory from "../domain/factory/VoiceFactory.js";

class VoicesApi {
  getVoices() {
    return voices.map(voice => VoiceFactory.getVoiceForList(voice));
  }
}
export default new VoicesApi();
