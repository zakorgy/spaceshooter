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
        this.angleModifier = (-150).random(150);
    },

    update: function (time) {
        if (this.life <= 0) {
            me.game.world.removeChild(this);
        }

        if (this.distanceTo(this.target) > 150) {
            //this.isTargetReached = false;
            if (this.angleModifier === 0)
                this.angleModifier = (-150).random(150);
        } else {
            this.angleModifier = 0;
        }

        if (this.distanceTo(this.target) > 0) {
            this.isTargetReached = false;
        }

        if (this.lastCollidedEnemy) {
            if ((this.distanceTo(this.lastCollidedEnemy) > 50 || !this.lastCollidedEnemy.alive || this.lastCollidedEnemy.lastCollidedEnemy)) {
                this.lastCollidedEnemy = null;
            }
        }

        var angle = this.angleToPoint(new me.Vector2d(this.target.pos.x + this.angleModifier, this.target.pos.y + this.angleModifier));
        if (this.currentAngle !== angle) {
            this.currentAngle = angle;
            this.renderable.currentTransform.identity().rotate(this.currentAngle + Math.PI * 1.5);
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
            //this.pos.sub(res.overlapV);
            // not solid
            return false;
        }
        if (res.b.body.collisionType === me.collision.types.ENEMY_OBJECT) {
            // makes the other entity solid, by substracting the overlap vector to the current position
            if ((res.b.distanceTo(this.target) <= this.distanceTo(this.target))) {
                this.lastCollidedEnemy = other;
                this.pos.add(res.overlapV.div(40));
            }
            if (other.isTargetReached) {
                this.lastCollidedEnemy = null;
            }
            // not solid
            return false;
        }
        return false;
    },

    onDeactivateEvent: function() {
        if (maxEnemyCount  < 200) {
            me.game.world.addChild(me.pool.pull("enemy",
                                                me.game.viewport.width + 40,
                                               (- 40).random(me.game.viewport.height + 40),
                                               this.target));

            maxEnemyCount++;

            me.game.world.addChild(me.pool.pull("enemy",
                                                -40,
                                               (- 40).random(me.game.viewport.height + 40),
                                               this.target));
            maxEnemyCount++;

        }
        this.alive = false;
        me.game.world.addChild(me.pool.pull("enemyExplode", this.pos.x, this.pos.y));
    }
});
