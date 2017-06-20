
/* Game namespace */
var game = {
    collisionTypes: {
        LASER : me.collision.types.USER << 0,
    },
    // Run on page load.
    onload : function () {
        // Initialize the video.
        if (!me.video.init(1400, 768, {wrapper : "screen", scale : 'auto'})) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // add "#debug" to the URL to enable the debug Panel
        if (me.game.HASH.debug === true) {
            window.onReady(function () {
                me.plugin.register.defer(this, me.debug.Panel, "debug", me.input.KEY.Q, me.input.KEY.H);
            });
        }

        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // Set a callback to run when loading is complete.
        me.loader.onload = this.loaded.bind(this);

        // Load the resources.
        me.loader.preload(game.resources);

        // Initialize melonJS and display a loading screen.
        me.state.change(me.state.LOADING);
    },

    // Run on game resources loaded.
    loaded : function () {
        me.pool.register("player", game.Player);
        me.pool.register("projectile", game.Projectile);
        me.pool.register("laser", game.Laser);
        me.pool.register("enemy", game.Enemy);
        me.pool.register("enemyExplode", game.EnemyExplode);
        // set the "Play/Ingame" Screen Object
        this.playScreen = new game.PlayScreen();
        me.state.set(me.state.PLAY, this.playScreen);
        me.sys.gravity = 0.0;

        // start the game
        me.state.change(me.state.PLAY);
    }
};
