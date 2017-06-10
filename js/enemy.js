game.Enemy = me.Entity.extend({
    init : function (x, y) {
        var enemy_sprite = new me.Sprite(0, 0, {
            image : "enemy_idle",
            framewidth : 78,
            frameheight : 74,
        });
        this._super(me.Entity, "init", [x, y, enemy_sprite]);
        this.z = 6;
        this.body.addShape(new me.Ellipse(35, 35, 55, 40), true);
        this.body.shapes.shift();
        this.body.collisionType = me.collision.types.ENEMY_OBJECT;
        this.renderable.addAnimation("idle", [0, 1, 2, 3, 4, 5, 6], 100);
        this.renderable.setCurrentAnimation("idle");
        this.currentAngle = Number.prototype.degToRad(-Math.PI / 2);
        this.renderable.currentTransform.identity().rotate(this.currentAngle);
        this.alwaysUpdate = true;
    },

    update: function (time) {
        this._super(me.Entity, "update", [time]);
        this.body.update();
        me.collision.check(this);
        return true;
    },

    onCollision : function (res, other) {
        if (other.body.collisionType === me.collision.types.PROJECTILE_OBJECT) {
            me.game.world.removeChild(other);
            return false;
        }
        if (other.body.collisionType === me.collision.types.PLAYER_OBJECT) {
            //game.playScreen.enemyManager.removeChild(other);
            return false;
        }
        return true;
    }
});
