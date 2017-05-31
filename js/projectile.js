game.Projectile = me.Entity.extend({
    init : function (x, y, angle) {
        var projectile = me.loader.getImage("projectile");
        this._super(me.Entity, "init", [x, y, { image : projectile, width: 32, height: 32 }]);
        this.z = 5;
        this.body.setVelocity(0, 300);
        this.body.collisionType = me.collision.types.PROJECTILE_OBJECT;
        /*this.maxX = me.game.viewport.width - this.width;
        this.maxY = me.game.viewport.height - this.height;*/
        this.renderable = new (me.Renderable.extend({
            init : function () {
                this._super(me.Renderable, "init", [0, 0, game.Laser.width, game.Laser.height]);
            },
            destroy : function () {},
            draw : function (renderer) {}
        }));
        this.angle = angle;
    },

    update: function (time) {

        this.pos.x = this.pos.x.clamp(0, this.maxX);
        this.pos.y = this.pos.y.clamp(0, this.maxY);
        return true;
    },
});