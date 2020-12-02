# voicer
A cloud-based software that transcribes speech to text.

Designed for hearing impaired people to communicate with their friends more easily.

![demo screenshot](https://i.imgur.com/X0M8uz5.jpg)

## summary
Voicer is a speech-to-text solution that takes your microphone input, transcribes it to text and broadcasts the text to your connected friends.
It uses the Web Speech API which is currently only available in **Google Chrome**. It's secured through HTTPS/SSL and respects everyone's privacy, no data is stored nor shared with third-parties.

## demo
1. Visit in Google Chrome: https://nevolin.be/voicer/?room=public
2. Allow microphone access.
3. Choose your username, click submit.
4. Start talking. It may help to speak loudly in phrases, not just single words.
5. You will start seeing your words or sentences being transcribed into text.

## basic usage
You can freely use the demo url, or you can host this software on your own server.

Make sure to change the room ID in the URL to a more complex one if you wish to enjoy some privacy.
Everyone who connects to the same room will see each other's texts.

### even while gaming
There are several methods for seeing the chat while gaming:

1. You can put your mobile device next to your computer screen to follow the conversation.
2. You can use a second screen.
3. Always-on-top tools such as [Pennywise](https://github.com/kamranahmedse/pennywise) may help, but the microphone feature doesn't seem to work so it's only good for reading.

## advanced usage

### tech stack
The service is built using NodeJS for the back-end using Express and SocketIO libraries. On the front-end we use the Web Speech API, SocketIO, JavaScript and jQuery.
If you wish to host the service yourself, or you're a developer then you'll need nodeJS v12 or higher. Having a SSL certificate is mandatory.

Use `node server.js` to launch the service script.

To keep it running 24/7 use a library like PM2 and execute: `pm2 start ecosystem.config.js`

### Language selection
By default it's set to English `en-US` (BCP-47 code) but there a ton of different languages supported. Setting a default prefered language is done in `js/index.js` using `recognition.lang = 'en-US'`. Ideally each client user should do that themselves through the website, but for now it's being hardcoded. A list of all supported langauges: https://cloud.google.com/speech-to-text/docs/languages

## notes
Web Speech API is still an experimental API, it works fine but it's not great yet.

For some unkown reason the API may stop working after several seconds/minutes/hours. We have a re-start mechanism in the code, but if that doesn't help then always try refreshing and reconnecting the page once.

### mobile
On Android you have to keep the Chrome window open at all times, if you minimize or sleep your phone, the API stops working - you'll have to refresh and reconnect again. I haven't tested it on iOS yet.

## support
For enquiries or issues get in touch with me:

Name: Ilya Nevolin

Email: ilja.nevolin@gmail.com

Discord: https://discord.gg/ApdTMG9
