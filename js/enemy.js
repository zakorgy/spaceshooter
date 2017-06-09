game.Enemy = me.Entity.extend({
    init : function (x, y) {
        var enemy_sprite = new me.Sprite(0, 0, {
            image : "enemy_idle",
            framewidth : 78,
            frameheight : 74,
        });
        this._super(me.Entity, "init", [x, y, enemy_sprite, 
                                        {shapes: new me.Rect(10, 20, 68, 54)}]);
        this.z = 6;
        this.body.collisionType = me.collision.types.ENEMY_OBJECT;
        this.width = 39;
        this.height = 37;
        this.renderable.addAnimation("idle", [0, 1, 2, 3, 4, 5, 6], 100);
        this.renderable.setCurrentAnimation("idle");
        var num = Math.PI / 2;
        this.currentAngle = Number.prototype.degToRad(-num);
        this.renderable.currentTransform.identity().rotate(this.currentAngle);
        this.alwaysUpdate = true;
        /*this.body.shapeType = "Ellipse";
        this.body.addShape(new me.Ellipse(0, 0, 37, 37), false);*/
    },

    update: function (time) {
        this._super(me.Entity, "update", [time]);
        this.body.update();
        me.collision.check(this);
        return true;
    },

    onCollision : function (res, other) {
        if (other.body.collisionType === me.collision.types.PROJECTILE_OBJECT) {
            /*if (new me.Vector2d(this.pos.x - other.pos.x + 37, this.pos.y - other.pos.y + 18).length() < 35) {
            }*/
             me.game.world.removeChild(other);
            //game.playScreen.enemyManager.removeChild(other);
            return false;
        }
        if (other.body.collisionType === me.collision.types.PLAYER_OBJECT) {
            /*if (new me.Vector2d(this.pos.x - other.pos.x + 37, this.pos.y - other.pos.y + 18).length() < 35) {
            }*/
            //game.playScreen.enemyManager.removeChild(other);
            return false;
        }
    }
});