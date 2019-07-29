# MTPunchOUt
MTPunchOut is a basic Javascript remake of Mike Tyson's Punch Out.  It is a single player multi-level boxing game that offers a few challenges as play through the first few times.


## Website:
[MTPunchOut - Game](https://devcwilkey.github.io/MTPunchOut/)

[MTPunchOut - GitHub](https://github.com/devcwilkey/MTPunchOut)


### How-To Play:
Under the website links (above) click the Game link.
1. When loaded, clients will click a single character to act as "Their" Boxer.
2. Once "Their" boxer is selected they will choose 3 more boxers to act as "Defenders".
3. At the start of the fight; the Defender Attack and Counter Attacks are randomly calculated and you will not know their values until you throw the first punch of htat round.
4. Fight Mechanics:
   - Jab: Uses your "current" attack power.
      - Each Jab adds the original attack power to the current attack power.
   - Uppercut: Available when attack power reaches 20.
      - When the Uppercut is used it will hit with 1.5 x the Current Attack Power but cut the Attack Power value to half of it's original.
5. If you keep losing, consider saving your Uppercut until the last Defender.


### Technologies used:
- HTML
- CSS (Bootstrap)
- Javascript


### Contributions:
- Craig Wilkey [GitHub Profile](https://github.com/devcwilkey)
  - Primary Developer for Project
  - Built during Full Stack Web Developer BootCamp
