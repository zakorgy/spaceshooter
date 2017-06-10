game.Enemy = me.Entity.extend({
    init : function (x, y, targetedPlayer) {
        var enemy_sprite = new me.Sprite(0, 0, {
            image : "enemy_idle",
            framewidth : 73,
            frameheight : 74,
        });
        this._super(me.Entity, "init", [x, y, enemy_sprite]);
        this.z = 6;
        this.body.addShape(new me.Ellipse(36.5, 37, 50, 50), true);
        this.body.shapes.shift();
        this.body.collisionType = me.collision.types.ENEMY_OBJECT;
        this.renderable.addAnimation("idle", [0, 1, 2, 3, 4, 5, 6], 100);
        this.renderable.setCurrentAnimation("idle");
        this.currentAngle = Number.prototype.degToRad(0);
        this.renderable.currentTransform.identity().rotate(this.currentAngle);
        this.alwaysUpdate = true;
        this.target = targetedPlayer;
        this.velX = 0;
        this.velY = 0;
        this.isTargetReached = false;
    },

    update: function (time) {
        if (this.distanceTo(this.target) > 100) {
            this.isTargetReached = false;
        }
        var angle = this.angleTo(this.target);
        if (this.currentAngle !== angle) {
            this.currentAngle = angle;
            this.renderable.currentTransform.identity().rotate(angle + Math.PI * 1.5) * time / 1000;
        }
        if (!this.isTargetReached) {
            this.velx = Math.cos(this.currentAngle) * 100;
            this.vely = Math.sin(this.currentAngle) * 100;
        } else {
            this.velx = Math.cos(this.currentAngle) * 10;
            this.vely = Math.sin(this.currentAngle) * 10;
        }
        //this.body.setVelocity(this.velx, this.vely);
        this.pos.x += this.velx * time/1000;
        this.pos.y += this.vely * time/1000;

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
            this.isTargetReached = true;
            return false;
        }
        return false;
    },
});
