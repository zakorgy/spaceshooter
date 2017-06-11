game.Enemy = me.Entity.extend({
    init : function (x, y, targetedPlayer) {
        var enemy_sprite = new me.Sprite(0, 0, {
            image : "enemy_idle",
            framewidth : 73,
            frameheight : 74
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
        this.velx = 0;
        this.vely = 0;
        //this.body.setVelocity(this.velx, this.vely);
        this.isTargetReached = false;
        this.lastCollidedEnemy = null;
        this.life = 10;
        this.angleModifier = (-10).random(10) / 10;
    },

    update: function (time) {
        if (this.life <= 0) {
            if (maxEnemyCount  < 100) {
                me.game.world.addChild(me.pool.pull("enemy",
                                                   (this.pos.x - 30).random(this.pos.x + 30),
                                                   (this.pos.y - 30).random(this.pos.y + 30),
                                                   this.target));

                maxEnemyCount++;

                me.game.world.addChild(me.pool.pull("enemy",
                                                   (this.pos.x - 30).random(this.pos.x + 30),
                                                   (this.pos.y - 30).random(this.pos.y + 30),
                                                   this.target));
                maxEnemyCount++;
            }
            me.game.world.removeChild(this);
        }

        if (this.distanceTo(this.target) > 100) {
            this.isTargetReached = false;
            if (this.angleModifier === 0)
                this.angleModifier = (-10).random(10) / 10;
        }

        if (this.lastCollidedEnemy) {
            if ((this.distanceTo(this.lastCollidedEnemy) > 50 || !this.lastCollidedEnemy.alive || this.lastCollidedEnemy.lastCollidedEnemy)) {
                this.lastCollidedEnemy = null;
            }
        }

        var angle = this.angleTo(this.target);
        if (this.currentAngle !== angle) {
            this.currentAngle = angle + this.angleModifier;
            this.renderable.currentTransform.identity().rotate(angle + Math.PI * 1.5);
        }

        if (!this.isTargetReached && !this.lastCollidedEnemy) {
            this.velx = Math.cos(this.currentAngle) * (100).random(160);
            this.vely = Math.sin(this.currentAngle) * (100).random(160);
        } else {
            this.velx = 0;
            this.vely = 0;
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
            this.life -= other.damage;
            me.game.world.removeChild(other);
            return false;
        }
        if (res.b.body.collisionType === me.collision.types.PLAYER_OBJECT && res.bInA) {
            // makes the other entity solid, by substracting the overlap vector to the current position
            this.isTargetReached = true;
            this.angleModifier = 0;
            this.pos.sub(res.overlapV);
            // not solid
            return false;
        }
        if (res.b.body.collisionType === me.collision.types.ENEMY_OBJECT) {
            // makes the other entity solid, by substracting the overlap vector to the current position
            if ((res.b.distanceTo(this.target) < this.distanceTo(this.target)) &&!other.lastCollidedEnemy) {
                this.lastCollidedEnemy = other;
            }
            //this.pos.sub(res.overlapV);
            // not solid
            return false;
        }
        return false;
    }
});
