
## Sound effect sources

Recorded radio sounds (sfx-press.mp3, sfx-beep.mp3, sfx-click.mp3, sfx-tail.mp3, sfx-static.mp3) are
trimmed/faded derivatives of files downloaded 2026-11-23 from Pixabay (pixabay.com),
used under the Pixabay Content License (https://pixabay.com/service/license-summary/):
free to use, commercial use allowed, no attribution required, modification allowed.
The license does not allow selling or distributing the raw files standalone.

- sfx-press.mp3: "Radio" by ALEXIS_GAMING_CAM - the key-up / talk-permit sound,
  chosen by the owner
  https://pixabay.com/sound-effects/film-special-effects-radio-338296/
- sfx-beep.mp3: single blip cut from "beep...beep...beep.." by freesound_community
  https://pixabay.com/sound-effects/film-special-effects-beepbeepbeep-53921/
  (used for the courtesy/repeater beep only)
- sfx-click.mp3: "Button Click" by ToneMarrow
  https://pixabay.com/sound-effects/film-special-effects-button-click-514785/
- sfx-tail.mp3 and sfx-static.mp3: "Radio Static" by freesound_community
  https://pixabay.com/sound-effects/film-special-effects-radio-static-6382/
- sfx-release.mp3: "Radio Beep 2" by backroomsaudiouoloads - the roger beep when the
  talk button is released (trimmed)
  https://pixabay.com/sound-effects/technology-radio-beep-2-487087/
- sfx-incoming.mp3: double beep built from "088524_Walkie Talkie" by freesound_community
  (pitch-shifted and repeated) - the incoming-transmission sound when another unit
  starts talking. Placeholder pending the owner's own clip.
  https://pixabay.com/sound-effects/film-special-effects-walkie-talkie-83500/

If a recording fails to load, the app falls back to tones synthesized in-browser with
WebAudio (the talk-permit fallback is an MDC-style data chirp + triple permit beep,
built from scratch). Voice filtering is synthesized. No Motorola recordings are used. Third-party sound effects are licensed as listed above.


## Agency access and prototype limits
Agencies have no public directory. App admins are allowlisted by Firebase UID in appAdmins/{uid}, created only by the project owner in the Firebase console. A local owner code is NOT authority to verify an agency. The app admin verifies out-of-band, then assigns the agency owner UID using Settings > Official agencies > Account and agency admin. Give that owner the agency ID, which alone grants nothing. Owners create random 128-bit invite links with expiry and per-invite max uses. Redemption increments uses and creates membership atomically. Member removal rotates a random 256-bit agency secret in the same transaction; remaining online apps disconnect and rejoin the new secret-derived namespace. No cached/offline agency admission. Secret sharing remains possible; this is not server-authenticated voice. Old modified clients can keep communicating on an old namespace but cannot derive the new namespace without the new secret. Rotation is not retroactive deletion. Per-invite maxUses is enforced; total membership is a soft cap because multiple invites can be created. Anonymous account access is tied to this browser; clearing data loses it. Requests and membership metadata are stored; incoming voice can be recorded locally by listeners for replay.

## Generated short tone files
All tones/press1.wav through press9.wav, release1.wav through release9.wav, and incoming1.wav through incoming9.wav are original synthesized waveforms generated for this app, not third-party samples. No attribution requirement or third-party license. Press/release under 0.4 seconds, incoming under 0.6 seconds, 16kHz mono PCM. The app embeds the waveform generator, so all 27 sounds work offline without downloading files. No external samples are used. Existing owner-supplied clips remain available; Clip 2 and Clip 3 are long source clips and are marked as such. Press defaults to Original; release to owner Clip 1; incoming to owner Clip 4.

Channel reference: https://support.zello.com/zc/channel-moderation-guidelines describes public/open and password-protected Zello channels. This app implements random channel IDs and optional password-derived peer namespaces, not Zello accounts or their server authorization. Never claim equivalent security.


## Device-local voice replay (v39)
Changed from live-only at the owner's request. Each new client shows a recording disclosure before joining. Incoming voice from replay-aware clients may be saved to IndexedDB on the listener's browser, never uploaded as a recording. Last 20 per channel, 100 total, 25 MiB total, 60-second/2-MiB cap per transmission. Old entries are pruned automatically; browser eviction or private mode can lose recordings. Controls turn new saving off, delete one recording, delete current channel or delete all local recordings. These controls cannot delete someone else's copies. Busy mode mutes live voice and marks locally received recordings queued for later; app must stay open and connected, not offline delivery or reliable background service. Legacy clients without the notice-aware handshake are not recorded by this version. Network members or modified clients can independently record, so never promise confidentiality or remote deletion. No legal compliance claim.


## Free team tools (v40)
Yes/no polls and check-in/out presence are sent to currently connected channel peers using the live data channel, not uploaded to Firestore. They disappear on reload and late joiners do not receive old polls or attendance. Votes are one per connected peer, not verified per person; reconnecting can create a new peer identity. Limit 20 polls/session and 30 tool events/minute per sender. Check-in/out computes your own elapsed time using the device clock, stores up to 100 sessions per channel locally, and can be deleted. It is not a payroll/official attendance system. Private notes are capped at 4,000 characters per channel in localStorage, save/delete only, never broadcast or uploaded. Browser data deletion loses notes/hours.


## Local outgoing voice effects (v41)
Normal (default), deep, high, robot and radio process the microphone locally before outgoing live audio. No server processing or audio upload service. Deep/high use two overlapping delay grains in a ScriptProcessor fallback, with roughly 50-100ms processing latency and possible artifacts. Robot uses ring modulation, radio uses filters and soft distortion. Not identity protection, not impersonation models, no voice cloning. Normal bypasses effects; choose it on older devices if audio crackles. Receiver-side Radio FX remains a separate listening effect.


## Creation options (v42)
Event staff, work crew, family/friends, volunteer, RP server, other presets with name/password, a 300-character purpose/rules note, a creator-only client gate, local expiry and device mute-on-join. RP is fictional only, suggested channel names are not game/server integrations. Create one channel at a time. Creator-only talk is a client-side courtesy gate, not secure media authorization; modified clients bypass it. Local expiry hides/stops joins in this app, not hard deletion or remote revocation. Metadata and other peers/recordings are not deleted. Rules/options are stored as channel metadata, not audio. Mute-on-join is this device's preference, reversible in the channel.


## Press sound restoration (v45)
Restored existing devices to Original press selection once. The original sfx-press.mp3 asset is unchanged from its first upload. Removed the legacy synthetic fallback that concatenated a data chirp and triple permit beep; if decoding is not ready, play the selected file directly instead. Incoming Clip 4 remains receiver-only. Release Clip 1 remains unchanged.


## Foreground audio and channel floor (v46)
Background visibility/pagehide/unload stops mic tracks, peer media, scan sessions, replay playback and AudioContext. Returning requires reopening a channel, not automatic microphone reacquisition. Pending permission results are discarded and stopped if they resolve after backgrounding. Mobile OS session release timing still needs device testing; browser cleanup cannot force another app's permission/session behavior. Sound effects and their previews are 30% quieter; voice/replay volume is unchanged. Standard clients block TALK while a floor holder exists. Simultaneous claims within the first 300ms use peer-ID tie-break and 150ms pre-unmute arbitration. Dispatcher mode cannot bypass an established busy floor; this reduces overlap but is not a server-enforced floor, modified clients and network delays can bypass/race it. Speaker disconnect clears the floor when its data connection closes; a silent half-open link may need reconnect.

## Foreground calls and output volume (v47)
Call person is in People here. Panic is a confirmed channel alert to current connected non-scanner members, not emergency dispatch. Both use peer data messages, not push: foreground connected apps only, no offline queue, guaranteed delivery, or locked/closed-phone ringing. Receipt is automatic on receipt; acknowledgment is an explicit user tap. Ten-second sender and per-sender receiver throttles; personal mute blocks calls and Busy/incoming-muted receives silently. Original locally generated dispatch two-tone, selective call and soft pulse choices appear in Sounds. No copied assets or new services/costs. Overall output starts at 45% with a 0-100% control for voice, replay and effects. Web Audio voice/effects pass a peak compressor before overall gain; Replay is routed through the same Web Audio compressor where supported. HTML audio fallback/scan uses overall volume attenuation. This is not a calibrated hearing-protection limiter; device/headphone volume still matters. Added guards against pending joins/late incoming media restarting audio after background cleanup, including retry callbacks after a foreground return.
