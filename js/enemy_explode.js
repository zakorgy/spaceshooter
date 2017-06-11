game.EnemyExplode = me.Entity.extend({
    init : function (x, y) {
        var enemy_sprite = new me.Sprite(0, 0, {
            image: "enemy_explode",
            framewidth: 117,
            frameheight: 112
        });
        this._super(me.Entity, "init", [x, y, enemy_sprite]);
        this.z = 3;
        this.body.collisionType = me.collision.types.NO_OBJECT;
        this.renderable.addAnimation("explode", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 100);
        this.renderable.setCurrentAnimation("explode", (function () {
            me.game.world.removeChild(this);
            return false;
        }).bind(this));
        this.alwaysUpdate = true;
    },

    update: function (time) {
        this._super(me.Entity, "update", [time]);
        return true;
    }
});
