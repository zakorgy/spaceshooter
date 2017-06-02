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
        this.velx = 150;
        this.vely = 150;
        this.maxX = me.game.viewport.width - this.width;
        this.maxY = me.game.viewport.height - this.height;
        var num = Math.PI / 2;
        this.currentAngle = Number.prototype.degToRad(num);
        this.renderable.currentTransform.identity().rotate(this.currentAngle);
    },

    update: function (time) {
        var pos = me.input.globalToLocal(mousePos.x, mousePos.y);
        var angle = this.angleToPoint(pos);
        // FIXME: This is a lazy workaround for rotation.
        if (angle !== this.currentAngle) {
            this.renderable.currentTransform.identity().rotate(angle);
            this.currentAngle = angle;
        }

        console.log(Number.prototype.radToDeg(this.currentAngle));

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
        if (mouseClicked) {
            me.game.world.addChild(me.pool.pull("projectile", this.pos.x, this.pos.y, this.currentAngle));
            mouseClicked = false;
            this.velx = 0;
            this.vely = 0;
        } else {
            this.velx = 150;
            this.vely = 150; 
        }
        return true;
    },
});