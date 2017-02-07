game.Player = me.Entity.extend({
    init : function (x, y) {
        var image = me.loader.getImage("player");
        this._super(me.Entity, "init", [
            me.game.viewport.width / 2 - image.width / 2,
            me.game.viewport.height / 2 - image.height - 20,
            { image : image,
              width: 64,
              height: 64
        }]);
        this.velx = 200;
        this.vely = 200;
        this.maxX = me.game.viewport.width - this.width;
        this.maxY = me.game.viewport.height - this.height;
        var num = 0;
        this.currentAngle = num.degToRad();
        this.renderable.currentTransform.rotate(this.currentAngle);
    },

    update: function (time) {
        var pos = me.input.globalToLocal(mousePos.x, mousePos.y);
        var angle = this.angleToPoint(pos);
        // FIXME: This is a lazy workaround for rotation.
        if (angle !== this.currentAngle) {
            this.renderable.currentTransform.identity();
            this.renderable.currentTransform.rotate(angle);
            this.currentAngle = angle;
        }

        this._super(me.Entity, "update", [time]);
        if (me.input.isKeyPressed("left")) {
            this.pos.x -= this.velx * time / 1000;
        }

        if (me.input.isKeyPressed("right")) {
            this.pos.x += this.velx * time / 1000;
        }

        if (me.input.isKeyPressed("up")) {
            this.pos.y -= this.vely * time / 1000;
        }

        if (me.input.isKeyPressed("down")) {
            this.pos.y += this.vely * time / 1000;
        }

        this.pos.x = this.pos.x.clamp(0, this.maxX);
        this.pos.y = this.pos.y.clamp(0, this.maxY);
        return true;
    },
});