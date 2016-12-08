(function() {
     function SongPlayer(Fixtures) {
        var SongPlayer = {};
         /**
        * @desc stores the current album data by using the Fixtures service to retrieve album info
        * @type {Object}
        */
        var currentAlbum = Fixtures.getAlbum();
        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;
        
        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */ 
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
        }
 
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
 
            SongPlayer.currentSong = song;
        };
        
        /**
        * @function playSong
        * @desc Plays the currentBuzzObject
        * @param {Object} song
        */ 
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;  
        };
         
         /**
        * @function getSongIndex
        * @desc gets the index of a song
        * @param {Object} song
        * @returns {Number}
        */ 
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
         
        /**
        * @desc active song object from list of songs
        * @type {Object}
        */
       SongPlayer.currentSong = null;
         
         /**
        * @function SongPlayer.play
        * @desc public method that compares SongPlayer.currentSong to song and enables user to play song accordingly
        * @param {Object} song
        */ 
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
             if (SongPlayer.currentSong !== song) {
                setSong(song);     
                playSong(song);
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                currentBuzzObject.play();
                }
            }    
     };
        
         /**
        * @function SongPlayer.pause
        * @desc public method that pauses the currentBuzzObject
        * @param {Object} song
        * @returns {Object}
        */ 
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        
         /**
        * @function SongPlayer.previous
        * @desc public method that moves to the previous song
        */ 
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if (currentSongIndex < 0) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
         
          return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();