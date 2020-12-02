# voicer
A cloud-based software that transcribes speech to text, designed for hearing impaired people to communicate with their friends more easily.

## summary
Voicer is a speech-to-text solution that takes your microphone input, transcribes it to text and broadcasts the text to your connected friends.
It uses the Web Speech API which is currently only available in **Google Chrome**.

## demo
1. Visit in Google Chrome: https://nevolin.be/voicer/?room=public
2. Allow microphone access.
3. Choose your username, click submit.
4. Start talking. It may help to speak loudly in phrases, not just single words.
5. You will start seeing your words or sentences being transcribed into text.

### screenshot
![demo screenshot](https://i.imgur.com/X0M8uz5.jpg)

## basic usage
You can freely use the demo url, or you can host this software on your own server.

Make sure to change the room ID in the URL to a more complex one if you wish to enjoy some privacy.
Everyone who connects to the same room will see each other's texts.

## advanced usage
If you wish to host the service yourself, or you're a developer then you'll need nodeJS v12 or higher.

Use `node server.js` to launch the service script.

To keep it running 24/7 use a library like PM2 and execute: `pm2 start ecosystem.config.js`

## notes
Web Speech API is still an experimental API, it works fine but it's not great yet.

For some unkown reason the API may stop working after several seconds/minutes/hours. We have a re-start mechanism in the code, but if that doesn't help then always try refreshing and reconnecting the page once.

### mobile
On Android you have to keep the Chrome window open at all times, if you minimize or sleep your phone, the API stops working - you'll have to refresh and reconnect again. I haven't tested it on iOS yet.
