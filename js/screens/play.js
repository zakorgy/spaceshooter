game.PlayScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */

    onResetEvent: function() {
        var backgroundImage = new me.Sprite(0, 0, {
                image: me.loader.getImage('bground')
            }
        );

        // position and scale to fit with the viewport size
        backgroundImage.anchorPoint.set(0, 0);
        backgroundImage.scale(me.game.viewport.width / backgroundImage.width, me.game.viewport.height / backgroundImage.height);
        me.input.registerPointerEvent("pointerdown", backgroundImage, function(e){
            e = e || window.event;
            var button = e.which || e.button;
            isFiring = (button === 1);
        });

        me.input.registerPointerEvent("pointerup", backgroundImage, function(e){
            e = e || window.event;
            var button = e.which || e.button;
            if (button === 1)
                isFiring = false;
        });

        me.game.world.addChild(backgroundImage, 1);
        var player = me.game.world.addChild(me.pool.pull("player"));
        // This is only for test purposes, this should be placed in a different place.
        //me.game.world.addChild(me.pool.pull("enemy", (100).random(800), (100).random(800), player));
        maxEnemyCount  = 1;

        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.UP, "up");
        me.input.bindKey(me.input.KEY.DOWN, "down");
        me.input.bindKey(me.input.KEY.A, "left");
        me.input.bindKey(me.input.KEY.D, "right");
        me.input.bindKey(me.input.KEY.W, "up");
        me.input.bindKey(me.input.KEY.S, "down");
    },

    onDestroyEvent: function() {
        me.input.unbindKey(me.input.KEY.LEFT);
        me.input.unbindKey(me.input.KEY.RIGHT);
        me.input.unbindKey(me.input.KEY.UP);
        me.input.unbindKey(me.input.KEY.DOWN);
        me.input.unbindKey(me.input.KEY.A);
        me.input.unbindKey(me.input.KEY.D);
        me.input.unbindKey(me.input.KEY.W);
        me.input.unbindKey(me.input.KEY.S);
        me.input.unbindKey(me.input.KEY.SPACE);
    }
});
