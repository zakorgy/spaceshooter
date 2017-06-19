game.Laser = me.Entity.extend({
    init : function (x, y, angle) {
        var projectile = new me.Sprite(0, 0, {
            image : "shot_2",
            framewidth : 32,
            frameheight : 32
        });
        this._super(me.Entity, "init", [x, y, projectile]);
        this.z = 5;
        this.body.collisionType = me.collision.types.PROJECTILE_OBJECT;
        //this.body.addShape(new me.Line(x, y, [new me.Vector2d(x, y), new me.Vector2d((me.game.viewport.width - x) * Math.cos(angle), (me.game.viewport.height - y) * Math.sin(angle))], true));
        this.body.addShape(new me.Line(x, y, [new me.Vector2d(x, y), me.input.globalToLocal(mousePos.x, mousePos.y)], true));
        this.body.shapes.shift();
        //this.renderable.currentTransform.identity().rotate(angle + Number.prototype.degToRad(90));
        //this.renderable.scale(0.75, 0.75);
        //this.velx = Math.cos(angle) * 1000;
        //this.vely = Math.sin(angle) * 1000;
        this.maxX = me.game.viewport.width;
        this.maxY = me.game.viewport.height;
        //this.renderable.addAnimation("pulse",  [0, 1, 2, 3, 4, 5], 30);
        //this.renderable.setCurrentAnimation("pulse");
        //this.body.setVelocity(this.velx, this.vely);
        this.alwaysUpdate = false;
        this.damage = 2;
    },

    update: function (time) {
        this._super(me.Entity, "update", [time]);
        //this.pos.x += this.velx * time/1000;
        //this.pos.y += this.vely * time/1000;
        //this.body.vel.x += this.body.accel.x * time / 1000;
        //this.body.vel.y += this.body.accel.y * time / 1000;

        //this.pos.x = this.pos.x.clamp(0, this.maxX);
        //this.pos.y = this.pos.y.clamp(0, this.maxY);

        this.body.update();
        me.collision.check(this);
        return true;
    }
});
