game.Player = me.Entity.extend({
    init : function (x, y) {
        var image = me.loader.getImage("player_3");
        this._super(me.Entity, "init", [
            me.game.viewport.width / 2 - image.width / 2,
            me.game.viewport.height / 2 - image.height - 20,
            { image : image,
              width: 64,
              height: 64,
              shapes: [ new me.Ellipse(32, 32, 30, 30) ]
            },
        ]);
        this.body.collisionType = me.collision.types.PLAYER_OBJECT;
        this.renderable.scale(0.75, 0.75);
        this.z = 5;
        this.velx = 150;
        this.vely = 150;
        this.maxX = me.game.viewport.width - this.width;
        this.maxY = me.game.viewport.height - this.height;
        var num = Math.PI / 2;
        this.currentAngle = Number.prototype.degToRad(num);
        this.renderable.currentTransform.identity().rotate(this.currentAngle);
        this.lastTimeShot = Date.now();
        this.laser = null;
    },

    update: function (time) {
       // var pos = me.input.globalToLocal(me.input.pointer.pos);
        var angle = this.angleToPoint(me.input.pointer.pos);
        // FIXME: This is a lazy workaround for rotation.
        if (angle !== this.currentAngle) {
            this.renderable.currentTransform.identity().rotate(angle + Math.PI/ 2);
            this.renderable.scale(0.75, 0.75);
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
        /*if (isFiring && (Date.now() > this.lastTimeShot + 150)) {
            me.game.world.addChild(me.pool.pull("projectile", this.pos.x - 12 * Math.sin(this.currentAngle), this.pos.y + 12 * Math.cos(this.currentAngle), this.currentAngle));
            me.game.world.addChild(me.pool.pull("projectile", this.pos.x + 12 * Math.sin(this.currentAngle), this.pos.y - 12 * Math.cos(this.currentAngle), this.currentAngle));
            this.lastTimeShot = Date.now();
        }*/

        if (isFiring) {
            if (!this.laser) {
                this.laser = me.game.world.addChild(me.pool.pull("laser", this.pos.x, this.pos.y, this.currentAngle));
            } else {
                this.laser.updateAngleAndPos(this.currentAngle, this.pos);
            }
        } else {
            if (this.laser) {
                var laser = this.laser;
                this.laser = null;
                me.game.world.removeChild(laser);
            }
        }

        if (isFiring) {
            this.velx = 75;
            this.vely = 75;
        } else {
            this.velx = 150;
            this.vely = 150;
        }
        return true;
    },
});