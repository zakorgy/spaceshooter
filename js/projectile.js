game.Projectile = me.Entity.extend({
    init : function (x, y, angle) {
        var projectile = new me.Sprite(0, 0, {
            image : "shot",
            framewidth : 32,
            frameheight : 32,
        });
        this._super(me.Entity, "init", [x + 16, y + 16, projectile]);
        this.z = 5;
        this.body.collisionType = me.collision.types.PROJECTILE_OBJECT;
        this.body.addShape(new me.Ellipse(16, 16, 10, 10), true);
        this.body.shapes.shift();
        this.renderable.currentTransform.identity().rotate(angle + Number.prototype.degToRad(90));
        this.renderable.scale(0.7, 1.0);
        this.velx = Math.cos(angle) * 300;
        this.vely = Math.sin(angle) * 300;
        this.maxX = me.game.viewport.width;
        this.maxY = me.game.viewport.height;
        this.renderable.addAnimation("pulse",  [0, 1, 2, 3, 4, 5], 10);
        this.renderable.setCurrentAnimation("pulse");
        this.body.setVelocity(this.velx, this.vely);
        this.alwaysUpdate = true;
        this.damage = 1;
    },

    update: function (time) {
        this._super(me.Entity, "update", [time]);
        this.pos.x += this.velx * time/1000;
        this.pos.y += this.vely * time/1000;
        //this.body.vel.x += this.body.accel.x * time / 1000;
        //this.body.vel.y += this.body.accel.y * time / 1000;

        this.pos.x = this.pos.x.clamp(-32, this.maxX);
        this.pos.y = this.pos.y.clamp(-32, this.maxY);

        if (   this.pos.y <= -10
            || this.pos.y >= (me.game.viewport.height)
            || this.pos.x <= -10
            || this.pos.x >= (me.game.viewport.width)) {
            me.game.world.removeChild(this);
            //console.log("removed");
        }

        this.body.update();
        me.collision.check(this);
        return true;
    },
});
