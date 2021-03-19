# Pre-work - *Memory Game*

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program. 

Submitted by: Claude Yan

Time spent: 5 hours spent in total

Link to project: (https://glitch.com/edit/#!/codepath-intern-prework)

## Required Functionality

The following **required** functionality is complete:

* [x] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
* [x] "Start" button toggles between "Start" and "Stop" when clicked. 
* [x] Game buttons each light up and play a sound when clicked. 
* [x] Computer plays back sequence of clues including sound and visual cue for each button
* [x] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess. 
* [x] User wins the game after guessing a complete pattern
* [x] User loses the game after an incorrect guess

The following **optional** features are implemented:

* [x] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
* [x] Buttons use a pitch (frequency) other than the ones in the tutorial
* [x] More than 4 functional game buttons
* [x] Playback speeds up on each turn
* [x] Computer picks a different pattern each time the game is played
* [x] Player only loses after 3 mistakes (instead of on the first mistake)
* [x] Game button appearance change goes beyond color (e.g. add an image)
* [x] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
* [x] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

- [x] Match history
- [x] User can pick number of lives
- [x] User can pick number of rounds

## Video Walkthrough

Here's a walkthrough of implemented user stories:
- Setting number of strikes + Setting number of rounds + Playing and winning game + Match history

<img src="http://g.recordit.co/vjQHKSPF5f.gif" width=1000><br>
- Letting timer run out and losing

<img src="http://g.recordit.co/FMCNBST3y4.gif" width=1000><br>


## Reflection Questions
1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here. 
- w3schools
- GeeksforGeeks

2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words) 

The most challenging part of the pre work was setting up the optional timer feature. At first, my intervals (for decrementing the displayed timer and counting down the internal time limit of 10 seconds) were being set basically instantly, which means the countdown started when the computer started playing the pattern. Obviously this was wrong because I wanted the countdown to start after the computer played an entire clue sequence. In order to fix this, I ran through what would happen in the code step by step, keeping track of what variables appeared where and what functions took place and when. I realized that I was operating under the assumption that setTimeout() was an async function, which was not the case. I realized that I could use the “delay” variable in the playClueSequence function to set my interval because its end value (after the for loop) would be the time it would take to play an entire clue sequence. I used a setTimeout function in conjunction with the delay variable to determine when my interval would be set. 
The next step was determining when to clear  the interval. This was a little confusing until I realized that the endgame for all “paths” of  the game (win, lose, manually stop, etc.) included calling the stopGame function, so that’s where I cleared my intervals.
One of the final issues I had was that manually stopping the game didn’t stop the intervals from being set (with the setTimeout in the playClueSequence function). To fix this, I learned about the clearTimeout function, which turned out to be pleasantly similar to clearInterval, and called that in the stopGame function as well.
Throughout the course of the project, the main problem I kept running into was not knowing Javascript syntax for things I wanted to do. For example, I had to look up how to insert table rows into HTML tables using Javascript; I also had to research HTML audio tags and changing image sources using Javascript. All issues I faced during this project were able to be overcome with just a little bit of patience and perseverance. 


3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words)

The biggest question I have is how to implement multi-user systems. In the case of the app, if there were two people on the same page, how would I make it so that one user can see in real time what buttons the other user is pressing. I suppose the best example would be Google Drive, where users can see changes that other users make without having to refresh the page. Another example would be Figma, where users can literally see other users drawing highlighting and selecting things. I guess the more specific question would be how to implement real time updating multi-user systems. Also, having some experience with React, I wonder if there's any situation where it would be objectively better to use HTML/CSS/Javascript over React because React just seems so much more intuitive and easy to use.

4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words) 

I enjoy doing things with other people, so the main thing I would look into would be implementing a multiplayer option for users where they can see who can last the longest in a sort of “survival” mode (the pattern length would keep increasing until only 1 player remained). Speaking of different game modes, I think It would be especially cool to have a battleship-style gamemode where your opponent clicks a sequence of buttons and you have to figure out that sequence using only audio or visual cues. (instead of both changing image and playing audio when pressed, the button would only do one). I would also set up a system so that the user could choose how many game buttons they want to play with and which icons/audio the buttons would have (I would essentially upload a bank of images and audio files that the user could choose from and design a user-friendly interface so it's not too grueling to customize). Speaking of backend, I would also set up a database that would store the user’s match history so that it doesn’t reset every page reload. Lastly, I would make it so that the user could share their match history, or even get playbacks of their games and share those, on social media or group chats with their friends.



## License

    Copyright Claude Yan

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
