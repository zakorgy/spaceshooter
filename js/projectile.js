game.Projectile = me.Entity.extend({
    init : function (x, y, angle) {
        var projectile = me.loader.getImage("shot");
        this._super(me.Entity, "init", [x + 16, y + 16, { image: projectile, width: 32, height: 32}]);
        this.z = 5;
        this.body.collisionType = me.collision.types.PROJECTILE_OBJECT;
        this.renderable.currentTransform.identity().rotate(angle + Number.prototype.degToRad(90));
        this.velx = Math.cos(angle) * 100;
        this.vely = Math.sin(angle) * 100;
        this.maxX = me.game.viewport.width;
        this.maxY = me.game.viewport.height;
        this.body.setVelocity(this.velx, this.vely);
        this.alwaysUpdate = true;
    },

    update: function (time) {
        this._super(me.Entity, "update", [time]);
        //this.pos.x += this.velx;
        //this.pos.y += this.vely;
        this.body.pos.x += this.body.accel.x * time / 1000;
        this.body.pos.y += this.body.accel.y * time / 1000;
        if (   this.pos.y <= -10
            || this.pos.y >= (me.game.viewport.height)
            || this.pos.x <= -10
            || this.pos.x >= (me.game.viewport.width)) {
            me.game.world.removeChild(this);
            console.log("removed");
        }

        this.body.update();
        me.collision.check(this);
        this.pos.x = this.pos.x.clamp(-32, this.maxX);
        this.pos.y = this.pos.y.clamp(-32, this.maxY);

        //console.log(this.pos.x + " " + this.pos.y);

        return true;
    },
});