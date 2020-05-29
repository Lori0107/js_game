# Ninjas Fight - Battle game
A simple battle game in Javascript.

## Table of Contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
This game is a turn by turn battle to death between 2 ninjas.
To create this project, we had to respect some game rules.

  #### Map's generation
  When the map is generated, we have to place randomly on it:
  - Boxes that can be empty or inaccessibled.
  - Two ninjas that can't start the game side by side.
  - At least, 4 types of weapons (Weapons carried by ninjas included).

  #### Ninjas moves
  Each turn, a ninja can moves from 1 to 3 boxes (horizontally or vertically) before ending his turn.
  He can't pass throught an accessibled box.
  If he pass above a box containing a weapon, he leaves his actual weapon on that spot and replaces it by the new one.

  #### Fight !
  If the ninjas are side by side (horizontally or vertically), the fight begins !
  - Each in turn attacks
  - Damage inflicted depends on the weapon owned by the ninja
  - The ninja can choose to attack or defend against the next hit
  - When the ninja defends, it takes 50% less damage than normal
  - As soon as a ninja's hit points (initially 100) drop to 0, that player loses. A message is displayed and the game is over.

## Technologies
Project is created with:
* HTML
* CSS
* Javascript

## Setup
To run this project, install it locally using npm:

```
$ cd /the_project_file_name
$ npm install
$ npm start (run the live-server)
```